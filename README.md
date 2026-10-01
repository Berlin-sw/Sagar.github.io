# Sagar Wagh — Portfolio

Personal portfolio for a Computer Science Engineering student and Software/AI developer.
Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion** and **Lucide** icons.

- Dark-first design with a light theme toggle (no flash on load, preference remembered)
- Fully responsive, keyboard accessible, reduced-motion aware
- Content lives in `src/data/` — update projects, skills, experience and achievements without touching UI code
- Live GitHub activity (profile, repositories, languages, recent activity, contribution graph)
- Contact form with client + server validation, honeypot spam protection and rate limiting
- SEO: metadata, Open Graph images (site + per project), JSON-LD, sitemap, robots, web manifest, favicons

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, see "Environment variables"
npm run dev                  # http://localhost:3000
```

| Script          | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server             |
| `npm run build` | Production build                 |
| `npm run start` | Serve the production build       |
| `npm run lint`  | ESLint                           |

## Before you deploy — replace the placeholders

Nothing on the site is invented. Where information wasn't available, the site shows clearly marked
placeholders. Work through this list:

| What                         | Where                                                         |
| ---------------------------- | ------------------------------------------------------------- |
| GitHub username              | `GITHUB_USERNAME` in `src/data/site.ts`                       |
| LinkedIn username            | `LINKEDIN_USERNAME` in `src/data/site.ts`                     |
| Email address                | `EMAIL` in `src/data/site.ts`                                 |
| Resume                       | Replace `public/resume.pdf` (keep the file name)              |
| DevLens AI repo / demo links | `links` on the DevLens entry in `src/data/projects.ts`         |
| Sample projects              | Entries with `placeholder: true` in `src/data/projects.ts`    |
| Achievements                 | Entries with `placeholder: true` in `src/data/achievements.ts`|
| Academic details             | `period`, `coursework`, `achievements` in `src/data/education.ts` |
| Experience                   | Add roles to `src/data/experience.ts` (example in the file)   |

While `experience` is empty, the Experience section shows
"Building Experience Through Projects & Open Source". Placeholder projects are excluded from the
sitemap and marked `noindex`.

## Project structure

```
src/
├── app/                  Routes, layout, metadata files (OG images, sitemap, robots, manifest, icons)
│   ├── api/contact/      Contact form endpoint (server-only secrets)
│   └── projects/[slug]/  Case study pages + per-project OG images
├── components/
│   ├── sections/         Hero, About, Skills, Projects, Experience, Education, Achievements,
│   │                     GitHubActivity, Resume, Contact
│   ├── projects/         ProjectCard, ProjectPreview
│   ├── github/           Contribution graph, language bar, loading skeleton
│   ├── contact/          ContactForm, CopyButton
│   ├── layout/           Navbar, Footer, ThemeToggle
│   ├── ui/               Section, Button, Tag/Badge, Reveal, SpotlightCard, Logo
│   └── icons/            GitHub / LinkedIn brand icons
├── data/                 ✏️ All portfolio content (edit these)
├── hooks/                useActiveSection, useScrolled
├── lib/                  GitHub API client, validation, icons registry, formatting, OG layout
└── styles/globals.css    Design tokens (colours for both themes), Tailwind theme, utilities
public/                   resume.pdf, manifest icons (Next.js requires public/ at the project root)
scripts/                  generate-icons.mjs — rebuilds favicon/app icons from the logo
```

### Editing content

- **Projects** — `src/data/projects.ts`. Set `featured: true` for the large card. For previews use
  `{ type: "image", src: "/projects/my-app.png", alt: "…" }` with a screenshot in `public/projects/`
  (1600×1000 recommended; served through `next/image`), or keep the built-in illustration.
  Add a `caseStudy` object to get a full write-up on `/projects/<slug>`.
- **Icons** in data files are referenced by name (e.g. `"brain"`). Available names are in
  `src/lib/icons.ts`; add any Lucide icon there to use it.
- **Theme colours** — tokens at the top of `src/styles/globals.css`.

## Environment variables

Copy `.env.example` to `.env.local`. Only `NEXT_PUBLIC_*` values reach the browser; everything else
is read on the server only.

| Variable               | Required | Purpose                                                                 |
| ---------------------- | -------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for metadata/sitemap. Falls back to the Vercel production domain. |
| `GITHUB_TOKEN`         | Optional | Enables the contribution graph and raises GitHub API limits. A fine-grained token with no extra permissions is enough. |
| `RESEND_API_KEY`       | For the contact form | [Resend](https://resend.com) API key used to email form submissions. |
| `CONTACT_TO_EMAIL`     | For the contact form | Inbox that receives messages.                                   |
| `CONTACT_FROM_EMAIL`   | Optional | Verified sender, e.g. `Portfolio <hello@yourdomain.com>`. Defaults to Resend's test sender. |

Without the Resend variables the form still validates and shows visitors a friendly
"email me directly" fallback. GitHub data is cached and refreshed hourly.

## Deploying to Vercel

1. Push the project to a GitHub repository.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework is detected automatically.
3. Add the environment variables above under **Project → Settings → Environment Variables**.
4. Deploy. Set `NEXT_PUBLIC_SITE_URL` to your custom domain if you add one.

## Regenerating icons

The favicon and app icons are generated from the logo mark:

```bash
node scripts/generate-icons.mjs
```
