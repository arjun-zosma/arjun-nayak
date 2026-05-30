# Implementation Plan: Correct User Research & Update Personal Website (LOCAL-005)

> **Task:** Correct the inaccurate research about Arjun Nayak and update the personal website with verified information.
> **Spec:** Provided in task context (LOCAL-005 — "The research is not correct. Use web search tools to understand about the user")
> **Branch:** `zocode/mprr1dgt`
> **Status:** v1 — plan phase

---

## Summary

Web research revealed that the current website content is based on incorrect/oversimplified assumptions about the user. The existing bio reads as a generic junior developer template (`"passionate about building fast, accessible, and delightful web experiences"`) but the actual person is a **founder and CEO of an AI company** with 7+ years of industry experience.

### Who Arjun Nayak (arjun-zosma) Actually Is

| Attribute | Details |
|-----------|---------|
| **Role** | Founder & CEO of **Zosma AI** (since Jun 2025) |
| **Previous** | Co-Founder of Mavonic Technology (2022-2025, successful exit) |
| **Experience** | 7+ years full-stack engineering, React Native at Vedantu, various senior roles |
| **Education** | Computer Science engineer, SDMCET (2014) |
| **Location** | Mumbai, Maharashtra, India |
| **Products** | Zosma Code (SDLC automation), Zosma Cowork (desktop AI agent), Dhara (agent protocol), OpenZosma (digital twin), Zosma QA |
| **GitHub** | [@arjun-zosma](https://github.com/arjun-zosma) (building @zosmaai) |
| **Website** | [zosma.ai](https://www.zosma.ai) |
| **DEV.to** | [@arjun-zosma](https://dev.to/arjun-zosma) — writes about AI agents, open source, agentic harness |
| **LinkedIn** | [linkedin.com/in/arjun-nayak-98780959](https://linkedin.com/in/arjun-nayak-98780959) |

### What's Wrong With Current Website

| Issue | Current (Incorrect) | Should Be |
|-------|---------------------|-----------|
| **Home bio** | Generic junior dev bio about "Next.js, TypeScript, Tailwind CSS" | Founder/CEO of Zosma AI building AI agent systems |
| **Projects** | Fake "E-Commerce Platform" sample project | Real products: Zosma Code, Zosma Cowork, Dhara, OpenZosma, Zosma QA |
| **Blog posts** | Generic "Hello World" and "Getting Started with Next.js" | Original articles about AI agents, agentic harness, open-source tooling |
| **Social links** | Generic arjunnayak GitHub/Twitter/LinkedIn | arjun-zosma GitHub, zosmaai Twitter, correct LinkedIn |
| **Contact email** | hello@arjunnayak.dev | info@zosma.ai |
| **Profile photo** | Placeholder (no actual image) | Actual photo or professional avatar |
| **Metadata** | Generic descriptions about "web development" | Descriptions about AI agent systems and founder |
| **Site tagline** | "Software Engineer" | "Founder & CEO of Zosma AI" or similar |

---

## Implementation Steps

### Step 1: Update Home Page Bio

**What:** Replace the generic home page hero section with accurate, compelling information about the user's actual role as Founder & CEO of Zosma AI.

**Files to modify:**
- `src/app/page.tsx` — Rewrite bio section

**Key changes:**
- Tagline: `"Founder & CEO of Zosma AI"` instead of `"Software Engineer"`
- Bio text: Mention building AI agent systems, agentic harnesses, open-source projects
- Update CTA buttons: "View My Projects" → "Explore My Work" (or keep as is but link to real projects)
- Add a note about Zosma AI
- Update `generateMetadata()` to reflect founder role

**Bio text (proposed):**
> Founder & CEO of Zosma AI, where I build AI agent systems and agentic harnesses that automate real workflows. Previously co-founded Mavonic Technology (exit 2025). Over 7 years building full-stack systems, developer tools, and AI-native products. Based in Mumbai, India.

**Depends on:** Nothing (standalone page edit)

---

### Step 2: Update Social Links in Footer

**What:** Fix the footer social media links to point to the correct profiles.

**Files to modify:**
- `src/components/Footer.tsx` — Update href attributes

**Key changes:**
- GitHub: `https://github.com/arjunnayak` → `https://github.com/arjun-zosma`
- Twitter/X: `https://twitter.com/arjunnayak` → `https://twitter.com/zosmaai`
- LinkedIn: `https://linkedin.com/in/arjunnayak` → `https://linkedin.com/in/arjun-nayak-98780959`
- Optionally add: Website link to `https://www.zosma.ai`

**Depends on:** Nothing (standalone component edit)

---

### Step 3: Replace Projects Content with Real Projects

**What:** Replace the fake "E-Commerce Platform" sample project with real projects/products the user has built.

**Files to create/modify:**
- `content/projects/sample-project.md` → **Delete or replace with real project**
- Create: `content/projects/zosma-code.md`
- Create: `content/projects/zosma-cowork.md`
- Create: `content/projects/dhara.md`
- Create: `content/projects/openzosma.md`
- Create: `content/projects/zosma-qa.md`

**Real project data:**

| Project | Description | Tech Stack | Links |
|---------|-------------|------------|-------|
| **Zosma Code** | Full SDLC automation harness — plans, builds, tests, and deploys autonomously. One engineer does what six used to. | Next.js, TypeScript, Dhara, Playwright | GitHub: zosmaai/zosma-code |
| **Zosma Cowork** | Open-source desktop AI agent — a free, private alternative to Claude/ Copilot. Plain English, no setup. | TypeScript, Electron, pi SDK, LLMs | GitHub: zosmaai/zosma-cowork, Live: zosma.ai |
| **Dhara** | Open protocol standard for AI agents. Minimal, secure, language-agnostic coding agent harness. Built from India. | TypeScript, Protocol Buffers, CLI | GitHub: zosmaai/dhara |
| **OpenZosma** | Open-source digital twin for employees. AI that knows your tools, codebase, and workflows. | TypeScript, PostgreSQL, Vector DB, LLMs | GitHub: zosmaai/openzosma, Live: zosma.ai |
| **Zosma QA** | Zero-config QA platform — Playwright, AI agents, and extensible test runners. | TypeScript, Playwright, CLI | GitHub: zosmaai/zosma-qa |

**Depends on:** Nothing (content files + optional ProjectCard update if tech colors need extending)

---

### Step 4: Replace Blog Posts with Real Content

**What:** Replace the generic sample blog posts with real articles written by the user (from DEV.to).

**Files to create/modify:**
- `content/blog/hello-world.md` → **Delete or replace**
- `content/blog/getting-started.md` → **Delete or replace**
- Create: `content/blog/pitch-deck-ai.md` — "How I Turned a One-Line Prompt Into a 95% Complete Pitch Deck"
- Create: `content/blog/desktop-ai-coworker.md` — "We Built a Desktop AI Coworker So You Don't Need a Claude Subscription"
- Create: `content/blog/why-dhara.md` — "Why We Built Dhara — An Open Protocol Standard for AI Agents"

**Blog post data (from dev.to/arjun-zosma):**

| Slug | Title | Date | Tags |
|------|-------|------|------|
| `pitch-deck-ai` | How I Turned a One-Line Prompt Into a 95% Complete Pitch Deck | 2026-05-20 | ai, opensource, productivity, startup |
| `desktop-ai-coworker` | We Built a Desktop AI Coworker So You Don't Need a Claude Subscription | 2026-05-12 | opensource, ai, productivity, desktop |
| `why-dhara` | Why We Built Dhara — An Open Protocol Standard for AI Agents | 2026-05-12 | opensource, ai, agents, protocol |

**Content source:** The actual article content from the user's DEV.to posts will be adapted into Markdown for the blog.

**Depends on:** Nothing (content files)

---

### Step 5: Update Meta Descriptions & SEO

**What:** Update all page metadata to reflect the user's actual identity and focus.

**Files to modify:**
- `src/app/layout.tsx` — Root metadata (title template, description, OG)
- `src/app/page.tsx` — Home page metadata
- `src/app/projects/page.tsx` — Projects metadata
- `src/app/blog/page.tsx` — Blog metadata
- `src/app/contact/page.tsx` — Contact metadata

**Key changes:**
- Default description: From "building modern web applications" → "Founder & CEO of Zosma AI. Building AI agent systems and open-source agentic tools."
- OG tags update to match
- Blog description: From "web development" → "AI agents, agentic systems, and open-source tooling"
- Projects description: From "full-stack applications" → "AI agent systems, open-source tools, and agentic harnesses"

**Depends on:** Steps 1-4 (content exists to reference accurately)

---

### Step 6: Update Contact Email Configuration

**What:** Update the notification email address to match the user's actual domain.

**Files to modify:**
- `.env.local.example` — Update example email
- `src/lib/email.ts` — Update default CONTACT_EMAIL

**Key changes:**
- Default contact email: `hello@arjunnayak.dev` → `info@zosma.ai`
- `.env.local.example`: Update template values

**Depends on:** Nothing (standalone config update)

---

### Step 7: Add Profile Photo

**What:** Add an actual profile photo or professional avatar.

**Files to create/modify:**
- `public/images/profile.jpg` — Replace placeholder with actual photo (or use a generated avatar/initials-based SVG placeholder)

**Note:** Since we may not have access to the user's actual photo, we can:
- Option A: Use a professional headshot if available from LinkedIn/GitHub
- Option B: Generate an SVG avatar with initials "AN"
- Option C: Use the GitHub profile picture (currently available at github.com/arjun-zosma)

**Depends on:** Nothing (standalone asset)

---

### Step 8: Update Page Descriptions & Taglines

**What:** Update all descriptive text across the site to be authentic to the user.

**Files to modify:**
- `src/app/projects/page.tsx` — Description text
- `src/app/blog/page.tsx` — Description text
- `src/app/contact/page.tsx` — Description text

**Key changes:**
- Projects page subtext: "Things I've built and contributed to" → "AI agent systems, open-source tools, and agentic harnesses I've built."
- Blog page subtext: "Thoughts on software engineering, web development, and technology." → "Thoughts on AI agents, agentic systems, open-source, and building software that ships."
- All copy to reflect founder-level expertise

**Depends on:** Steps 1-4 (before/after context alignment)

---

### Step 9: Verify Contact Form API

**What:** Ensure the contact form API route and email sending are configured correctly for the new domain.

**Files to inspect:**
- `src/app/api/contact/route.ts` — Already functional, verify rate limiting and error handling
- `src/lib/email.ts` — Already functional, verify Resend config

**No changes expected** unless the Resend integration needs updating for the zosma.ai domain.

**Depends on:** Step 6 (email config)

---

## Dependency Graph

```
Step 1 (Home page bio)
  │
Step 2 (Footer social links) ────── standalone
Step 3 (Projects content) ───────── standalone
Step 4 (Blog content) ───────────── standalone
Step 6 (Contact email) ──────────── standalone
Step 7 (Profile photo) ──────────── standalone
  │
  ├── Step 5 (Meta descriptions) ── depends on Steps 1-4
  └── Step 8 (Page descriptions) ── depends on Steps 1-4
       │
       └── Step 9 (Verify API) ──── depends on Step 6
```

Steps 1, 2, 3, 4, 6, 7 are independent and can be done in parallel.
Steps 5 and 8 wait until the content changes are in place.
Step 9 is a verification step at the end.

---

## File Creation Order

### Files to Modify:
1. `src/app/page.tsx` — Rewrite bio section with accurate founder information
2. `src/components/Footer.tsx` — Fix social links to actual profiles
3. `src/components/Header.tsx` — Minor text updates if needed
4. `src/app/layout.tsx` — Update root metadata descriptions
5. `src/app/projects/page.tsx` — Update page description text
6. `src/app/blog/page.tsx` — Update page description text
7. `src/app/contact/page.tsx` — Update page description text
8. `.env.local.example` — Update example contact email
9. `src/lib/email.ts` — Update default contact email
10. `next-sitemap.config.js` — Update site URL if needed

### Files to Delete:
11. `content/projects/sample-project.md` — Remove fake project
12. `content/blog/hello-world.md` — Remove generic blog post (or replace content)
13. `content/blog/getting-started.md` — Remove generic blog post (or replace content)

### Files to Create:
14. `content/projects/zosma-code.md` — Real project
15. `content/projects/zosma-cowork.md` — Real project
16. `content/projects/dhara.md` — Real project
17. `content/projects/openzosma.md` — Real project
18. `content/projects/zosma-qa.md` — Real project
19. `content/blog/pitch-deck-ai.md` — Real blog post (from dev.to)
20. `content/blog/desktop-ai-coworker.md` — Real blog post
21. `content/blog/why-dhara.md` — Real blog post
22. `public/images/profile.jpg` — Actual profile photo / avatar

---

## Content Details

### Home Page Bio (New)

```
Founder & CEO of Zosma AI. I build AI agent systems and agentic harnesses 
that automate real workflows — not demos, not slides, just software that ships.

Previously co-founded Mavonic Technology (acquired 2025). Over 7 years building 
full-stack systems, developer tools, and AI-native products.

Open-source at GitHub. Writing about AI agents on DEV.to. Based in Mumbai, India.
```

### Tech Colors to Add in ProjectCard

```typescript
const techColors: Record<string, string> = {
  // ... existing colors ...
  'dhara': 'bg-orange-100 text-orange-800',
  'electron': 'bg-sky-100 text-sky-800',
  'playwright': 'bg-green-100 text-green-800',
  'protocol buffers': 'bg-yellow-100 text-yellow-800',
  'vector db': 'bg-violet-100 text-violet-800',
  'llm': 'bg-rose-100 text-rose-800',
  'cli': 'bg-slate-100 text-slate-800',
}
```

---

## Test Strategy

### Verification Checklist

| # | Check | How to Verify |
|---|-------|---------------|
| 1 | Home page shows accurate bio | `curl localhost:3000` — verify bio mentions Zosma AI |
| 2 | Social links point to correct profiles | Click GitHub → github.com/arjun-zosma, Twitter → twitter.com/zosmaai |
| 3 | Projects show real products | Visit `/projects` — should show Zosma Code, Zosma Cowork, Dhara, etc. |
| 4 | Blog posts are real content | Visit `/blog` — articles about AI agents, not generic tutorials |
| 5 | Metadata is accurate | Check `<title>` and `<meta>` tags on each page |
| 6 | Contact email updated | Check `.env.local.example` and `src/lib/email.ts` |
| 7 | Profile photo visible | Home page shows a real photo or professional avatar |
| 8 | No broken links | Click all nav links, project links, social links |
| 9 | Build succeeds | `npm run build` completes without errors |
| 10 | Sitemap up to date | `sitemap.xml` includes new blog posts |

### Before Marking Complete

1. **Full build test:** `npm run build` succeeds without errors
2. **Production test:** `npm run start` serves all routes correctly
3. **Content accuracy:** Every page has accurate, researched information
4. **No dead links:** All external links (GitHub, LinkedIn, Twitter, project URLs) are correct
5. **Blog posts load:** Each blog post renders correctly with proper formatting
6. **Project cards render:** Each project shows title, description, tech badges, and links
7. **SEO check:** Each page has unique title and meta description

### Future Considerations

- Connect actual domain name (arjunnayak.dev or similar) to Vercel deployment
- Add Zosma AI blog cross-posting (RSS feed from zosma.ai/blog)
- Add real project screenshots to project cards
- Implement Lighthouse CI for performance regression prevention
- Add GA / Plausible analytics

---

## Commit Strategy

1. After Steps 1-2 (bio + social): `fix: update home page bio with accurate founder info and fix social links`
2. After Step 3 (projects): `feat: replace sample projects with real Zosma AI projects`
3. After Step 4 (blog): `feat: replace generic blog posts with real articles`
4. After Steps 5-8 (metadata + copy): `fix: update site metadata and copy to match actual profile`
5. After Step 9 (verify): `chore: verify contact form and build integrity`

---

*End of implementation plan.*
