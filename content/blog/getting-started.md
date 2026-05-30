---
title: "Getting Started with Next.js and Tailwind CSS"
date: 2026-05-28
excerpt: "A quick guide on setting up a modern web project with Next.js 14 App Router and Tailwind CSS."
tags: ["nextjs", "tailwind", "tutorial"]
published: true
---

## Setting Up a Modern Web Project

Next.js 14 with the App Router and Tailwind CSS makes for an excellent combination when building modern web applications. Here's a quick overview of how this site is set up.

### Project Structure

The App Router uses a file-system based routing where folders define routes:

```
src/
  app/
    page.tsx         → /
    layout.tsx       → Root layout
    blog/
      page.tsx       → /blog
      [slug]/
        page.tsx     → /blog/:slug
```

### Styling with Tailwind

Tailwind CSS lets you build responsive designs quickly:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <ProjectCard title="My Project" />
</div>
```

The responsive prefixes (`sm:`, `md:`, `lg:`) make it easy to adapt layouts for different screen sizes.

### Markdown Blog Engine

Blog posts are written as Markdown files with frontmatter:

```yaml
---
title: "My Post"
date: 2026-05-30
excerpt: "A brief summary"
tags: ["nextjs"]
published: true
---
```

The content is parsed with `gray-matter` and rendered with `next-mdx-remote`, giving us syntax highlighting and full Markdown support without a database.

### Performance Benefits

- **Static Generation** — Pages are pre-rendered at build time
- **Automatic Image Optimization** — Via `next/image`
- **Zero Runtime CSS** — Tailwind purges unused styles in production
- **Font Optimization** — `next/font` eliminates layout shift

That's the stack powering this very site! Feel free to explore.
