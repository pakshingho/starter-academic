# Project Context: pakshingho.com Portfolio Refresh

Last updated: 2026-02-24
Repository: `git@github.com:pakshingho/starter-academic.git`
Primary branch: `master`

## Scope Completed

- Migrated site from single-page-style nav links to a multi-page information architecture.
- Added top-level content pages and filled them with non-placeholder copy.
- Grouped navbar into dropdown sections to reduce crowding.
- Fixed navbar wrapping (`Open-Source`) with CSS.
- Updated site copy using:
  - GitHub profile/repository context (`https://github.com/pakshingho`)
  - LinkedIn export context from `Basic_LinkedInDataExport_02-24-2026.zip.zip` (`Profile.csv`)
  - LinkedIn PDF export context from `/Users/pakshingho/Downloads/Profile.pdf` for exact experience dates.
- Updated homepage Experience widget (`content/home/experience.md`) with corrected timeline and restored Geode entry.

## Current Information Architecture

Top nav groups are configured in `config/_default/menus.toml`:

- `Home`
- `Work`:
  - `Projects`
  - `Experience`
  - `Open-Source`
- `Research`:
  - `Research`
  - `Talks`
  - `Resources`
- `About`:
  - `About`
  - `Contact`
  - `LinkedIn`
  - `GitHub`

## Important Content Files Updated

- `content/projects.md`
- `content/research.md`
- `content/resources.md`
- `content/about.md`
- `content/experience.md`
- `content/open-source.md`
- `content/contact.md`
- `content/authors/admin/_index.md`
- `content/home/experience.md`
- `assets/scss/custom.scss`
- `config/_default/menus.toml`

## Experience Dates Source of Truth

Source used: `/Users/pakshingho/Downloads/Profile.pdf` (LinkedIn export PDF)

Homepage experience entries are aligned to extracted timeline:

- LinkedIn `Applied Scientist/MLE/Economist`: Jan 2025 - Present
- Amazon `Lead Scientist/Economist - Seller Growth & Amazon Shipping`: May 2020 - Jan 2025
- Amazon `Economist`: May 2020 - Aug 2020
- Geode `Quantitative Researcher`: Jun 2019 - Aug 2019
- Plus Boston University / NBER / Barcelona GSE / UPF entries from same PDF timeline

## Deployment Notes

- Hosting: Netlify
- Repo-linked deploy was fixed after permissions issue.
- Deploys auto-trigger on push to `master`.

## Recent Commits (newest first)

- `aa4960b` Sync homepage experience timeline with LinkedIn export dates
- `b3b595f` Update homepage experience entries to LinkedIn profile context
- `6ef6fac` Update site copy from LinkedIn export profile context
- `0675468` Align site content with LinkedIn and GitHub profile context
- `7378d90` Replace placeholder pages with real project and profile content
- `f4ccbbf` Group navbar into dropdown sections
- `e694996` Prevent navbar labels from wrapping
- `c7644c5` Prevent Open Source nav label wrapping
- `d779cea` Build multi-page portfolio structure and starter copy
- `9226369` Expand top navigation and add category pages

## Known Local Workspace Detail

- Current Codex thread is anchored at `/Users/pakshingho/Documents/New project 4` (compatibility symlink).
- Real project folder is `/Users/pakshingho/Documents/project_personal_portfolio_website`.
- Safe cleanup path:
  1. Open a new Codex thread rooted at `/Users/pakshingho/Documents/project_personal_portfolio_website`
  2. Remove symlink `/Users/pakshingho/Documents/New project 4`

## Next Recommended Work

1. Refine homepage hero copy to match the updated LinkedIn positioning.
2. Add publication entries under `content/publication/` to populate Research output.
3. Add talk entries under `content/talk/`.
4. Convert key projects into deeper case-study pages (problem/method/impact).
5. Replace any remaining generic copy with role-verified bullets.

