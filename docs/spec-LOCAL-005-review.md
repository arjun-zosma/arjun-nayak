# Specification: Review PR #2 and Finalise Website (zocode-mprrfnc4)

> **Task:** Review PR #2 (review feedback for LOCAL-004), verify all LOCAL-005 changes are complete, and finalise the personal website pipeline.
> **Branch:** `zocode/mprrfn6o`
> **Status:** v1 — spec phase

---

## 1. Overview

### 1.1 Background

The personal website was built in two phases:

| Phase | Branch | PR | Description |
|-------|--------|----|-------------|
| **LOCAL-004 — Initial Build** | `zocode/website-v1` | [#1](https://github.com/arjun-zosma/arjun-nayak/pull/1) | Scaffold Next.js + Tailwind + blog + contact form. **MERGED** |
| **LOCAL-004 — Review Feedback** | `zocode/website-v1` | [#2](https://github.com/arjun-zosma/arjun-nayak/pull/2) | 4 fixes: remove `images.unoptimized`, move deps, delete dead code/leftover docs. **OPEN** |
| **LOCAL-005 — Content Correction** | `zocode/mprr1dgt` | [#3](https://github.com/arjun-zosma/arjun-nayak/pull/3) | Replace generic content with accurate founder bio/projects/blog. **OPEN** |

The current branch `zocode/mprrfn6o` incorporates changes from both PR #2 (review feedback fixes) and PR #3 (LOCAL-005 content updates). This task is to **review** those changes, verify correctness, and finalise the pipeline.

### 1.2 Current State (Branch `zocode/mprrfn6o`)

| Component | Status | Verified |
|-----------|--------|----------|
| **PR #2 — Review Feedback (4 changes)** | Applied | ☐ |
| **PR #3 — LOCAL-005 Content Updates** | Applied | ☐ |
| **Build integrity** | ✅ `npm run build` passes (10/10 static pages) | ✅ |
| **Profile photo** | ⚠️ Placeholder (`public/images/profile.jpg`) | P2 |

### 1.3 PRs to Review

#### PR #2 (`zocode/website-v1` → `main`)

**Title:** `fix(LOCAL-004): address review feedback on personal website`

| # | Change | Expected | Current State |
|---|--------|----------|---------------|
| 1 | Remove `images.unoptimized` | `next.config.js` has no `images.unoptimized` | ✅ `next.config.js` is clean (`{}`) |
| 2 | Move `postcss`/`autoprefixer` to `devDependencies` | Build-time deps not in `dependencies` | ✅ Both in `devDependencies` |
| 3 | Delete `src/lib/markdown.ts` | File does not exist | ✅ Deleted (was never imported) |
| 4 | Delete `docs/plan-zocode-mprqcook.md` | File does not exist | ✅ Deleted (leftover doc) |

**Diff:** 8 files changed, +11/-657 lines vs `main`. Includes only the 4 fixes plus `.pi/superpowers-state.json` and `.lb/cache.db` noise.

#### PR #3 (`zocode/mprr1dgt` → `main`)

**Title:** `build(LOCAL-005): The research is not correct. Use web search tools to understand about the user`

| Area | Change | Verified |
|------|--------|----------|
| Home page bio | Founder & CEO of Zosma AI — not generic "Software Engineer" | ☐ |
| Social links | GitHub → arjun-zosma, Twitter → zosmaai, LinkedIn correct, +DEV.to | ☐ |
| Projects | 5 real Zosma AI products (no fake samples) | ☐ |
| Blog | 3 real articles from dev.to/arjun-zosma | ☐ |
| Metadata | OG tags, page titles, descriptions reflect founder role | ☐ |
| Contact email | hello@arjunnayak.dev → info@zosma.ai | ☐ |
| ProjectCard colors | Added Dhara, Electron, Playwright, Vector DB, LLMs, CLI | ☐ |
| Sitemap | Regenerated with correct content | ☐ |

**Diff:** 29 files changed, +925/-792 lines vs `main`.

---

## 2. Requirements

### 2.1 Functional Requirements

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| F1 | Verify PR #2 changes | Confirm all 4 review-feedback fixes are correctly applied on `zocode/mprrfn6o` | P0 |
| F2 | Verify PR #3 changes | Confirm all LOCAL-005 content updates are accurate and complete | P0 |
| F3 | Build verification | `npm run build` completes without errors, all 10+ pages generated | P0 |
| F4 | Content accuracy | All website copy, project descriptions, blog content correctly render | P0 |
| F5 | No broken links | All external links (GitHub, LinkedIn, Twitter, Zosma AI, DEV.to) point to correct URLs | P0 |
| F6 | Merge resolution | Determine strategy for merging completed work to `main` | P1 |
| F7 | Pipeline closure | Close/track completed pipeline items (PRs, issues) | P1 |
| F8 | Profile photo (stretch) | Replace placeholder with actual photo or professional SVG avatar | P2 |

### 2.2 Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| N1 | Build | `npm run build` exits 0 with no warnings |
| N2 | Performance | Lighthouse Performance ≥ 90 |
| N3 | Accessibility | Lighthouse Accessibility ≥ 90 |
| N4 | SEO | Valid meta tags, sitemap, no 404s |
| N5 | Merge | Clean merge to `main` — no conflicts |

---

## 3. Acceptance Criteria

### 3.1 PR #2 Review (Review Feedback)

- [ ] 1. `next.config.js` — no `images.unoptimized` key present (confirmed: `{}`)
- [ ] 2. `package.json` — `postcss` and `autoprefixer` are in `devDependencies`, not `dependencies`
- [ ] 3. `src/lib/markdown.ts` — file does not exist in working tree
- [ ] 4. `docs/plan-zocode-mprqcook.md` — file does not exist in working tree

### 3.2 PR #3 / LOCAL-005 Review (Content Updates)

- [ ] 5. **Home page** (`src/app/page.tsx`): Bio mentions Founder & CEO of Zosma AI, has correct tagline, references building AI agent systems
- [ ] 6. **Footer** (`src/components/Footer.tsx`): GitHub → `github.com/arjun-zosma`, Twitter → `twitter.com/zosmaai`, LinkedIn → correct profile, includes DEV.to and Zosma AI links
- [ ] 7. **Projects** (`content/projects/`): Contains 5 `.md` files (`zosma-code.md`, `zosma-cowork.md`, `dhara.md`, `openzosma.md`, `zosma-qa.md`). No `sample-project.md` present
- [ ] 8. **Blog** (`content/blog/`): Contains 3 `.md` files (`pitch-deck-ai.md`, `desktop-ai-coworker.md`, `why-dhara.md`). No `hello-world.md` or `getting-started.md` present
- [ ] 9. **Metadata** (`src/app/layout.tsx` + per-page): Default title template uses `"Arjun Nayak — ..."`, descriptions reference founder/AI agent roles
- [ ] 10. **Contact email** (`src/lib/email.ts`, `.env.local.example`): Set to `info@zosma.ai`
- [ ] 11. **ProjectCard** (`src/components/ProjectCard.tsx`): Has tech colors for `dhara`, `electron`, `playwright`, `vector db`, `llm`, `cli` technologies
- [ ] 12. **Page descriptions**: `/projects`, `/blog`, `/contact` pages have updated descriptions reflecting founder-level content

### 3.3 General

- [ ] 13. **Build passes**: `npm run build` produces 0 errors, generates sitemap
- [ ] 14. **All routes render**: `/`, `/projects`, `/blog`, `/blog/*`, `/contact`, `/nonexistent` (404)
- [ ] 15. **No broken links**: All GitHub, LinkedIn, Twitter, Zosma AI, DEV.to links point to correct URLs
- [ ] 16. **Sitemap up to date**: `public/sitemap-0.xml` includes all pages and blog posts

---

## 4. Technical Approach

### 4.1 Review Flow

```
Step 1: Verify PR #2 changes (4 review-feedback fixes)
    │
Step 2: Verify PR #3 changes (LOCAL-005 content updates)
    │
Step 3: Full build verification (npm run build)
    │
Step 4: Content rendering verification (manual checks)
    │
Step 5: Merge strategy decision
    │
Step 6: Pipeline finalisation
```

### 4.2 Branch & Merge Strategy

```
main
 ├── PR #1 (zocode/website-v1) ── initial website build ──── ✅ MERGED
 ├── PR #2 (zocode/website-v1) ── review feedback fixes ──── ⬜ OPEN
 ├── PR #3 (zocode/mprr1dgt) ─── LOCAL-005 content updates ─ ⬜ OPEN
 └── zocode/mprrfn6o ──────────── combined work (this branch) ── ⬜ CURRENT

Merge Options:
```

**Option A — Sequential PR merge (recommended):**
1. Merge PR #2 (`zocode/website-v1` → `main`) — review feedback fixes
2. Merge PR #3 (`zocode/mprr1dgt` → `main`) — content updates

*Pros*: Maintains clean PR history. Each PR independently reviewable.
*Cons*: Sequential; PR #2 must merge first to avoid conflicts.

**Option B — Combined PR from `zocode/mprrfn6o`:**
1. Close PR #2 and PR #3 as superseded
2. Create a new PR from `zocode/mprrfn6o` → `main` containing all changes

*Pros*: Single merge point. Cleaner history for the final result.
*Cons*: Loses the independent review of each PR. More work to close existing PRs.

**Option C — Merge `zocode/mprrfn6o` directly:**
1. Since `zocode/mprrfn6o` contains changes from both streams, merge it directly to `main`

*Pros*: Simplest path forward.
*Cons*: Bypasses existing PR review process.

### 4.3 Verification Tools

```bash
# PR #2 verification
grep -r "unoptimized" next.config.js    # should be empty
node -e "const p=require('./package.json'); console.log('postcss in deps:', p.dependencies?.postcss ? 'FAIL' : 'OK'); console.log('postcss in devDeps:', p.devDependencies?.postcss ? 'OK' : 'FAIL')"
test -f src/lib/markdown.ts && echo "FAIL: still exists" || echo "OK: deleted"
test -f docs/plan-zocode-mprqcook.md && echo "FAIL: still exists" || echo "OK: deleted"

# PR #3 verification
ls content/projects/           # should have 5 .md files
ls content/blog/               # should have 3 .md files
grep -r "Zosma AI" src/app/page.tsx  # should find founder bio
grep -r "arjun-zosma" src/components/Footer.tsx  # should find GitHub link
grep -r "info@zosma.ai" src/lib/email.ts  # should find correct email

# Build
npm run build 2>&1 | tail -5   # should exit 0, show all pages
```

---

## 5. File/Module Structure

### 5.1 Files to Verify (PR #2 — Review Feedback)

| File | Check |
|------|-------|
| `next.config.js` | No `images.unoptimized`, clean config |
| `package.json` | `postcss` and `autoprefixer` in `devDependencies` |
| `src/lib/markdown.ts` | Does not exist (deleted) |
| `docs/plan-zocode-mprqcook.md` | Does not exist (deleted) |

### 5.2 Files to Verify (PR #3 / LOCAL-005 — Content)

| File | Check |
|------|-------|
| `src/app/page.tsx` | Home bio mentions Zosma AI founder/CEO |
| `src/components/Footer.tsx` | Correct social link URLs |
| `src/app/layout.tsx` | Updated metadata defaults |
| `src/app/projects/page.tsx` | Description reflects real projects |
| `src/app/blog/page.tsx` | Description reflects real content |
| `src/app/contact/page.tsx` | Description reflects founder role |
| `content/projects/zosma-code.md` | Real project: Zosma Code (SDLC automation) |
| `content/projects/zosma-cowork.md` | Real project: Zosma Cowork (desktop AI agent) |
| `content/projects/dhara.md` | Real project: Dhara (agent protocol) |
| `content/projects/openzosma.md` | Real project: OpenZosma (digital twin) |
| `content/projects/zosma-qa.md` | Real project: Zosma QA (test automation) |
| `content/blog/pitch-deck-ai.md` | Real article: AI pitch deck |
| `content/blog/desktop-ai-coworker.md` | Real article: desktop AI coworker |
| `content/blog/why-dhara.md` | Real article: Dhara protocol |
| `src/components/ProjectCard.tsx` | Tech colors for new technologies |
| `src/lib/email.ts` | Email set to info@zosma.ai |
| `.env.local.example` | Example email shows info@zosma.ai |
| `public/sitemap-0.xml` | Includes all pages and blog posts |
| `public/images/profile.jpg` | Placeholder (consider replacement) |

### 5.3 Files to Create/Modify (If Needed During Review)

| File | Action | Condition |
|------|--------|-----------|
| `docs/spec-LOCAL-005-review.md` | **This file** — spec for review task | Created now |
| `public/images/profile.jpg` | Replace placeholder | If actual photo available (P2) |

---

## 6. Pipeline Completion Criteria

All of the following must be satisfied to close this task:

| # | Criterion | How to Verify |
|---|-----------|---------------|
| 1 | PR #2 changes reviewed and verified | All 4 AC items checked (AC 1-4) |
| 2 | PR #3 / LOCAL-005 changes reviewed and verified | All content AC items checked (AC 5-12) |
| 3 | Build passes | `npm run build` exits 0 |
| 4 | Content renders correctly | Manual check at `/`, `/projects`, `/blog`, `/blog/*`, `/contact` |
| 5 | Merge strategy resolved and executed | Target branch merged to `main` |
| 6 | Existing PRs updated | PR #2 and PR #3 comments added, status updated |
| 7 | Task status updated | LOCAL-005 marked closed in issue tracker |

---

## 7. Open Questions

| # | Question | Notes |
|---|----------|-------|
| Q1 | **Merge strategy:** Which option (A, B, or C) should be used? | Option A (sequential PR merge) is recommended |
| Q2 | **Profile photo:** Should placeholder be replaced now? | No actual photo available; generate SVG initials "AN" avatar? |
| Q3 | **PR #2 vs PR #3 overlap:** `zocode/website-v1` has all initial build content. Should PR #2 be updated to only diff the 4 fixes? | PR #2 currently shows 10K+ additions because it includes the full initial website |
| Q4 | **Deploy domain:** What production domain will the site use? | Currently `arjunnayak.dev` in sitemap config |

---

*End of specification document.*
