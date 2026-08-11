# EQGenix — Static Production Website

A complete, deployment-ready multi-page static website. HTML5 + CSS3 + vanilla JavaScript.
No build step. No npm. No frameworks. Netlify publishes the repository root.

## GitHub

1. Create/open the EQGenix repository.
2. Upload the CONTENTS of this folder to the root of the repository.
3. Confirm index.html is in the repository root.
4. Commit changes.

## Netlify

1. Sign in to Netlify.
2. Add new site.
3. Import an existing project.
4. Select GitHub.
5. Select the EQGenix repository.
6. Build command: leave blank.
7. Publish directory: .
8. Deploy.

Future updates: replace or edit repository files and commit the changes. Netlify redeploys automatically.

## Forms (Netlify native)

Four static forms are declared and detected automatically on deploy:

| Form name | Page | Success page |
|---|---|---|
| eqgenix-inquiry | contact.html | /eq-success.html |
| program-inquiry | inquiry.html | /eq-success.html |
| mission-ready-civilian-intake | inquiry.html?program=mrc | /mrc-success.html |
| job-application | careers.html | /eq-success.html |
| ewd-lead | assessment.html (optional results gate) | shows results in place |

Submissions appear under Forms in the Netlify dashboard. No configuration required.

## Supplying the PDFs

The Provider Packet and Veteran Request Guide PDFs are included at assets/docs/ and
linked from mission-ready-civilian.html. To replace them later:

1. Add them under assets/docs/ (e.g. assets/docs/mrc-provider-packet.pdf).
2. Change the corresponding link href on mission-ready-civilian.html,
   sovereign-shield.html, or sovereign-station.html to the file path.

## Structure

- Root: one HTML file per page (index.html, mission-ready-civilian.html, ...)
- assets/css/global.css — design tokens, nav/footer, responsive overrides
- assets/js/global.js — navigation (vanilla, progressive enhancement)
- assets/js/fx.js — scroll reveal engine (respects prefers-reduced-motion)
- assets/js/[page].js — page-specific enhancement (assessment, inquiry, contact, ...)
- assets/images/, assets/icons/ — all image assets, locally hosted
- netlify.toml, _redirects, robots.txt, sitemap.xml, 404.html

## Still needed from EQGenix (not invented, per instructions)

- Chief's One-Pager PDF (section removed from Shield/Station pages for now; re-add when ready)
- Careers compensation ranges (postings currently omit them)
