# Specification: Website Review & Finalisation (LOCAL-005)

> **Task:** Review PR #2 (review feedback for LOCAL-004), verify all LOCAL-005 changes are complete, and finalise the personal website pipeline.
> **Status:** v1 — spec phase

---

## 1. Overview

### 1.1 Background

The personal website (LOCAL-004) was initially built on `zocode/website-v1` with a generic junior-dev bio, fake sample projects, placeholder blog posts, incorrect social links, and an unoptimised image configuration. Two streams of work followed:

1. **PR #1 review feedback** (PR #2, `zocode/website-v1` → `main`): Minor code-quality fixes — removing `images.unoptimized`, moving build-time deps, deleting dead code.
2. **LOCAL-005 build** (PR #3, `zocode/mprr9klj` → `main`): Replaced all inaccurate content with verified, researched information about Arjun Nayak (Founder & CEO of Zosma AI) — real projects, real blog posts, correct social links, updated metadata.

The branch `zocode/mprrajm3` (this task) incorporates both streams and needs review and finalisation before merging to `main`.

### 1.2 Current State (Branch `zocode/mprrajm3`)

| Component | Status | Details |
|-----------|--------|---------|
| **Home page bio** | ✅ Done | Accurate founder bio — Zosma AI, Mavonic Technology, 7+ yrs |
| **Social links** | ✅ Done | GitHub → arjun-zosma, Twitter → zosmaai, LinkedIn correct, DEV.to added |
| **Projects** | ✅ Done | 5 real Zosma AI products (no fake sample) |
| **Blog** | ✅ Done | 3 real articles from dev.to/arjun-zosma |
| **Metadata/SEO** | ✅ Done | All page titles, descriptions, OG tags updated |
| **Contact email** | ✅ Done | hello@arjunnayak.dev → info@zosma.ai |
| **ProjectCard tech colors** | ✅ Done | Dhara, Electron, Playwright, Vector DB, LLMs, CLI, Pi SDK |
| **Image optimisation** | ✅ Done | `images.unoptimized` removed from `next.config.js` |
| **Dep management** | ✅ Done | postcss/autoprefixer moved to devDependencies |
| **Dead code** | ✅ Done | `src/lib/markdown.ts` deleted |
| **Leftover docs** | ✅ Done | `docs/plan-zocode-mprqcook.md` deleted |
| **Profile photo** | ⚠️ Placeholder | Uses placeholder `public/images/profile.jpg` |
| **PR #2 (review feedback)** | 🔍 Needs review | 4 changes need verification |
| **PR #3 (LOCAL-005 build)** | 🔍 Needs review | ~655 insertions, ~792 deletions |
| **Pipeline** | 🔄 `in_progress` | Phase: review complete; awaiting closure |

---

## 2. Requirements

### 2.1 Functional Requirements

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| F1 | Review PR #2 changes | Verify the 4 review-feedback fixes are correct and complete: `images.unoptimized`, devDeps, dead code, leftover docs | P0 |
| F2 | Review PR #3 changes | Verify all LOCAL-005 content updates are accurate — bio, projects, blog, social links, metadata, email, sitemap | P0 |
| F3 | Verify build integrity | `npm run build` completes without errors, all pages render correctly | P0 |
| F4 | Verify no conflicts | Current branch `zocode/mprrajm3` should be mergeable with `main` (resolve any conflicts) | P0 |
| F5 | Resolve merge strategy | Determine whether to merge via PR #2 + PR #3 sequentially, or create a new combined PR from `zocode/mprrajm3` | P1 |
| F6 | Profile photo | Replace placeholder `/images/profile.jpg` with actual photo or professional avatar | P2 |
| F7 | Production deployment | Deploy merged `main` to Vercel with proper domain configuration | P1 |
| F8 | Post-deployment verification | Verify all pages, links, SEO, sitemap work on production | P1 |

### 2.2 Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| N1 | Build | `npm run build` exits 0 with no warnings |
| N2 | Performance | Lighthouse Performance ≥ 90 |
| N3 | Accessibility | Lighthouse Accessibility ≥ 90 |
| N4 | SEO | Valid meta tags, sitemap, no 404s |
| N5 | Merge | Clean merge to `main` — no conflicts after resolution |

---

## 3. Acceptance Criteria

1. **PR #2 review completed** — All 4 changes verified:
   - `next.config.js` has `images.unoptimized` removed
   - `package.json` has `postcss`/`autoprefixer` in `devDependencies`
   - `src/lib/markdown.ts` does not exist
   - `docs/plan-zocode-mprqcook.md` does not exist

2. **LOCAL-005 content verified** — All changes from PR #3 confirmed:
   - Home page bio mentions Zosma AI founder/CEO role
   - Footer has correct social links (arjun-zosma GitHub, zosmaai Twitter, correct LinkedIn)
   - 5 real projects displayed (zosma-code, zosma-cowork, dhara, openzosma, zosma-qa)
   - 3 real blog posts (pitch-deck-ai, desktop-ai-coworker, why-dhara)
   - Metadata/OG tags reflect founder-level content
   - Contact email set to info@zosma.ai

3. **Build passes** — `npm run build` succeeds with all pages

4. **Merge strategy resolved** — Either PR #2 or PR #3 or a combined PR is merged to `main`

5. **Sitemap regenerated** — `sitemap.xml` includes all new blog posts and project pages

---

## 4. Technical Approach

### 4.1 Review Flow

```
Step 1: Review PR #2 changes (diff analysis)
    │
Step 2: Review PR #3 / LOCAL-005 changes (content verification)
    │
Step 3: Build verification (npm run build)
    │
Step 4: Merge strategy decision
    │
Step 5: Pipeline closure (update task status)
```

### 4.2 Branch Relationship

```
main
 ├── PR #1 (website-v1) ─── initial build ──── merged
 ├── PR #2 (website-v1) ─── review feedback ── pending merge
 ├── PR #3 (mprr9klj) ───── LOCAL-005 build ── pending merge
 └── zocode/mprrajm3 ────── combined work ──── current branch
```

**Merge Options:**
- **Option A**: Merge PR #2 → main, then merge PR #3 → main (sequential)
- **Option B**: Close both PRs, create new PR from `zocode/mprrajm3` → main (combined)
- **Option C**: Merge `zocode/website-v1` → main (PR #2), then merge `zocode/mprrajm3` → main (superseding PR #3)

### 4.3 Code Review Checklist

#### PR #2 (Review Feedback)
| Check | Expected | Verified |
|-------|----------|----------|
| `next.config.js` | No `images.unoptimized` | ☐ |
| `package.json` | postcss, autoprefixer in devDependencies | ☐ |
| `src/lib/markdown.ts` | Deleted | ☐ |
| `docs/plan-zocode-mprqcook.md` | Deleted | ☐ |

#### LOCAL-005 (Content Updates)
| Check | Expected | Verified |
|-------|----------|----------|
| `src/app/page.tsx` | Founder/CEO bio, Zosma AI | ☐ |
| `src/app/layout.tsx` | Updated metadata, OG tags | ☐ |
| `src/components/Footer.tsx` | Correct social links | ☐ |
| `content/projects/` | 5 real project files | ☐ |
| `content/blog/` | 3 real blog post files | ☐ |
| `src/lib/email.ts` | info@zosma.ai | ☐ |
| `.env.local.example` | info@zosma.ai example | ☐ |
| `src/components/ProjectCard.tsx` | New tech colors added | ☐ |
| `public/sitemap-0.xml` | Updated with new content | ☐ |
| `next.config.js` | Clean image config | ☐ |

---

## 5. File/Module Structure

### 5.1 Files to Review (PR #2 — Review Feedback)

| File | Action | Notes |
|------|--------|-------|
| `next.config.js` | Verify `images.unoptimized` removed | Already applied |
| `package.json` | Verify postcss/autoprefixer in devDependencies | Already applied |
| `src/lib/markdown.ts` | Verify deleted | Already applied |
| `docs/plan-zocode-mprqcook.md` | Verify deleted | Already applied |

### 5.2 Files to Review (LOCAL-005 — Content Updates)

| File | Action | Notes |
|------|--------|-------|
| `src/app/page.tsx` | Verify bio content | Already applied |
| `src/components/Footer.tsx` | Verify social links | Already applied |
| `src/app/layout.tsx` | Verify metadata | Already applied |
| `src/app/projects/page.tsx` | Verify description | Already applied |
| `src/app/blog/page.tsx` | Verify description | Already applied |
| `src/app/contact/page.tsx` | Verify description | Already applied |
| `content/projects/zosma-code.md` | Verify content | Already applied |
| `content/projects/zosma-cowork.md` | Verify content | Already applied |
| `content/projects/dhara.md` | Verify content | Already applied |
| `content/projects/openzosma.md` | Verify content | Already applied |
| `content/projects/zosma-qa.md` | Verify content | Already applied |
| `content/blog/pitch-deck-ai.md` | Verify content | Already applied |
| `content/blog/desktop-ai-coworker.md` | Verify content | Already applied |
| `content/blog/why-dhara.md` | Verify content | Already applied |
| `src/components/ProjectCard.tsx` | Verify tech colors | Already applied |
| `src/lib/email.ts` | Verify email | Already applied |
| `.env.local.example` | Verify email | Already applied |
| `public/images/profile.jpg` | Consider replacing placeholder | Placeholder |
| `public/sitemap-0.xml` | Regenerate if needed | Already updated |

### 5.3 Files to Modify (If Needed)

| File | Action | Condition |
|------|--------|-----------|
| `public/images/profile.jpg` | Replace placeholder photo | If actual photo available |
| `docs/plan-LOCAL-005.md` | Keep as plan artifact | Already exists |
| `docs/spec-LOCAL-005.md` | This file | Created now |

### 5.4 Files to Delete (If Present)

| File | Reason |
|------|--------|
| (None currently identified) | |

---

## 6. Verification Plan

### 6.1 Build Verification

```bash
# Full production build
npm run build

# Verify no errors, all pages generated
# Expected: ✓ (static) pages generated
```

### 6.2 Content Verification

```bash
# Check bio on home page
grep -r "Zosma AI" src/app/page.tsx

# Check social links
grep -r "arjun-zosma\|zosmaai" src/components/Footer.tsx

# Check projects exist
ls content/projects/

# Check blog posts exist
ls content/blog/

# Check contact email
grep "info@zosma.ai" src/lib/email.ts .env.local.example
```

### 6.3 Merge Verification

```bash
# Check for merge conflicts with main
git fetch origin
git merge-base --is-ancestor HEAD origin/main || echo "Branch behind main"
git diff --name-only main..HEAD --stat

# Verify no unintended changes
```

---

## 7. Pipeline Completion Criteria

All of the following must be true to close LOCAL-005:

| # | Criterion | How to Verify |
|---|-----------|---------------|
| 1 | PR #2 reviewed and approved | Review comments added to PR #2 |
| 2 | LOCAL-005 changes verified | Content check on branch passes |
| 3 | Build passes | `npm run build` exits 0 |
| 4 | Merge to main completed | Branch merged |
| 5 | PRs updated/closed | PR #2 and PR #3 status updated |
| 6 | Task status updated | LOCAL-005 → closed in issue tracker |

---

## 8. Open Questions

| # | Question | Decision Needed By |
|---|----------|-------------------|
| Q1 | Merge strategy: sequential PR merge vs combined new PR? | Reviewer |
| Q2 | Should we replace the profile photo placeholder now? | If photo available |
| Q3 | What is the target production domain? | arjunnayak.dev or zosma.ai? |
| Q4 | Should existing open PRs (#2, #3) be closed in favor of a combined PR? | Reviewer |

---

*End of specification document.*
