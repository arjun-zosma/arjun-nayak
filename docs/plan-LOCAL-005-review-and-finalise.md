# Implementation Plan: Review & Finalise Personal Website (LOCAL-005)

> **Task:** Review PR #2, verify all LOCAL-005 changes, and finalise the personal website pipeline.
> **Spec:** `docs/spec-LOCAL-005-review.md`
> **Branch:** `zocode/mprrfn6o`
> **Status:** v1 — plan phase

---

## Summary

This plan covers the review, verification, merge, and closure of the LOCAL-005 website finalisation task. The branch `zocode/mprrfn6o` already incorporates both the PR #2 review feedback and the LOCAL-005 content updates. The work ahead is:

1. Document the verification that all changes are correct
2. Regenerate the sitemap
3. Merge `zocode/mprrfn6o` → `main` via a combined PR
4. Close the existing PRs (#2, #3) in favour of the combined PR
5. Update the deployment scripts and verify the production deploy

---

## Current State Assessment

### PR #2 Review Feedback (4 Checks)

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| `next.config.js` | No `images.unoptimized` | `images.unoptimized` removed — clean config | ✅ |
| `package.json` | postcss/autoprefixer in devDependencies | Both moved to `devDependencies` | ✅ |
| `src/lib/markdown.ts` | Deleted | File does not exist | ✅ |
| `docs/plan-zocode-mprqcook.md` | Deleted | File does not exist | ✅ |

### LOCAL-005 Content Updates (Verification)

| Component | Expected | Status |
|-----------|----------|--------|
| **Home page bio** | Founder & CEO of Zosma AI, 7+ yrs, Mavonic exit | ✅ Verified |
| **Social links** | GitHub → arjun-zosma, Twitter → zosmaai, LinkedIn correct, DEV.to + Zosma AI added | ✅ Verified |
| **Projects** | 5 real Zosma AI products (zosma-code, zosma-cowork, dhara, openzosma, zosma-qa) | ✅ Verified |
| **Blog** | 3 real articles (pitch-deck-ai, desktop-ai-coworker, why-dhara) | ✅ Verified |
| **Metadata/SEO** | Updated title, description, OG tags on all pages | ✅ Verified |
| **Contact email** | info@zosma.ai | ✅ Verified |
| **ProjectCard tech colors** | dhara, electron, playwright, vector db, llms, cli, pi sdk added | ✅ Verified |
| **Page descriptions** | Projects, Blog, Contact pages updated to reflect founder content | ✅ Verified |
| **Build** | `npm run build` passes with all pages generated (11/11) | ✅ Verified |

### Branch Status

| Metric | Value |
|--------|-------|
| Branch | `zocode/mprrfn6o` |
| Commits ahead of `main` | 9 |
| Commits behind `main` | 1 (initial merged PR) |
| Merge conflicts with `main` | None |
| Build status | ✅ Passes |

---

## Implementation Steps

### Step 1: Document Review Findings

**What:** Create a formal review document capturing the verification of all PR #2 and LOCAL-005 changes.

**Files to create:**
- `docs/review-LOCAL-005.md` — Review summary with all checkpoints verified

**Content:** Include the two verification tables from the Current State Assessment above, plus any observations.

**Depends on:** Nothing (observation-only step)

---

### Step 2: Regenerate Sitemap

**What:** Regenerate the sitemap to ensure all new blog posts and project pages are indexed.

**Files to modify:**
- `public/sitemap-0.xml` — Regenerate via `next-sitemap`
- `public/robots.txt` — Verify exists

**Commands:**
```bash
npx next-sitemap --config next-sitemap.config.js
```

**Verification:** Check that `sitemap-0.xml` includes all 3 blog posts and all 5 project URLs.

**Depends on:** Nothing (standalone regeneration)

---

### Step 3: Merge Preparation

**What:** Prepare the branch for merge — ensure it's up to date with `main` and the commit history is clean.

**Files to modify:** None (git operations)

**Commands:**
```bash
git fetch origin main
git rebase origin/main
# Handle any conflicts (none expected)
```

**Verify:**
```bash
git log --oneline origin/main..HEAD  # Clean set of commits
npm run build                        # Rebuild after rebase
```

**Depends on:** Step 2 (sitemap regenerated before merge)

---

### Step 4: Create Combined Pull Request

**What:** Push the rebased branch and create a new combined PR from `zocode/mprrfn6o` → `main`, superseding both PR #2 and PR #3.

**Files to modify:** None (GitHub operations)

**Commands:**
```bash
git push origin zocode/mprrfn6o --force-with-lease
gh pr create \
  --base main \
  --head zocode/mprrfn6o \
  --title "feat(LOCAL-005): review PR #2 feedback, finalise website with accurate content" \
  --body "## Summary

Combined PR superseding:
- PR #2 (review feedback — code quality fixes)
- PR #3 (LOCAL-005 — accurate research content)

### Changes
- Fixed `next.config.js` (removed `images.unoptimized`)
- Moved postcss/autoprefixer to devDependencies
- Deleted dead code (`src/lib/markdown.ts`, `docs/plan-zocode-mprqcook.md`)
- Updated home page bio: Founder & CEO of Zosma AI
- Updated social links: arjun-zosma GitHub, zosmaai Twitter, correct LinkedIn, DEV.to
- Replaced 1 fake project with 5 real Zosma AI products
- Replaced 2 generic blog posts with 3 real DEV.to articles
- Updated all metadata, OG tags, and page descriptions
- Updated contact email to info@zosma.ai
- Added new tech colors to ProjectCard
- Regenerated sitemap

### Verification
- ✅ Build passes (11/11 pages)
- ✅ No merge conflicts with main
- ✅ All PR #2 review checks pass
- ✅ All LOCAL-005 content updates verified"
```

**Depends on:** Step 3 (rebase complete)

---

### Step 5: Merge Pull Request

**What:** Merge the combined PR into `main`.

**Commands:**
```bash
gh pr merge --squash --delete-branch
```

**Post-merge:**
```bash
git checkout main
git pull origin main
```

**Depends on:** Step 4 (PR created and reviewed)

---

### Step 6: Close Existing PRs

**What:** Close PR #2 and PR #3 with a note that they're superseded by the combined PR.

**Commands:**
```bash
gh pr close 2 --comment "Superseded by combined PR from zocode/mprrfn6o → main"
gh pr close 3 --comment "Superseded by combined PR from zocode/mprrfn6o → main"
```

**Depends on:** Step 5 (merge complete)

---

### Step 7: Update Deployment Scripts

**What:** Ensure deployment scripts reference the correct branch and build process. The existing `scripts/deploy.sh` and `scripts/watch-and-serve.sh` currently watch `main`, which is correct for production.

**Files to review:**
- `scripts/deploy.sh` — Should work as-is (watches `main`)
- `scripts/watch-and-serve.sh` — Should work as-is (watches `main`)

**Changes needed:** None expected — these scripts already pull from `main` and rebuild.

**Verification:** After merge to `main`, the deployment scripts should detect the new commits and auto-deploy.

**Depends on:** Step 5 (merge complete)

---

### Step 8: Production Deployment Verification

**What:** Verify the production deployment is serving the updated website correctly.

**Checks:**
1. Website loads at production URL
2. Home page shows Founder/CEO bio
3. All 5 projects render on `/projects`
4. All 3 blog posts render on `/blog`
5. Contact form loads on `/contact`
6. Social links point to correct profiles
7. No 404s on any internal links
8. Sitemap includes all URLs

**Commands:**
```bash
curl -s https://arjunnayak.dev | grep -c "Zosma AI"
curl -s https://arjunnayak.dev/projects | grep -c "zosma-code"
curl -s https://arjunnayak.dev/blog | grep -c "pitch-deck-ai"
```

**Depends on:** Step 7 (deployment scripts triggered)

---

### Step 9: Pipeline Closure

**What:** Update the zocode task status to closed.

**Commands:**
```bash
zocode_update_task --task LOCAL-005 --status closed --comment "All changes verified, merged to main, production deployed"
```

**Depends on:** Step 5 (merge complete), Step 8 (deployment verified)

---

## Dependency Graph

```
Step 1 (Review docs) ── standalone (observation)
    │
Step 2 (Sitemap) ────── standalone
    │
    ├── Step 3 (Rebase) ───────────── depends on Step 2 (optional)
    │       │
    │       ├── Step 4 (Create PR) ── depends on Step 3
    │       │       │
    │       │       ├── Step 5 (Merge) ── depends on Step 4
    │       │       │       │
    │       │       │       ├── Step 6 (Close PRs) ── depends on Step 5
    │       │       │       ├── Step 7 (Deploy scripts) ── depends on Step 5
    │       │       │       └── Step 9 (Pipeline closure) ── depends on Step 5
    │       │       │
    │       │       └── Step 8 (Prod verification) ── depends on Step 5+7
```

Steps 1 and 2 are independent and can run first.
Steps 3-6 are sequential (rebuild, PR, merge, close).
Steps 7-8 verify the deployment.
Step 9 closes the pipeline.

---

## Rollback Plan

If the combined PR introduces issues:

1. **Before merge:** Do not merge — fix issues and re-verify.
2. **After merge (main broken):** Use `git revert HEAD` on `main` to revert the squashed merge commit, then push.
3. **After production deploy (broken):** Use `scripts/deploy.sh` to redeploy the previous working commit, OR use Vercel's rollback feature.

---

## Commit Strategy

1. After Step 1: `docs: add review documentation for LOCAL-005 verification`
2. After Step 2: `chore: regenerate sitemap with all blog posts and projects`
3. After Step 3-6: Single squashed merge commit to `main`

---

## Artifacts

| Key | Path | Description |
|-----|------|-------------|
| `review` | `docs/review-LOCAL-005.md` | Formal review document |
| `plan` | `docs/plan-LOCAL-005-review-and-finalise.md` | This file |

---

*End of implementation plan.*
