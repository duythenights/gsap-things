# GSAP Things

A personal collection of [GSAP](https://gsap.com/) (GreenSock Animation Platform) techniques, patterns, and experiments. This repository documents what I learn as I build small demos and notes—useful as a reference and as a portfolio of motion work.

## Table of contents

- [About](#about)
- [Features](#features)
  - [Smooth scroll](#smooth-scroll)
  - [Pinned section transitions](#pinned-section-transitions)
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
- `#smooth-content` — scrollable inner layer where App Router `{children}` render

`ScrollSmoother.create` runs inside [`useGSAP`](https://gsap.com/resources/React/) with `smooth: 1.5` and `effects: true` so parallax-style `data-speed` attributes can be used on descendants when needed. On route changes, `dependencies: [pathname]` with `revertOnUpdate: true` tears down and recreates the smoother so navigation stays consistent.

The shared [`Footer`](#footer-wave) is rendered in `app/layout.tsx` **after** `GSAPWrapper`, as a sibling of the smooth-scroll layer, so it is not inside `#smooth-content`.

### Pinned section transitions

The home route (`app/page.tsx`) uses [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) with **pinning**, **scrub**, and optional **inner “fake scroll”** when a panel’s `.section-inner` is taller than the viewport. Timelines are created in `useGSAP` with `scope` set to a `ref` on `<main>` and `revertOnUpdate: true` for cleanup. All sections except the last are animated; markup uses `.section` and `.section-inner` so heights and queries stay consistent.

### Smart header

The site header (`components/Header.tsx`) uses ScrollTrigger to react to **scroll direction**: scrolling up reveals the bar (`yPercent` animation plays forward); scrolling down hides it (animation reverses). The logic lives in `useGSAP` with a `ref` on the `<header>` for scoped cleanup. The header is mounted **outside** `GSAPWrapper` in `app/layout.tsx`, so it stays a fixed chrome layer above the smoothed page content.

### Footer wave

`components/Footer.tsx` uses ScrollTrigger so that when the footer enters the viewport (`start: 'top bottom'`), the SVG path morphs between two shapes using [MorphSVGPlugin](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/) (Club GSAP). The tween uses an **elastic ease** whose parameters are influenced by scroll velocity at the moment of entry. Layout and texture (noise overlay) live in `components/footer.css`. The wave fill uses a **vertical linear gradient** defined in the SVG; adjust stops in `Footer.tsx` to tune the look.

### Scrollbar styling

`app/globals.css` customizes the document scrollbar for Chromium/WebKit (`::-webkit-scrollbar*`) and Firefox (`scrollbar-width` / `scrollbar-color`), using the same dark palette and green accent as the rest of the site.

## Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **UI:** React 19, TypeScript, [Tailwind CSS](https://tailwindcss.com/) 4
- **Animation:** GSAP 3, [@gsap/react](https://www.npmjs.com/package/@gsap/react), ScrollTrigger, ScrollSmoother, MorphSVGPlugin

## Techniques checklist

Planned topics and demos. Extend this list as you add examples; check items when they are implemented and documented here.

- [x] Smooth scroll — ScrollSmoother + `useGSAP` (`gsap/GSAPWrapper.tsx`)
- [x] Pinned sections — ScrollTrigger pin + scrub + tall inner panels (`app/page.tsx`)
- [x] Smart header — scroll-direction show/hide (`components/Header.tsx`)
- [x] Footer wave — MorphSVG + ScrollTrigger + elastic ease from velocity (`components/Footer.tsx`)
- [ ] *Add more as you go (e.g. Flip, draggable, more ScrollTrigger recipes).*

## Project layout (GSAP-related)

| Path | Role |
| :--- | :--- |
| `gsap/GSAPWrapper.tsx` | ScrollSmoother, `#smooth-wrapper` / `#smooth-content` around `{children}` |
| `app/page.tsx` | Home: pinned `.section` transitions, `useGSAP` + scoped selectors |
| `components/Header.tsx` | Fixed header with direction-based animation |
| `components/Footer.tsx` | SVG footer wave, gradient, MorphSVG + ScrollTrigger |
| `components/footer.css` | Footer layout and noise overlay |
| `app/layout.tsx` | Composes `Header`, `GSAPWrapper` (`{children}`), and `Footer` |
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
