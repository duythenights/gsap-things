# GSAP Things

A personal collection of [GSAP](https://gsap.com/) (GreenSock Animation Platform) techniques, patterns, and experiments. This repository documents what I learn as I build small demos and notes—useful as a reference and as a portfolio of motion work.

## Table of contents

- [About](#about)
- [Features](#features)
  - [Smooth scroll](#smooth-scroll)
  - [Smart header](#smart-header)
- [Stack](#stack)
- [Techniques checklist](#techniques-checklist)
- [Project layout (GSAP-related)](#project-layout-gsap-related)
- [Local development](#local-development)
- [Resources](#resources)
- [License](#license)

## About

Each addition here is meant to be **focused and reproducible**: one idea, one demo, or one pattern at a time. The goal is clarity over scope—something I can revisit months later and still understand quickly.

## Features

### Smooth scroll

Main page content is wrapped in [ScrollSmoother](https://gsap.com/docs/v3/Plugins/ScrollSmoother/) (Club GSAP plugin) via `gsap/GSAPWrapper.tsx`. The wrapper renders the required structure:

- `#smooth-wrapper` — outer container
- `#smooth-content` — scrollable inner layer where `children` (App Router pages) render

`ScrollSmoother.create` runs inside [`useGSAP`](https://gsap.com/resources/React/) with `smooth: 1.5` and `effects: true` so parallax-style `data-speed` attributes can be used on descendants when needed. On route changes, `dependencies: [pathname]` with `revertOnUpdate: true` tears down and recreates the smoother so navigation stays consistent.

### Smart header

The site header (`components/Header.tsx`) uses [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) to react to **scroll direction**: scrolling up reveals the bar (`yPercent` animation plays forward); scrolling down hides it (animation reverses). The logic lives in `useGSAP` with a `ref` on the `<header>` for scoped cleanup. The header is mounted **outside** `GSAPWrapper` in `app/layout.tsx`, so it stays a fixed chrome layer above the smoothed page content.

## Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI:** React, TypeScript, [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** GSAP, [@gsap/react](https://www.npmjs.com/package/@gsap/react), ScrollTrigger, ScrollSmoother

## Techniques checklist

Planned topics and demos. Extend this list as you add examples; check items when they are implemented and documented here.

- [x] Smooth scroll — ScrollSmoother + `useGSAP` (`gsap/GSAPWrapper.tsx`)
- [x] Smart header — scroll-direction show/hide (`components/Header.tsx`)
- [ ] *Add more as you go (e.g. timelines, Flip, ScrollTrigger pinning demos).*

## Project layout (GSAP-related)

| Path | Role |
| :--- | :--- |
| `gsap/GSAPWrapper.tsx` | ScrollSmoother + wrapper markup for app pages |
| `components/Header.tsx` | Fixed header with direction-based animation |
| `app/layout.tsx` | Composes `Header` and `GSAPWrapper` around `{children}` |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

```bash
npm run build
npm run lint
```

## Resources

- [GSAP documentation](https://gsap.com/docs/v3/)
- [ScrollSmoother](https://gsap.com/docs/v3/Plugins/ScrollSmoother/)
- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP + React](https://gsap.com/resources/React/)
- [Next.js documentation](https://nextjs.org/docs)

## License

Private learning repository unless otherwise stated.
