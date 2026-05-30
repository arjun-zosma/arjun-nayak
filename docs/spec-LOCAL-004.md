# Specification: Personal Website (LOCAL-004)

> **Task:** Build a personal website for showcasing projects and writing blog posts.
> **Tech Stack:** Next.js 14, Tailwind CSS, Markdown (blog), Vercel (deployment)
> **Status:** v1 — spec phase

---

## 1. Requirements

### 1.1 Functional Requirements

| ID   | Requirement                  | Description                                                                 | Priority |
|------|------------------------------|-----------------------------------------------------------------------------|----------|
| F1   | Home Page                    | Bio section with name, tagline, and profile photo. Clean hero layout.      | P0       |
| F2   | Projects Page                | Grid of project cards showing title, description, tech stack, and links (GitHub / live demo). | P0 |
| F3   | Blog Section                 | List of blog posts sorted by date, each post rendered from Markdown files. | P0       |
| F4   | Blog Post (MD)               | Individual post page with rendered Markdown content, syntax highlighting.  | P0       |
| F5   | Contact Form                 | Form with name, email, message fields + submit → sends email notification. | P1       |
| F6   | Responsive Design            | Mobile-first layout; adapts to desktop, tablet, and phone breakpoints.     | P0       |
| F7   | SEO Meta Tags                | Per-page `<title>`, `<meta name="description">`, Open Graph tags.          | P1       |
| F8   | Sitemap                      | Auto-generated `sitemap.xml` for search engine indexing.                   | P2       |
| F9   | 404 Page                     | Custom 404 page with link back to home.                                    | P1       |
| F10  | Navigation                   | Persistent header with nav links: Home, Projects, Blog, Contact.           | P0       |

### 1.2 Non-Functional Requirements

| ID   | Requirement          | Target                                      |
|------|----------------------|---------------------------------------------|
| N1   | Performance          | Lighthouse score ≥ 90; page load < 2s (Vercel edge + ISR) |
| N2   | Accessibility        | WCAG 2.1 AA (semantic HTML, alt text, ARIA) |
| N3   | SEO                  | Valid meta tags, sitemap, semantic heading hierarchy |
| N4   | Maintainability      | Blog posts as Markdown files in `content/` — no CMS required |
| N5   | Deployability        | Deploy via `git push` to Vercel; preview deploys on PR |
| N6   | Lighthouse           | Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90 |

---

## 2. Acceptance Criteria

1. **Home page** loads at `/` and displays bio text + profile photo. Profile photo is optimised (next/image).
2. **Projects page** at `/projects` shows ≥ 1 project card with title, description, tech stack badges, and external links.
3. **Blog index** at `/blog` lists all published posts with title, date, and excerpt. Posts sorted newest-first.
4. **Blog post** at `/blog/:slug` renders Markdown content with syntax-highlighted code blocks. 404 shown for unknown slugs.
5. **Contact form** at `/contact` has name, email, message fields. Submit sends notification email (via Resend / SendGrid / Vercel email). Shows success/error feedback.
6. **Responsive**: layout functions correctly at 375px, 768px, 1024px+ breakpoints. Navigation collapses to hamburger menu on mobile.
7. **SEO**: every main page has a unique `<title>` and `<meta name="description">`. Open Graph tags present on home, projects, blog post pages.
8. **Sitemap**: `GET /sitemap.xml` returns valid XML listing all pages and blog posts.
9. **Performance**: `npm run build && npm run start` serves pages with Lighthouse Performance ≥ 90.
10. **Custom 404**: navigating to `/nonexistent` shows a styled 404 page with link to home.

---

## 3. Technical Approach

### 3.1 Architecture

```
[Browser] → Vercel Edge → Next.js App Router (SSG/ISR) → Markdown (content/)
                                                          → Contact form API Route
                                                          → Email service (Resend)
```

- **Next.js 14 App Router** with file-based routing
- **Static Site Generation (SSG)** for pages and blog posts — fast loads, no server overhead
- **Incremental Static Regeneration (ISR)** on blog index for auto-refresh when new posts are pushed
- **API Route** (`/api/contact`) for contact form submission → emails via Resend
- **Tailwind CSS v3** for styling — utility-first, responsive breakpoints via `sm:`, `md:`, `lg:`
- **next-mdx-remote** (or `@next/mdx`) for rendering Markdown blog posts with code highlighting
- **next-seo** or manual `generateMetadata()` for per-page SEO meta tags
- **next-sitemap** for auto-generated `sitemap.xml`

### 3.2 Key Decisions

| Decision                | Choice                   | Rationale                                           |
|-------------------------|--------------------------|-----------------------------------------------------|
| Rendering Strategy      | SSG + ISR                | Content rarely changes; SSG gives sub-2s loads      |
| Styling                 | Tailwind CSS v3          | Utility-first, no runtime CSS, easy responsive      |
| Blog Engine             | Markdown files + gray-matter + next-mdx-remote | No DB needed; version-controlled content |
| Email Service           | Resend                   | Simple API, free tier, native Vercel integration    |
| Image Optimisation      | next/image               | Built-in responsive images, lazy loading, WebP      |
| SEO                     | generateMetadata()       | App Router native; no extra dep needed              |
| Sitemap                 | next-sitemap             | Zero-config auto-generation at build time           |

### 3.3 Data Flow

**Blog Posts:**
1. Developer creates `content/blog/hello-world.md` with frontmatter (title, date, excerpt, tags)
2. At build time, `getStaticPaths` discovers all `.md` files under `content/blog/`
3. `getStaticProps` reads the file, parses frontmatter, renders MDX to HTML
4. The page component wraps the rendered HTML in a layout with prose styles

**Contact Form:**
1. User fills form → POST `/api/contact` with `{name, email, message}`
2. API Route validates input (zod schema)
3. On success, sends email via Resend SDK
4. Returns JSON `{success: true}` or `{error: "..."}`
5. Client shows toast/success message

---

## 4. File / Module Structure

```
arjun-nayak/
├── .env.local                    # Environment variables (Resend API key)
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── public/
│   ├── images/
│   │   ├── profile.jpg           # Profile photo (optimised)
│   │   └── favicon.ico
│   └── fonts/                    # (optional) self-hosted fonts
├── content/
│   ├── projects/
│   │   └── sample-project.md     # Project data as Markdown frontmatter
│   └── blog/
│       ├── hello-world.md        # Blog post with frontmatter + MDX body
│       └── getting-started.md
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout: header, footer, metadata
│   │   ├── page.tsx              # Home page
│   │   ├── not-found.tsx         # Custom 404 page
│   │   ├── globals.css           # Tailwind imports + global styles
│   │   ├── projects/
│   │   │   └── page.tsx          # Projects listing page
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog index (list of posts)
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual blog post page
│   │   ├── contact/
│   │   │   └── page.tsx          # Contact form page
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts      # POST /api/contact handler
│   ├── components/
│   │   ├── Header.tsx            # Navigation bar (responsive, hamburger)
│   │   ├── Footer.tsx            # Site footer
│   │   ├── ProjectCard.tsx       # Reusable project card component
│   │   ├── BlogPostPreview.tsx   # Blog post preview (title, date, excerpt)
│   │   ├── ContactForm.tsx       # Form + validation + submit handler
│   │   └── MarkdownRenderer.tsx  # MDX content renderer wrapper
│   ├── lib/
│   │   ├── projects.ts           # Functions: getAllProjects(), getProjectBySlug()
│   │   ├── blog.ts               # Functions: getAllPosts(), getPostBySlug()
│   │   ├── markdown.ts           # MDX serialisation helper
│   │   └── email.ts              # Resend email client helper
│   └── types/
│       └── index.ts              # TypeScript interfaces (Project, BlogPost, ContactForm)
└── tests/                         # (future: integration/E2E)
    └── placeholder.md
```

---

## 5. Data Model

### 5.1 Blog Post Frontmatter

```yaml
---
title: "My First Post"
date: 2026-05-30
excerpt: "A short summary shown on the blog index."
tags: ["nextjs", "tailwind"]
published: true
---
```

### 5.2 Project Frontmatter

```yaml
---
title: "My Project"
description: "What it does"
techStack: ["React", "Node.js", "PostgreSQL"]
githubUrl: "https://github.com/username/project"
liveUrl: "https://project.vercel.app"
featured: true
---
```

### 5.3 Contact Form Payload

```typescript
interface ContactFormData {
  name: string;       // min 1, max 100 chars
  email: string;      // valid email
  message: string;    // min 10, max 5000 chars
}
```

### 5.4 API Response Shape

```typescript
// POST /api/contact → 200
{ success: true }

// POST /api/contact → 400
{ error: "Validation failed", details: { name: "Name is required", ... } }

// POST /api/contact → 500
{ error: "Failed to send email. Try again later." }
```

---

## 6. Route Map

| Route             | Method | Page / Handler              | Description                |
|-------------------|--------|-----------------------------|----------------------------|
| `/`               | GET    | `src/app/page.tsx`          | Home page with bio + photo |
| `/projects`       | GET    | `src/app/projects/page.tsx` | Project listing grid       |
| `/blog`           | GET    | `src/app/blog/page.tsx`     | Blog post index            |
| `/blog/:slug`     | GET    | `src/app/blog/[slug]/page.tsx` | Individual blog post    |
| `/contact`        | GET    | `src/app/contact/page.tsx`  | Contact form page          |
| `/api/contact`    | POST   | `src/app/api/contact/route.ts` | Contact form handler   |
| `/sitemap.xml`    | GET    | next-sitemap                | Auto-generated sitemap     |
| `/robots.txt`     | GET    | next-sitemap                | Robots config              |

---

## 7. Dependencies

### 7.1 Production

| Package              | Purpose                          |
|----------------------|----------------------------------|
| `next` ^14.2         | Framework                        |
| `react` ^18          | UI library                       |
| `react-dom` ^18      | React DOM renderer               |
| `tailwindcss` ^3.4   | Styling                          |
| `next-mdx-remote` ^5 | Render Markdown/MDX server-side  |
| `gray-matter` ^4     | Parse frontmatter from MD files  |
| `resend` ^4          | Email API client                 |
| `zod` ^3             | Input validation                 |
| `next-sitemap` ^4    | Sitemap / robots generation      |

### 7.2 Dev

| Package              | Purpose                          |
|----------------------|----------------------------------|
| `typescript` ^5      | Type checking                    |
| `@types/react` ^18   | React type definitions           |
| `@types/node` ^20    | Node type definitions            |
| `eslint` ^8          | Linting                          |
| `eslint-config-next` | Next.js ESLint config            |
| `rehype-highlight`   | Syntax highlighting in code blocks (via next-mdx-remote) |

---

## 8. Milestones / Implementation Order

| Step | Description                          | Est. Effort |
|------|--------------------------------------|-------------|
| 1    | Scaffold Next.js project + Tailwind  | 15 min      |
| 2    | Root layout, header, footer, globals | 30 min      |
| 3    | Home page (bio + profile photo)      | 20 min      |
| 4    | Projects page + ProjectCard          | 20 min      |
| 5    | Blog index + blog post pages (MD)    | 45 min      |
| 6    | Contact form page + API route        | 40 min      |
| 7    | SEO meta tags (generateMetadata)     | 15 min      |
| 8    | Sitemap + robots.txt                 | 10 min      |
| 9    | Custom 404 page                      | 10 min      |
| 10   | Responsive polish + Lighthouse audit | 30 min      |
|      | **Total**                            | **~3.5 hrs** |

---

## 9. Edge Cases & Considerations

- **Empty states:** Blog index and projects page should show a friendly message when no content exists yet.
- **Invalid blog slug:** `/blog/nonexistent` should render a 404 page, not crash.
- **Contact form spam:** Add rate-limiting (Vercel Edge middleware or simple in-memory IP tracking) and honeypot field.
- **Email failure:** If Resend is down, the API should still return a friendly error. No silent failures.
- **Profile photo:** Use `next/image` with remote placeholder blur during loading. Host in `public/images/` initially; migrate to external image CDN if needed later.
- **Font loading:** Use `next/font` to self-host Inter or Geist for zero-layout-shift font loading.

---

*End of specification document.*
