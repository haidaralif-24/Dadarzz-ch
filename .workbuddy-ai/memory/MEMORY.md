# Dadarzz Engineering — project notes

Remotion 4.0.543 / React 19 / pnpm. One project, one `<Composition>` per video.
Brand + rules live in `CLAUDE.md`; colors in `src/theme.ts`, fonts in `src/fonts.ts`.
Never hardcode hex values or font names.

## Fixed meanings (never re-map)
Hardware = teal `#2DD4A7`, Software = blue `#3DA5F4`, AI = violet `#A78BFA`,
Engineering / the three combined = brand orange `#E66F09`. Navy bg `#0A1A2A`.

## Layout
- `src/components/` — Backdrop, TitleCard, LayerIcon, VennDiagram, LayerStack,
  PhoneMock, ReasonCard, Captions, plus `animate.ts` helpers.
- `src/videos/video1/Video1.tsx` — the 7-scene timeline (12,600 frames).
- `src/videos/dev/ComponentReel.tsx` — dev-only component gallery.
- `public/brand/logo-mark.png`, `logo-banner.png`.

## Gotchas
- Rendering needs `--chrome-mode=chrome-for-testing`. The bundled
  chrome-headless-shell crashes with `Target closed` on this machine.
- Render stills one per command. A loop of renders gets killed by Security
  Center rules on the puppeteer temp profile.
- `tsconfig` has `lib: es2015` and `noUnusedLocals` — no `padStart`, no
  `Array.includes`, no `Object.fromEntries`.
