# Implementation Plan: Personal Website (zocode-mprqcook)

> **Task:** Build a personal website for showcasing projects and writing blog posts.
> **Task ID:** zocode-mprqcook
> **Spec:** `docs/spec-LOCAL-004.md`
> **Branch:** `zocode/website-v1`
> **Status:** v1 — plan phase
> **Estimated Effort:** ~3.5 hours

---

## Overview

Build a Next.js 14 personal website with App Router, Tailwind CSS v3, Markdown blog engine (gray-matter + next-mdx-remote), and contact form with email notification via Resend. Deployed to Vercel. All content is version-controlled Markdown files — no database or CMS.

### Key Architectural Decisions

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

**Complexity:** Low (15 min)

**Description:** Create the Next.js 14 project with TypeScript and Tailwind CSS, install all production and dev dependencies.

**Files to create:**

| File | Purpose |
|------|---------|
| `package.json` | Project config with all dependencies |
| `tsconfig.json` | TypeScript configuration |
| `next.config.js` | Next.js configuration |
| `tailwind.config.js` | Tailwind CSS configuration with content paths |
| `postcss.config.js` | PostCSS config (Tailwind + autoprefixer) |
| `.gitignore` | Standard Next.js ignores + `.env.local` |
| `.env.local.example` | Template for env vars |
| `src/app/globals.css` | Tailwind directives (`@tailwind base/components/utilities`) + prose styles |

**Dependencies — Production:**

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^14.2 | Framework |
| `react` | ^18 | UI library |
| `react-dom` | ^18 | React DOM |
| `tailwindcss` | ^3.4 | Styling |
| `postcss` | ^8 | PostCSS processor |
| `autoprefixer` | ^10 | CSS vendor prefixes |
| `next-mdx-remote` | ^5 | Render Markdown/MDX server-side |
| `gray-matter` | ^4 | Parse frontmatter from MD files |
| `resend` | ^4 | Email API client |
| `zod` | ^3 | Input validation |
| `next-sitemap` | ^4 | Sitemap / robots generation |

**Dependencies — Dev:**

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5 | Type checking |
| `@types/react` | ^18 | React type defs |
| `@types/node` | ^20 | Node type defs |
| `eslint` | ^8 | Linting |
| `eslint-config-next` | ^14 | Next.js ESLint config |
| `rehype-highlight` | ^? | Syntax highlighting (via next-mdx-remote) |

**Verification:** `npm run dev` starts without errors; `curl localhost:3000` shows "Hello World" (or placeholder).

**Depends on:** Nothing (starting point)

---

### Step 2: Foundation — Types, Content Helpers, Sample Data

**Complexity:** Medium (20 min)

**Description:** Define TypeScript interfaces for all data models, implement content-reading library functions, create sample Markdown files for projects and blog posts.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/types/index.ts` | TypeScript interfaces: `BlogPostFrontmatter`, `ProjectFrontmatter`, `ContactFormData` |
| `src/lib/markdown.ts` | MDX serialisation helper wrapping `serialize()` from next-mdx-remote |
| `src/lib/blog.ts` | `getAllPosts()`, `getPostBySlug(slug)` — reads from `content/blog/` |
| `src/lib/projects.ts` | `getAllProjects()`, `getFeaturedProjects()` — reads from `content/projects/` |
| `src/lib/email.ts` | `sendContactEmail(data)` — Resend client wrapper for contact form |
| `content/blog/hello-world.md` | Sample blog post with frontmatter + MDX body |
| `content/blog/getting-started.md` | Second sample blog post (for pagination variety) |
| `content/projects/sample-project.md` | Sample project with frontmatter |

**Type definitions (src/types/index.ts):**

```typescript
export interface BlogPostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  published: boolean;
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  content: string;
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
```

**Sample blog post (content/blog/hello-world.md):**

```markdown
---
title: "Hello World"
date: 2026-05-30
excerpt: "Welcome to my blog! This is a sample post to get started."
tags: ["nextjs", "blog"]
published: true
---

# Hello World

Welcome to my personal blog. This is a sample post.

```javascript
console.log("Hello, World!");
```
```

**Verification:** `npm run dev` compiles without TypeScript errors. Helper functions can be imported.

**Depends on:** Step 1 (project scaffolded)

---

### Step 3: Foundation — Root Layout, Header, Footer, Global Styles

**Complexity:** Medium (30 min)

**Description:** Create the persistent shell: root layout with metadata, responsive navigation header with hamburger menu on mobile, footer with social links. Wire up `next/font` for Inter.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout: `<html>`, `<body>`, Header + Footer, font loading, metadata template |
| `src/components/Header.tsx` | Responsive nav bar with hamburger menu, active route highlighting |
| `src/components/Footer.tsx` | Site footer with copyright and GitHub link |

**Key implementation details:**
- **layout.tsx**: Uses `next/font` to load Inter with `display: "swap"` for zero CLS. Sets `metadata` export with title template `"%s — Arjun Nayak"`. Body has `flex flex-col min-h-screen` so footer stays at bottom.
- **Header.tsx**: 
  - Nav links: Home (`/`), Projects (`/projects`), Blog (`/blog`), Contact (`/contact`)
  - Mobile menu toggle via `useState` + hamburger icon (three horizontal lines / X icon)
  - Active route highlighting via `usePathname()` from `next/navigation`
  - Semantic `<nav>` with `aria-label="Main navigation"`, hamburger button has `aria-expanded` and `aria-label`
  - Desktop: horizontal nav items. Mobile (< 768px): hamburger button toggles vertical menu
- **Footer.tsx**: Copyright notice, GitHub profile link with icon, "Built with Next.js" credit

**Verification:** All routes show header + footer. Hamburger menu appears and toggles at < 768px viewport.

**Depends on:** Step 1 (scaffold), Step 2 (types for any data in nav)

---

### Step 4: Home Page with Bio + Profile Photo

**Complexity:** Low (20 min)

**Description:** Create the home page with hero section: name, tagline, short bio, and optimised profile photo.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Home page component with hero layout, `generateMetadata()` |
| `public/images/profile.jpg` | Placeholder profile photo (will be 400×400, can be a simple generated image) |
| `public/favicon.ico` | Favicon |

**Key implementation details:**
- Hero layout: centered on mobile, side-by-side on desktop (`md:` breakpoint)
  - Mobile: image on top, text below (stacked)
  - Desktop: text on left (60%), image on right (40%) 
- Profile photo uses `next/image` with:
  - `width={400} height={400}`
  - `priority` flag (above the fold)
  - `className="rounded-full"`
  - `alt="Photo of Arjun Nayak"`
- `generateMetadata()` returns:
  - `title: "Arjun Nayak — Software Engineer"`
  - `description: "Personal website of Arjun Nayak. Software engineer and..."` (short bio)
  - Open Graph: `og:title`, `og:description`, `og:type: "website"`
- Responsive text sizing: `text-3xl md:text-5xl` for name heading

**Verification:** `/` shows hero with bio text and photo. Lighthouse check passes for performance.

**Depends on:** Step 3 (layout, header, footer)

---

### Step 5: Custom 404 Page

**Complexity:** Low (10 min)

**Description:** Create a styled "Not Found" page.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/app/not-found.tsx` | Custom 404 component |

**Key implementation details:**
- Centered layout with large "404" heading (`h1`), "Page not found" sub-text (`p`), and a styled `<Link>` back to home
- Uses root layout automatically (Next.js App Router convention)
- `generateMetadata()` sets `title: "404 — Page Not Found"` and appropriate description
- Styled with Tailwind: large grey "404", dark text for message, blue primary link

**Verification:** Visiting `/nonexistent` renders custom 404. `/blog/nonexistent` also returns 404 (via `notFound()` in blog post page).

**Depends on:** Step 3 (layout exists)

---

### Step 6: Projects Page

**Complexity:** Medium (20 min)

**Description:** Create the projects listing page with a grid of project cards.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/app/projects/page.tsx` | Projects index page with `generateMetadata()` and `generateStaticParams()` |
| `src/components/ProjectCard.tsx` | Reusable card: title, description, tech badges, GitHub/live links |

**Key implementation details:**
- **projects/page.tsx**:
  - Calls `getAllProjects()` from `src/lib/projects.ts` at build time
  - Filters to `featured: true` first, then all projects
  - `generateMetadata()`: title `"Projects — Arjun Nayak"`, description about projects
  - Empty state: `"No projects yet — check back soon!"` with a link to GitHub profile
- **ProjectCard.tsx**:
  - Props: `ProjectFrontmatter` fields
  - Tech stack badges: coloured pill-shaped `<span>` elements (distinct colours per common tech)
  - Links (`githubUrl`, `liveUrl`): open in new tab with `rel="noopener noreferrer"` and `target="_blank"`
  - Card has subtle border, hover shadow effect
- Grid: 1 column on mobile, 2 columns on `md:`, 3 columns on `lg:`

**Verification:** `/projects` shows sample project card with title, description, badges, and links. Empty state renders when no projects.

**Depends on:** Step 2 (projects lib), Step 3 (layout)

---

### Step 7: Blog Index + Blog Post Pages

**Complexity:** High (45 min)

**Description:** Create the blog index page (list of posts sorted by date) and individual blog post pages with Markdown rendering and syntax highlighting.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/app/blog/page.tsx` | Blog index — lists `BlogPostPreview` components |
| `src/app/blog/[slug]/page.tsx` | Individual blog post — renders MDX, handles invalid slugs |
| `src/components/BlogPostPreview.tsx` | Preview card: title, date, excerpt, "Read more" link |
| `src/components/MarkdownRenderer.tsx` | Wraps `MDXRemote` with `rehype-highlight` plugin |

**Key implementation details:**
- **blog/page.tsx**:
  - `generateStaticParams()`: reads all `.md` files from `content/blog/` via `lib/blog.ts`
  - Only includes posts with `published: true`
  - Sorted by date descending (newest first)
  - `generateMetadata()`: title `"Blog — Arjun Nayak"`, description
  - Empty state: `"No posts yet. Coming soon!"` with friendly message
- **blog/[slug]/page.tsx**:
  - `generateStaticParams()`: returns all slugs from `lib/blog.ts`
  - `generateMetadata({ params })`: reads post frontmatter for title, excerpt, tags (for keywords/keywords)
  - If slug not found, calls `notFound()` from `next/navigation`
  - Loads `.md` file content, parses frontmatter, serialises MDX body via `lib/markdown.ts`
  - Renders with `<MarkdownRenderer source={serializedMdx} />`
- **BlogPostPreview.tsx**:
  - Props: `title`, `date`, `excerpt`, `slug`
  - Shows formatted date, title as link to `/blog/{slug}`, excerpt text
  - "Read more →" link at bottom
- **MarkdownRenderer.tsx**:
  - Wraps `<MDXRemote {...source} components={...} />` from `next-mdx-remote/rsc` or `next-mdx-remote`
  - Configures `rehype-highlight` plugin for syntax highlighting
  - Custom components: `pre` with dark background + rounded corners, `code` with inline styles
- ISR: blog post pages export `revalidate = 3600` (1 hour) for auto-refresh on push
- Code highlighting: CSS theme loaded in `globals.css` (e.g., GitHub Dark Dimmed)

**Verification:** `/blog` lists sample posts with date and excerpt. `/blog/hello-world` renders full post with highlighted code. `/blog/nonexistent` returns custom 404.

**Depends on:** Step 2 (blog lib, markdown lib), Step 3 (layout), Step 5 (404 path for invalid slugs)

---

### Step 8: Contact Form Page + API Route

**Complexity:** High (40 min)

**Description:** Create the contact form page with client-side validation and the API route that sends email via Resend.

**Files to create:**

| File | Purpose |
|------|---------|
| `src/app/contact/page.tsx` | Contact page — renders `ContactForm`, `generateMetadata()` |
| `src/app/api/contact/route.ts` | POST handler: Zod validation, Resend email, JSON response |
| `src/components/ContactForm.tsx` | Form component: controlled inputs, Zod validation, submit/loading/success/error states |

**Key implementation details:**

- **ContactForm.tsx**:
  - Controlled `useState` for `name`, `email`, `message`
  - Zod schema on client side for immediate validation
  - Inline error messages below each field (red text)
  - Submit button: disabled + spinner during loading
  - Success state: green success banner "Message sent! I'll get back to you soon."
  - Error state: red error banner
  - Honeypot hidden field: invisible `<input name="_hp"` with `tabIndex={-1}`, `autoComplete="off"` — if filled, server silently rejects
  - POST to `/api/contact` with `Content-Type: application/json`

- **api/contact/route.ts**:
  - Zod schema: `name` (string, 1-100), `email` (string, email()), `message` (string, 10-5000)
  - On validation error: `Response.json({ error: "Validation failed", details: {...} }, { status: 400 })`
  - On success: calls `sendContactEmail({ name, email, message })` from `lib/email.ts`
  - Rate limiting: simple in-memory `Map<string, { count, resetAt }>` keyed by IP — max 5 requests per IP per minute. Returns 429 on exceed.
  - On send failure: `Response.json({ error: "Failed to send email. Try again later." }, { status: 500 })`
  - On success: `Response.json({ success: true }, { status: 200 })`

- **email.ts** (lib):
  ```typescript
  import { Resend } from 'resend';
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  export async function sendContactEmail(data: ContactFormData) {
    return resend.emails.send({
      from: 'contact@arjunnayak.dev',
      to: process.env.CONTACT_EMAIL!,
      subject: `New contact from ${data.name}`,
      text: `From: ${data.name} (${data.email})\n\n${data.message}`,
    });
  }
  ```

- **contact/page.tsx**:
  - `generateMetadata()`: title `"Contact — Arjun Nayak"`, description
  - Renders `<ContactForm />`

**Verification:** `/contact` renders form. Valid submit → shows success. Empty submit → inline errors. Invalid email → email error. Honeypot filled → silent success without email.

**Depends on:** Step 2 (email lib, types), Step 3 (layout)

---

### Step 9: SEO Meta Tags — Per-Page `generateMetadata()`

**Complexity:** Low (15 min)

**Description:** Ensure every main page has unique `<title>`, `<meta name="description">`, Open Graph tags.

**Files to modify:**
- `src/app/layout.tsx` — root metadata (title template, default OG)
- `src/app/page.tsx` — home metadata
- `src/app/projects/page.tsx` — projects metadata
- `src/app/blog/page.tsx` — blog index metadata
- `src/app/blog/[slug]/page.tsx` — dynamic metadata from frontmatter
- `src/app/contact/page.tsx` — contact metadata
- `src/app/not-found.tsx` — 404 metadata

**Key details:**
- Root `layout.tsx` sets:
  ```typescript
  export const metadata: Metadata = {
    title: { default: "Arjun Nayak", template: "%s — Arjun Nayak" },
    description: "Personal website of Arjun Nayak",
    openGraph: {
      title: "Arjun Nayak",
      description: "Personal website of Arjun Nayak",
      type: "website",
      locale: "en_US",
    },
  };
  ```
- Blog post `generateMetadata()` reads frontmatter for title, excerpt (→ description), first tag (→ keywords)
- Each page provides `title` (used in template) and `description`
- Open Graph image: default `/images/og-default.png` or omit initially

**Verification:** Inspect `<head>` on each route. Title, description, OG tags correct.

**Depends on:** Steps 4, 6, 7, 8 (all pages exist to add metadata to)

---

### Step 10: Sitemap + Robots.txt

**Complexity:** Low (10 min)

**Description:** Configure `next-sitemap` to auto-generate `sitemap.xml` and `robots.txt` at build time.

**Files to create:**

| File | Purpose |
|------|---------|
| `next-sitemap.config.js` | Configuration for next-sitemap |

**Key details:**
```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://arjunnayak.dev',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  outDir: 'public',
};
```

**Verification:** `npm run build` generates `public/sitemap.xml` and `public/robots.txt`. Sitemap includes `/`, `/projects`, `/blog`, `/blog/*`, `/contact`. Robots.txt allows all.

**Depends on:** Steps 4, 6, 7, 8 (all routes exist)

---

### Step 11: Responsive Polish + Lighthouse Audit

**Complexity:** Medium (30 min)

**Description:** Verify responsive behaviour at all breakpoints, run Lighthouse audit, fix any issues.

**Files to modify (as needed):**
- `src/components/Header.tsx` — hamburger menu animation, touch targets
- `src/components/ProjectCard.tsx` — card sizing at mobile
- `src/app/globals.css` — any responsive tweaks

**Checklist:**
- [ ] 375px (mobile): nav collapses to hamburger, text readable, form fills full width, cards stack vertically
- [ ] 768px (tablet): 2-column grid for projects, side-by-side hero layout
- [ ] 1024px+ (desktop): 3-column project grid, full hero layout
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90 (semantic HTML, alt text, ARIA labels, colour contrast)
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] Tab navigation through all interactive elements (header links, form inputs, project card links)
- [ ] All images have descriptive `alt` text
- [ ] Semantic heading hierarchy on every page (exactly one `h1`, sequential)
- [ ] Font loading via `next/font` with `display: "swap"` — no CLS

**Verification:** Lighthouse scores meet targets. No layout breakage at any breakpoint.

**Depends on:** Steps 4–10 (all pages exist)

---

## Dependency Graph

```
Step 1 (Scaffold)
  ├──► Step 2 (Types + Libs + Content)
  └──► Step 3 (Layout + Header + Footer)
         ├──► Step 4 (Home Page)
         ├──► Step 5 (404 Page)
         ├──► Step 6 (Projects Page)
         ├──► Step 7 (Blog Pages)
         └──► Step 8 (Contact Form)
               │
               ├──► Step 9 (SEO Metadata) ── can be done in parallel
               └──► Step 10 (Sitemap) ──── can be done in parallel
                     └──► Step 11 (Polish + Lighthouse)
```

Steps 9 and 10 are independent and can be done in parallel once their dependent pages are built.

---

## File Creation Order (Grouped by Step)

```
Step 1:  package.json, tsconfig.json, next.config.js, tailwind.config.js,
         postcss.config.js, .gitignore, src/app/globals.css, .env.local.example

Step 2:  src/types/index.ts, src/lib/markdown.ts, src/lib/blog.ts,
         src/lib/projects.ts, src/lib/email.ts,
         content/blog/hello-world.md, content/blog/getting-started.md,
         content/projects/sample-project.md

Step 3:  src/app/layout.tsx, src/components/Header.tsx, src/components/Footer.tsx

Step 4:  src/app/page.tsx, public/images/profile.jpg, public/favicon.ico

Step 5:  src/app/not-found.tsx

Step 6:  src/app/projects/page.tsx, src/components/ProjectCard.tsx

Step 7:  src/app/blog/page.tsx, src/app/blog/[slug]/page.tsx,
         src/components/BlogPostPreview.tsx, src/components/MarkdownRenderer.tsx

Step 8:  src/app/contact/page.tsx, src/app/api/contact/route.ts,
         src/components/ContactForm.tsx

Step 9:  (modify existing files: add/update generateMetadata in layout.tsx,
         page.tsx, projects/page.tsx, blog/page.tsx, blog/[slug]/page.tsx,
         contact/page.tsx, not-found.tsx)

Step 10: next-sitemap.config.js

Step 11: (polish existing files — no new files)
```

**Total files to create:** ~28

---

## Test Strategy

### Per-Step Verification

| Step | Verification Method |
|------|---------------------|
| 1 | `npm run dev` starts without errors; `curl localhost:3000` returns HTML |
| 2 | Functions import without TypeScript errors in dev server; helper return shapes correct |
| 3 | All routes show header/footer. Hamburger toggles at < 768px viewport |
| 4 | Home page loads hero with bio text and profile photo. Photo is optimised (next/image) |
| 5 | `/nonexistent` returns custom 404 page. `/blog/nonexistent` also 404s |
| 6 | `/projects` shows project cards with badges and links. Empty state present |
| 7 | `/blog` lists posts sorted by date. `/blog/hello-world` renders MDX with code highlighting. Invalid slug 404s |
| 8 | `/contact` form validates inline and submits. API returns correct success/error responses |
| 9 | Every route has unique `<title>` and `<meta name="description">` in `<head>` |
| 10 | `npm run build` generates `public/sitemap.xml` with all routes |
| 11 | Lighthouse scores ≥ 90 across all categories; layout works at all breakpoints |

### Final Acceptance Tests

Before marking the task complete, run these checks:

1. **Full build test:** `npm run build` succeeds without errors or warnings
2. **Production start:** `npm run start` serves all routes correctly
3. **404 handling:** `/nonexistent` → custom 404; `/blog/nonexistent` → 404
4. **Empty states:** Blog (`/blog`) and projects (`/projects`) show friendly messages when no content
5. **Responsive:** Manual check at 375px, 768px, 1024px using browser DevTools
6. **Sitemap:** `GET /sitemap.xml` returns valid XML listing all expected URLs
7. **SEO headers:** Each page has unique title and meta description in `<head>`
8. **Form validation:**
   - Empty submit → inline error messages
   - Invalid email → email field error
   - Valid data → success banner (API returns 200)
   - Honeypot filled → no email sent, but user sees success

### Future Test Considerations

- Add Playwright E2E tests for critical paths (home → blog → post, form submit → success)
- Add Lighthouse CI to prevent performance regressions on PRs
- Add `@testing-library/react` unit tests for `ProjectCard`, `BlogPostPreview`, `ContactForm` components
- Consider `jest` + `@testing-library/react` for component-level tests

---

## Edge Cases & Gotchas

| Id | Edge Case | Mitigation |
|----|-----------|------------|
| E1 | Empty content directories | Both blog index and projects page show friendly empty states |
| E2 | Invalid blog slug | `blog/[slug]/page.tsx` calls `notFound()` when slug not found |
| E3 | Contact form spam | Honeypot field + in-memory IP rate limiting (5 req/min/IP) |
| E4 | Email service down | API route returns 500 with friendly error; no silent failures |
| E5 | Profile photo missing | `next/image` handles gracefully; add fallback placeholder |
| E6 | Font loading shift | `next/font` with `display: "swap"` eliminates CLS |
| E7 | Build-time slug discovery | `generateStaticParams()` correctly lists all `.md` files; ISR handles new posts |

---

## Commit Strategy

| # | After Step | Commit Message |
|---|------------|----------------|
| 1 | Step 1 | `feat: scaffold next.js 14 project with tailwind and deps` |
| 2 | Step 3 | `feat: add root layout, header, footer, and global styles` |
| 3 | Steps 4-5 | `feat: add home page and custom 404 page` |
| 4 | Step 6 | `feat: add projects page with project cards` |
| 5 | Step 7 | `feat: add blog index and markdown post pages` |
| 6 | Step 8 | `feat: add contact form with email notification` |
| 7 | Steps 9-10 | `feat: add seo metadata and sitemap generation` |
| 8 | Step 11 | `chore: responsive polish and lighthouse audit` |

---

*End of implementation plan.*
