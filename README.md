# ourobotos

Personal blog by Eyal — writing at the intersection of technology and thought. Essays on software, systems, and the ideas behind them.

**Live site:** [ourobotos.net](https://ourobotos.net)

---

## Tech Stack

| Layer | Technology |
| :---- | :--------- |
| Framework | [Astro 6](https://astro.build) — static output, no adapter |
| Content | Markdown + MDX via `@astrojs/mdx` |
| OG Images | Dynamic generation with [Satori](https://github.com/vercel/satori) + [Sharp](https://sharp.pixelplumbing.com) |
| Feeds | RSS via `@astrojs/rss`, Sitemap via `@astrojs/sitemap` |
| Fonts | DM Sans (UI), Lora (body), JetBrains Mono (code) — all variable/subsettable via `@fontsource-variable` |
| Analytics | [Umami](https://umami.is) — privacy-first, no cookies |
| Theme | Dark/light toggle with no flash on load |

---

## Project Structure

```text
src/
├── components/
│   ├── BaseHead.astro        # <head>: meta, OG, fonts, analytics, theme script
│   ├── Header.astro          # Site header with nav and theme toggle
│   ├── HeaderLink.astro      # Active-state nav links
│   ├── Footer.astro          # Site footer
│   ├── PostCard.astro        # Blog listing card
│   ├── AISummary.astro       # AI-generated post summary block
│   ├── ReadingProgress.astro # Reading progress indicator
│   ├── NewsletterSignup.astro
│   └── CodeBlock.astro
├── content/
│   └── blog/                 # .md / .mdx posts
├── layouts/
│   ├── BaseLayout.astro      # Wraps all pages
│   └── PostLayout.astro      # Wraps individual blog posts
├── pages/
│   ├── index.astro           # /
│   ├── about.astro           # /about
│   ├── writing.astro         # /writing
│   ├── tools.astro           # /tools
│   ├── newsletter.astro      # /newsletter
│   ├── blog/
│   │   ├── index.astro       # /blog
│   │   └── [...slug].astro   # /blog/[slug]
│   ├── og/
│   │   └── [slug].png.ts     # /og/[slug].png  (dynamic OG images)
│   └── rss.xml.js            # /rss.xml
├── consts.ts                 # SITE_TITLE, SITE_DESCRIPTION
└── styles/
    └── global.css
astro.config.mjs
```

---

## Routes

| Route | Description |
| :---- | :---------- |
| `/` | Home |
| `/writing` | Post listing |
| `/blog/[slug]` | Individual post |
| `/tools` | Tools page |
| `/about` | About page |
| `/newsletter` | Newsletter signup |
| `/rss.xml` | RSS feed |
| `/og/[slug].png` | Auto-generated OG image per post |

---

## Commands

All commands run from the project root:

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the production build locally |

---

## Writing a New Post

Create a new file in `src/content/blog/` with the following frontmatter:

```md
---
title: "Your Post Title"
description: "A short description for SEO and post cards."
pubDate: 2026-03-25
category: opinion  # tutorial | opinion | news | analysis
tags: ["tag1", "tag2"]
featured: false
---

Post body here.
```

The post will automatically appear in `/writing`, get an OG image at `/og/[slug].png`, and be included in the RSS feed.
