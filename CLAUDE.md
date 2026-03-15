# CLAUDE.md — Hardcore AI Landing Page

This file documents the codebase structure, conventions, and workflows for AI assistants working on this repository.

## Project Overview

**hardcore-ai-landing** is a marketing/lead-capture landing page for **Hardcore AI by 30X**, a 4-week intensive cohort program teaching Spanish-speaking developers to build AI-powered products. The page handles conversion via an embedded Typeform link and a WhatsApp community link.

- All content is in **Spanish**
- Target audience: developers in Colombia and Latin America
- The page is updated per cohort (currently Cohorte 2)

## Directory Structure

```
hcai/
├── server.js           # Express server — entry point, middleware, routing
├── package.json        # Project metadata, dependencies, npm scripts
├── package-lock.json   # Locked dependency versions (commit this)
├── Procfile            # Deployment config for Railway/Heroku
├── .gitignore          # Ignores node_modules, .env, logs, dist, OS files
└── public/             # All static assets served directly
    ├── index.html      # Entire frontend — 3,000+ line single-page HTML
    ├── logo.png
    ├── hero-bg.png
    ├── week1-bg.png    # Section backgrounds (week1–week4)
    ├── week2-bg.png
    ├── week3-bg.png
    ├── week4-bg.png
    ├── pain-bg.png
    ├── build-bg.png
    ├── transform-bg.png
    ├── instructors-bg.png
    ├── network-bg.png
    ├── journey-map.png
    ├── *-circular.png  # Instructor profile photos
    └── speaker-*.png   # Guest speaker photos
```

## Development Commands

```bash
npm run dev   # Development: starts server with nodemon (auto-restarts on changes)
npm start     # Production: starts server with node
```

**Requirements:** Node.js >= 18.0.0

**Environment variables:**
- `PORT` — listening port (default: `3000`)
- `NODE_ENV` — logged at startup (default: `development`)

No build step is required. There is no bundler, transpiler, or asset pipeline.

## Architecture

### Backend (`server.js`)
Minimal Express server with this middleware stack (order matters):

1. **helmet** — sets security headers including a strict Content Security Policy (CSP)
2. **cors** — allows all origins (open CORS)
3. **compression** — gzip/brotli response compression
4. **express.static** — serves `/public` with 1-day cache and ETag support

**Routing:**
- `GET /` — serves `public/index.html`
- `GET /*` — catch-all: if the path has a file extension, passes through to static middleware (handles PDFs, images, etc.); otherwise serves `index.html` (SPA fallback)

### Frontend (`public/index.html`)
A single self-contained HTML file. No frontend framework or bundler.

**Technology:**
- **Tailwind CSS** loaded from CDN (`https://cdn.tailwindcss.com`) with inline custom config in a `<script>` tag
- **Google Fonts** — Inter (body) and JetBrains Mono (code/accent)
- **Vanilla JavaScript** — no jQuery or frameworks

**Page sections (by anchor ID):**
- `#hero` — full-screen hero with animated gradient text and CTA buttons
- `#programa` — 4-week curriculum breakdown
- `#transformacion` — problem/solution narrative
- `#metodologia` — class schedule and format
- `#instructores` — instructor profiles
- `#red` — community and network value proposition
- `#inversion` — pricing and application CTA (Typeform)
- FAQ accordion (no ID)
- Footer

**JavaScript features (inline, at bottom of `<body>`):**
- Navbar scroll effect (adds `.scrolled` class after 60px)
- Intersection Observer for `.reveal` / `.visible` scroll animations
- FAQ accordion (exclusive open/close)
- UTM parameter passthrough for Typeform CTA links (`.typeform-cta`)
- Mobile menu toggle (`#mobileMenuBtn`)

**CSS conventions:**
- Tailwind utility classes for all layout and styling
- Custom CSS for animations: `shimmer` (gradient text), `pulse-dot` (badge pulse)
- BEM-inspired class names in custom CSS sections (`.faq-item`, `.faq-question`, `.nav-links`)
- Responsive media queries for mobile (`max-width: 768px`)

## Security (CSP)

The Content Security Policy in `server.js` is intentionally strict. **Do not weaken it** without a clear reason.

Current directives:
- `defaultSrc: ['self']`
- `styleSrc`: self + Google Fonts + unsafe-inline (required for Tailwind CDN)
- `fontSrc`: self + Google Fonts (gstatic.com)
- `imgSrc`: self + data URIs
- `scriptSrc`: self + unsafe-inline + Tailwind CDN
- `connectSrc`: self only
- `frameSrc`: self only

If a new third-party service is added (analytics, embeds, etc.), add its domain to the appropriate CSP directive in `server.js`.

## Deployment

The app is deployed on **Railway** (or compatible PaaS like Heroku) via the `Procfile`:

```
web: node server.js
```

No CI/CD pipeline exists. Deployments are triggered by pushes to the main branch via Railway's GitHub integration or similar.

## Asset Conventions

- All static assets live in `/public/`
- **Naming:** kebab-case, descriptive of content (e.g., `speaker-jefferson-arcos.png`, `week3-bg.png`)
- **Format:** PNG for all images
- New images must be added to `/public/` and referenced in `index.html` using relative paths (`/filename.png`)

## Git Conventions

Commits follow conventional commit format:
- `feat:` — new feature or content addition
- `fix:` — bug fix or layout correction
- `docs:` — documentation only
- `chore:` — dependency updates, config changes

Examples from history:
```
fix: mobile layout - hero overlap and transform section pairing
feat: replace landing with new Cohorte 2 version
feat: add PDF assets and fix catch-all route to serve static files
```

## What NOT to Do

- **Do not add a frontend framework** (React, Vue, etc.) — the intentional choice is a single HTML file
- **Do not add a bundler** (Vite, Webpack, etc.) — there is no build step by design
- **Do not add a test framework** — there are no tests; do not add Jest/Mocha unless explicitly requested
- **Do not add a linter/formatter** — no ESLint or Prettier config exists; do not introduce them unless asked
- **Do not weaken the CSP** — only add new sources when strictly necessary
- **Do not split `index.html`** into components — keep the frontend as a single file
- **Do not commit `.env` files** — they are gitignored; use environment variables directly

## No Tests / No Linting

There is currently no test suite and no linting configuration. `npm test` exits with an error. Do not add testing or linting infrastructure unless explicitly requested by the user.
