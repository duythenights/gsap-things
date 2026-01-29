# GSAP Things

A personal collection of [GSAP](https://gsap.com/) (GreenSock Animation Platform) techniques, patterns, and experiments. This repository documents what I learn as I build small demos and notes—useful as a reference and as a portfolio of motion work.

## Table of contents

- [About](#about)
- [Features](#features)
  - [Smooth scroll](#smooth-scroll)
  - [Smart header](#smart-header)
  - [Footer wave](#footer-wave)
  - [Scrollbar styling](#scrollbar-styling)
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
- `#smooth-content` — scrollable inner layer where `children` (App Router pages) render, followed by the shared [`Footer`](#footer-wave)

`ScrollSmoother.create` runs inside [`useGSAP`](https://gsap.com/resources/React/) with `smooth: 1.5` and `effects: true` so parallax-style `data-speed` attributes can be used on descendants when needed. On route changes, `dependencies: [pathname]` with `revertOnUpdate: true` tears down and recreates the smoother so navigation stays consistent.

### Smart header

The site header (`components/Header.tsx`) uses [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) to react to **scroll direction**: scrolling up reveals the bar (`yPercent` animation plays forward); scrolling down hides it (animation reverses). The logic lives in `useGSAP` with a `ref` on the `<header>` for scoped cleanup. The header is mounted **outside** `GSAPWrapper` in `app/layout.tsx`, so it stays a fixed chrome layer above the smoothed page content.

### Footer wave

`components/Footer.tsx` sits at the bottom of `#smooth-content` (after page `children`). When the footer enters the viewport (`ScrollTrigger` with `start: 'top bottom'`), the SVG path morphs between two shapes using [MorphSVGPlugin](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/) (Club GSAP). The tween uses an **elastic ease** whose parameters are influenced by scroll velocity at the moment of entry. Layout and texture (noise overlay) live in `components/footer.css`. The wave fill uses a **vertical linear gradient** defined in the SVG; adjust stops in `Footer.tsx` to tune the look.

### Scrollbar styling

`app/globals.css` customizes the document scrollbar for Chromium/WebKit (`::-webkit-scrollbar*`) and Firefox (`scrollbar-width` / `scrollbar-color`), using the same dark palette and green accent as the rest of the site.

## Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI:** React, TypeScript, [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** GSAP, [@gsap/react](https://www.npmjs.com/package/@gsap/react), ScrollTrigger, ScrollSmoother, MorphSVGPlugin

## Techniques checklist

Planned topics and demos. Extend this list as you add examples; check items when they are implemented and documented here.

- [x] Smooth scroll — ScrollSmoother + `useGSAP` (`gsap/GSAPWrapper.tsx`)
- [x] Smart header — scroll-direction show/hide (`components/Header.tsx`)
- [x] Footer wave — MorphSVG + ScrollTrigger + elastic ease from velocity (`components/Footer.tsx`)
- [ ] *Add more as you go (e.g. timelines, Flip, ScrollTrigger pinning demos).*

## Project layout (GSAP-related)

| Path | Role |
| :--- | :--- |
| `gsap/GSAPWrapper.tsx` | ScrollSmoother, `#smooth-wrapper` / `#smooth-content`, and `<Footer />` after `{children}` |
| `components/Header.tsx` | Fixed header with direction-based animation |
| `components/Footer.tsx` | SVG footer wave, gradient, MorphSVG + ScrollTrigger |
| `components/footer.css` | Footer layout and noise overlay |
| `app/layout.tsx` | Composes `Header` and `GSAPWrapper` around `{children}` |
| `app/globals.css` | Design tokens, utilities, global scrollbar styling |

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
- [MorphSVGPlugin](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/)
- [GSAP + React](https://gsap.com/resources/React/)
- [Next.js documentation](https://nextjs.org/docs)

## License

Private learning repository unless otherwise stated.
