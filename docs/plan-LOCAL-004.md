# Implementation Plan: Personal Website (LOCAL-004)

> **Task:** Build a personal website for showcasing projects and writing blog posts.
> **Spec:** `docs/spec-LOCAL-004.md`
> **Branch:** `zocode/website-v1`
> **Status:** v1 — plan phase

---

## Overview

Build a Next.js 14 personal website with App Router, Tailwind CSS v3, Markdown blog engine, and contact form with email notification. Deployed to Vercel. The repo is currently empty (just spec + README), so this plan covers full scaffolding through production-ready ship.

### Key Architectural Decisions (from spec)

| Decision         | Choice                | Rationale                                  |
|------------------|-----------------------|--------------------------------------------|
| Rendering        | SSG + ISR             | Content is static; sub-2s loads            |
| Styling          | Tailwind CSS v3       | Utility-first, no runtime, responsive      |
| Blog engine      | gray-matter + next-mdx-remote | No DB, version-controlled content   |
| Email            | Resend                | Free tier, Vercel-native integration       |
| SEO              | `generateMetadata()`  | App Router native, no extra dep            |
| Sitemap          | next-sitemap          | Zero-config build-time generation          |

---

## Implementation Steps

### Step 1: Scaffold Next.js Project + Install Dependencies

**What:** Create the Next.js 14 project with TypeScript and Tailwind CSS, install all production and dev dependencies.

**Files to create:**
- `package.json`
- `tsconfig.json`
- `next.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `.gitignore`
- `src/app/globals.css` — Tailwind directives (`@tailwind base/components/utilities`)
- `.env.local.example` — Template for env vars (Resend API key)

**Dependencies to install:**
- **Production:** `next@^14.2`, `react@^18`, `react-dom@^18`, `tailwindcss@^3.4`, `postcss`, `autoprefixer`, `next-mdx-remote@^5`, `gray-matter@^4`, `resend@^4`, `zod@^3`, `next-sitemap@^4`
- **Dev:** `typescript@^5`, `@types/react@^18`, `@types/node@^20`, `eslint@^8`, `eslint-config-next`, `rehype-highlight`

**Verification:** `npm run dev` starts without errors, `localhost:3000` shows the default Next.js page.

**Depends on:** Nothing (starting point)

---

### Step 2: Foundation — Types, Content Helpers, Sample Data

**What:** Define TypeScript interfaces for all data models, implement content-reading library functions, create sample Markdown files for projects and blog posts.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/types/index.ts` | `Project`, `BlogPost`, `ContactFormData` interfaces |
| `src/lib/markdown.ts` | `serializeMdx(source)` — MDX serialisation wrapper |
| `src/lib/blog.ts` | `getAllPosts()`, `getPostBySlug(slug)` — read from `content/blog/` |
| `src/lib/projects.ts` | `getAllProjects()`, `getFeaturedProjects()` — read from `content/projects/` |
| `src/lib/email.ts` | `sendContactEmail(data)` — Resend client wrapper |
| `content/blog/hello-world.md` | Sample blog post with frontmatter + MDX body |
| `content/blog/getting-started.md` | Second sample blog post |
| `content/projects/sample-project.md` | Sample project with frontmatter |

**Type definitions:**
```typescript
interface BlogPostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  published: boolean;
}

interface ProjectFrontmatter {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}
```

**Verification:** `node -e "require('./src/lib/blog')"` runs without errors (TypeScript-safe at dev server time).

**Depends on:** Step 1 (project scaffolded)

---

### Step 3: Foundation — Root Layout, Header, Footer, Global Styles

**What:** Create the persistent shell: root layout with metadata, responsive navigation header with hamburger menu on mobile, footer with social links. Wire up `next/font` for Inter/Geist.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout: `<html>`, `<body>`, Header + Footer wrappers, metadata, font loading |
| `src/app/globals.css` | Tailwind directives + prose styles + custom variables |
| `src/components/Header.tsx` | Responsive nav bar with hamburger menu, nav links: Home, Projects, Blog, Contact |
| `src/components/Footer.tsx` | Site footer with copyright, social/github link |

**Key details:**
- `layout.tsx` uses `next/font` to load Inter (or Geist) with `display: swap` for zero CLS
- `Header.tsx` uses React state for mobile menu toggle, renders `<nav>` with semantic HTML and ARIA attributes
- Active route highlighting via `usePathname()` from `next/navigation`
- Footer sticks to bottom via `min-h-screen` body + `mt-auto` on footer

**Verification:** All routes show header + footer. Mobile hamburger appears at < 768px.

**Depends on:** Step 1 (project scaffolded), Step 2 (types available)

---

### Step 4: Home Page with Bio + Profile Photo

**What:** Create the home page with hero section: name, tagline/title, short bio paragraph, and optimised profile photo using `next/image`.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Home page component with hero layout |
| `public/images/profile.jpg` | Placeholder profile photo (a 400x400 image) |
| `public/images/favicon.ico` | Favicon |

**Key details:**
- Hero section: centered layout on mobile, side-by-side on desktop (image right, text left)
- Profile photo uses `next/image` with `width={400} height={400}`, `priority` flag, rounded-full shape
- `generateMetadata()` returns title "Arjun Nayak — Software Engineer" and description
- Responsive: stacks vertically on mobile, horizontal on `md:` breakpoint

**Verification:** `localhost:3000` shows hero with bio text and photo. Lighthouse check passes.

**Depends on:** Step 3 (layout, header, footer)

---

### Step 5: Custom 404 Page

**What:** Create a styled 404 "Not Found" page with link back to home.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/app/not-found.tsx` | Custom 404 page component |

**Key details:**
- Centered layout with large "404" heading, "Page not found" sub-text, and a styled link to `/`
- Uses the root layout automatically (Next.js App Router)
- Semantic heading hierarchy: `h1` for "404", `h2` for description

**Verification:** Visiting `/nonexistent` renders the custom 404 page, not the default Next.js 404.

**Depends on:** Step 3 (layout exists)

---

### Step 6: Projects Page

**What:** Create the projects listing page with a grid of project cards.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/app/projects/page.tsx` | Projects index — reads from `content/projects/` via `lib/projects.ts` |
| `src/components/ProjectCard.tsx` | Reusable card: title, description, tech badges, GitHub/live links |

**Key details:**
- `generateMetadata()` returns title "Projects — Arjun Nayak" and description
- `ProjectCard` accepts `ProjectFrontmatter` props
- Tech stack badges rendered as small pill-like spans with distinct colours
- Links open in new tab with `rel="noopener noreferrer"`
- Empty state: "No projects yet — check back soon!" message when content directory is empty
- Grid: 1 column mobile, 2 columns `md:`, 3 columns `lg:`

**Verification:** `/projects` shows sample project card(s). Tech badges visible. Links work.

**Depends on:** Step 2 (projects lib), Step 3 (layout)

---

### Step 7: Blog Index + Blog Post Pages

**What:** Create the blog index page (list of posts sorted by date) and individual post pages with rendered Markdown with syntax highlighting.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/app/blog/page.tsx` | Blog index — list of `BlogPostPreview` components |
| `src/app/blog/[slug]/page.tsx` | Individual blog post — renders MDX via `next-mdx-remote` |
| `src/components/BlogPostPreview.tsx` | Preview card: title, date, excerpt, "Read more" link |
| `src/components/MarkdownRenderer.tsx` | Wraps `MDXRemote` with rehype-highlight plugin |

**Key details:**
- Blog index: `generateStaticParams()` reads all `.md` files from `content/blog/` via `lib/blog.ts`
- Posts sorted by date descending (newest first)
- Empty state: "No posts yet. Coming soon!" when no `.md` files found
- Blog post page: `generateStaticParams()` returns all slugs; `generateMetadata()` reads frontmatter for title/description/OG tags
- `MarkdownRenderer` configures `rehype-highlight` for syntax highlighting
- Custom code block styles with dark background, rounded corners
- Invalid slug (`/blog/nonexistent`) → calls `notFound()` from `next/navigation`
- `revalidate` export set to 3600 (1 hour ISR) on blog index for auto-refresh on push

**Verification:** `/blog` lists sample posts. `/blog/hello-world` renders full post with highlighted code. `/blog/nonexistent` returns 404.

**Depends on:** Step 2 (blog lib, markdown lib), Step 3 (layout), Step 5 (404 page for invalid slugs)

---

### Step 8: Contact Form Page + API Route

**What:** Create the contact form page with client-side validation and the API route that sends email via Resend.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/app/contact/page.tsx` | Contact page — renders `ContactForm` component |
| `src/app/api/contact/route.ts` | POST handler: validates payload, sends email via Resend, returns JSON |
| `src/components/ContactForm.tsx` | Form with name/email/message, Zod validation, submit handler, success/error states |

**Key details:**
- `ContactForm.tsx`:
  - Controlled inputs with `useState`
  - Client-side Zod validation on submit, inline error messages per field
  - Loading state (button spinner/disabled) during submission
  - Success state: green "Message sent!" banner
  - Error state: red error banner
  - Honeypot hidden field for basic spam prevention
- `api/contact/route.ts`:
  - Zod schema validates: `name` (1-100 chars), `email` (valid email), `message` (10-5000 chars)
  - Returns `400` with `{error, details}` on validation failure
  - On success, calls `resend.emails.send()` with the contact message
  - Returns `200 {success: true}`
  - Returns `500 {error: "..."}` on unexpected failures — never silent
- `.env.local.example` documents `RESEND_API_KEY` and notification email address
- Rate-limiting: simple in-memory map by IP (Vercel Edge middleware or per-request tracking) — max 5 submissions per IP per minute
- `generateMetadata()` returns title "Contact — Arjun Nayak"

**Verification:** `/contact` renders form. Submit with valid data → shows success (API route returns 200). Submit with empty fields → shows inline validation errors. Submit with invalid email → shows email validation error.

**Depends on:** Step 2 (email lib), Step 3 (layout), Step 4 (zod already installed)

---

### Step 9: SEO Meta Tags — Per-Page `generateMetadata()`

**What:** Every main page gets unique `<title>`, `<meta name="description">`, Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`).

**Files to modify:**
- `src/app/layout.tsx` — root metadata (fallback title, description, OG)
- `src/app/page.tsx` — home page metadata
- `src/app/projects/page.tsx` — projects metadata
- `src/app/blog/page.tsx` — blog index metadata
- `src/app/blog/[slug]/page.tsx` — dynamic metadata from frontmatter
- `src/app/contact/page.tsx` — contact metadata
- `src/app/not-found.tsx` — 404 metadata

**Key details:**
- Root layout sets default title template: `"%s — Arjun Nayak"`
- Blog post `generateMetadata()` reads post frontmatter for title, excerpt (→ description), first tag (→ keywords)
- OG image: use a default `/images/og-default.png` or skip initially
- Each page overrides what's meaningful; root provides fallbacks

**Verification:** Inspect `<head>` on each route. Title, description, OG tags present and correct.

**Depends on:** Steps 4, 6, 7, 8 (pages exist to add metadata to)

---

### Step 10: Sitemap + Robots

**What:** Configure `next-sitemap` to auto-generate `sitemap.xml` and `robots.txt` at build time.

**Files to create:**
- `next-sitemap.config.js` — site URL, exclude patterns, additional paths

**Key details:**
```js
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://arjunnayak.dev',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  outDir: 'public',
};
```

**Verification:** `npm run build` generates `public/sitemap.xml` and `public/robots.txt`. Sitemap includes `/`, `/projects`, `/blog`, `/blog/*`, `/contact`. Robots allows all.

**Depends on:** Steps 4, 6, 7, 8 (all routes exist)

---

### Step 11: Responsive Polish + Lighthouse Audit

**What:** Verify responsive behaviour at all breakpoints, run Lighthouse audit, fix any issues.

**Files to modify (as needed):**
- `src/components/Header.tsx` — hamburger menu animation, focus trapping
- `src/components/ProjectCard.tsx` — card sizing at mobile
- `src/app/globals.css` — any responsive tweaks

**Checklist:**
- [ ] 375px: nav collapses to hamburger, text readable, form fills full width
- [ ] 768px: tablet layout kicks in (2-col grid, side-by-side hero)
- [ ] 1024px+: desktop layout (3-col project grid)
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] Tab navigation through all interactive elements works
- [ ] All images have descriptive `alt` text
- [ ] Semantic heading hierarchy on every page (exactly one `h1`)

**Verification:** Lighthouse scores meet targets. No layout breakage at any breakpoint.

**Depends on:** Steps 4-10 (all pages exist)

---

## Dependency Graph

```
Step 1 (Scaffold)
  └─► Step 2 (Types + Libs + Content)
  └─► Step 3 (Layout + Header + Footer)
        ├─► Step 4 (Home Page)
        ├─► Step 5 (404 Page)
        ├─► Step 6 (Projects Page)
        ├─► Step 7 (Blog Pages)
        └─► Step 8 (Contact Form)
              └─► Step 9 (SEO Metadata) ── can be done in parallel
              └─► Step 10 (Sitemap) ───── can be done in parallel
                    └─► Step 11 (Polish + Lighthouse)
```

Steps 9 and 10 can be done in parallel once their dependent pages exist.

---

## File Creation Order

```
Step 1:  package.json, tsconfig.json, next.config.js, tailwind.config.js,
         postcss.config.js, .gitignore, src/app/globals.css, .env.local.example

Step 2:  src/types/index.ts, src/lib/markdown.ts, src/lib/blog.ts,
         src/lib/projects.ts, src/lib/email.ts,
         content/blog/hello-world.md, content/blog/getting-started.md,
         content/projects/sample-project.md

Step 3:  src/app/layout.tsx, src/components/Header.tsx, src/components/Footer.tsx

Step 4:  src/app/page.tsx, public/images/profile.jpg, public/images/favicon.ico

Step 5:  src/app/not-found.tsx

Step 6:  src/app/projects/page.tsx, src/components/ProjectCard.tsx

Step 7:  src/app/blog/page.tsx, src/app/blog/[slug]/page.tsx,
         src/components/BlogPostPreview.tsx, src/components/MarkdownRenderer.tsx

Step 8:  src/app/contact/page.tsx, src/app/api/contact/route.ts,
         src/components/ContactForm.tsx

Step 9:  (modify existing files to add generateMetadata)

Step 10: next-sitemap.config.js

Step 11: (polish existing files)
```

Total files to create: ~28

---

## Test Strategy

### Verification Points (per step)

| Step | Verification |
|------|-------------|
| 1 | `npm run dev` starts, `curl localhost:3000` returns HTML |
| 2 | Functions import without TypeScript errors in dev server |
| 3 | All routes show header/footer. Hamburger menu works at < 768px |
| 4 | Home page loads hero layout with photo and bio |
| 5 | `/nonexistent` returns custom 404 |
| 6 | `/projects` shows project cards. Empty state works |
| 7 | `/blog` lists posts. `/blog/hello-world` renders MDX. Invalid slug 404s |
| 8 | `/contact` form validates and submits. API returns correct responses |
| 9 | `<head>` has correct title/description/OG on every page |
| 10 | `sitemap.xml` includes all paths. `robots.txt` is valid |
| 11 | Lighthouse scores ≥ 90 across all categories |

### Before marking complete

1. **Full build test:** `npm run build` succeeds without errors or warnings
2. **Production start:** `npm run start` serves all routes correctly
3. **Four-oh-four:** `/nonexistent` → custom 404; `/blog/nonexistent` → 404
4. **Empty states:** Blog and projects show friendly messages when no content
5. **Responsive:** Manual check at 375px, 768px, 1024px (browser DevTools)
6. **Sitemap:** `GET /sitemap.xml` returns valid XML with all expected URLs
7. **SEO headers:** Each page response has unique title and meta description
8. **Form validation:** Empty submit → errors; invalid email → error; valid data → success

### Future Test Considerations

- Add Playwright E2E tests for critical paths (home → blog → post, form submit)
- Add Lighthouse CI to prevent performance regressions
- Add `@testing-library/react` unit tests for `ProjectCard`, `BlogPostPreview`, `ContactForm` components

---

## Commit Strategy

1. After Step 1 (scaffold): `feat: scaffold next.js project with tailwind`
2. After Step 3 (layout): `feat: add root layout, header, footer, global styles`
3. After Steps 4-5 (home + 404): `feat: add home page and custom 404`
4. After Steps 6 (projects): `feat: add projects page with project cards`
5. After Step 7 (blog): `feat: add blog index and markdown post pages`
6. After Step 8 (contact): `feat: add contact form with email notification`
7. After Steps 9-10 (SEO + sitemap): `feat: add seo metadata and sitemap`
8. After Step 11 (polish): `chore: responsive polish and lighthouse audit`

---

*End of implementation plan.*
