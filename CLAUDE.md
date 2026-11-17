# Dadarzz Engineering: Remotion project

Animations for the YouTube channel **Dadarzz Engineering**.
Tagline: "Learning Software, Computer, & AI Engineering".
One Remotion project for ALL videos. Each video is one `<Composition>` in `src/Root.tsx`.

## Channel voice (applies to all on-screen text and narration notes)
- "Learning together", not teaching from above. The narrator speaks as "I" (Dadarzz, a personal
  learning journey) and uses "we" or "let's" only when inviting the viewer to learn alongside.
- Practical and engineering-focused. Explain through real projects, not pure theory.
- Plain words, no hype. Be accurate; if unsure, leave a `TODO` instead of inventing a fact.
- Audience: general viewers and people learning SWE, Computer Engineering and AI Engineering.

## Brand (source of truth: `src/theme.ts` and `src/fonts.ts`)
- ALWAYS import colors, spacing and springs from `src/theme.ts` and fonts from `src/fonts.ts`.
  Never hardcode hex values or font names in components.
- Palette: navy background `#0A1A2A`, brand orange `#E66F09`, white text, muted blue-grey `#9FB4C9`.
- Fonts: Space Grotesk (headings, wordmark), JetBrains Mono (tagline, labels, code).
- Logo: orange "D" mark on navy. Wordmark = "Dadarzz" in white + "Engineering" in orange,
  tagline underneath in muted mono. Keep clear space around it. Do not recolor or distort it.
- Layer colors are fixed meanings, use them the same way in every video:
  - Hardware = teal (`colors.hardware`)
  - Software = blue (`colors.software`)
  - AI = violet (`colors.ai`)
  - Where the three combine, or when saying "Engineering" = brand orange (`colors.engineering`)

## Video specs
- 1920x1080, 30 fps. Use `video` and `sec()` from `src/theme.ts`.
- Dark navy background on every scene. One idea on screen at a time.
- Body text at least 48px at 1080p. Keep a 96px safe margin (`spacing.safe`).
- Entrances should be short (about 20 frames or less). Use `spring()` and `interpolate()`. Do not over-animate.

## Structure
```
src/
  Root.tsx            registers every video as a <Composition>
  theme.ts            colors, spacing, springs, helpers
  fonts.ts            font loading
  components/         shared components (TitleCard, LayerIcon, VennDiagram, LayerStack, PhoneMock, ReasonCard, Captions, Backdrop)
                      animate.ts holds the shared popIn / fadeUp / slideIn / typedLength helpers
  videos/<videoN>/    SceneN.tsx files + the main <VideoN /> composition
  videos/dev/         ComponentReel: every shared component on one timeline. Dev tool, never uploaded.
public/<videoN>/      per-video assets (voiceover, footage, images)
public/brand/         logo and banner (logo-mark.png, logo-banner.png)
docs/<videoN>-script.md   script and animation flow (read before building a scene)
```
- Never copy a shared component into a video folder. Import it from `src/components`.
- Put new videos in `src/videos/videoN/` and register them in `src/Root.tsx`.
- Use `animate.ts` helpers instead of re-writing spring calls. They take `frame`/`fps`
  so they can be called inside `.map()` for staggered items.

## Remotion rules
- Animate ONLY with `useCurrentFrame()`, `interpolate()` and `spring()`. No CSS transitions or CSS animations, no `setTimeout`, no `Math.random()` (use `random("seed")` from remotion).
- Build scenes with `<Sequence>` and express durations in frames (`sec(n)`).
- Load assets with `staticFile()`. Use `<Img>`, `<Audio>`, `<OffthreadVideo>` instead of plain HTML tags.
- Components must be deterministic: the same frame always renders the same image.
- Do not assume Tailwind is set up. Check before using it.

## Workflow
- Read `docs/<videoN>-script.md` before building a scene.
- Build shared components first, then one scene per task. Do not build a whole video in one go.
- After changes, run the type check and lint (see `package.json` scripts).
- Preview with Remotion Studio (`pnpm dev`). Do not render a full video unless asked.
  Draft render: `pnpm exec remotion render <CompositionId> out/draft.mp4 --scale=0.5`
- Check shared components in the `ComponentReel` composition, not in a scene.
- If a render dies with `Protocol error (Target.createTarget): Target closed`, the bundled
  headless shell is crashing. Add `--chrome-mode=chrome-for-testing` to the command.
- Commit after each finished scene with a clear message.
- Ask before adding a new dependency. This project uses pnpm.
- Be honest in explanations: this channel says openly when AI helped make a video.
