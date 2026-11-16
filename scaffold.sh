#!/usr/bin/env bash
# Dadarzz Engineering: brand + project setup for the Remotion channel project.
# Run from the project root (the folder with package.json):
#   bash setup-brand.sh
#
# Options (environment variables):
#   FORCE=1          overwrite files that already exist (default: skip them)
#   SKIP_INSTALL=1   don't run `pnpm add @remotion/google-fonts`
set -euo pipefail

if [[ ! -f package.json ]] || ! grep -q '"remotion"' package.json; then
  echo "Error: run this from your Remotion project root (package.json with remotion not found)." >&2
  exit 1
fi

# write <path>: writes stdin to <path>, skipping files that already exist unless FORCE=1
write() {
  local path="$1"
  if [[ -e "$path" && "${FORCE:-0}" != "1" ]]; then
    echo "  skip   $path (already exists, use FORCE=1 to overwrite)"
    cat >/dev/null
  else
    mkdir -p "$(dirname "$path")"
    cat >"$path"
    echo "  write  $path"
  fi
}

echo "Creating folders..."
mkdir -p src/components src/videos public/brand docs
touch src/components/.gitkeep src/videos/.gitkeep

# ---------------------------------------------------------------------------
echo "Writing files..."

write src/theme.ts <<'EOF'
// Dadarzz Engineering brand theme.
// Colors were sampled from the official logo and banner.
// Import from here. Never hardcode hex values in components.

export const colors = {
  // Brand (from logo + banner)
  bg: "#0A1A2A", // deep navy background
  bgRaised: "#142434", // cards, panels, code windows
  brand: "#E66F09", // brand orange: the "D", the word "Engineering"
  white: "#FFFFFF", // main text
  muted: "#9FB4C9", // tagline / secondary text

  // The three layers (used consistently in every video)
  hardware: "#2DD4A7", // teal
  software: "#3DA5F4", // blue
  ai: "#A78BFA", // violet
  // Where all three meet, use the brand orange: that's "Engineering".
  engineering: "#E66F09",
} as const;

export const layerColors = {
  hardware: colors.hardware,
  software: colors.software,
  ai: colors.ai,
  engineering: colors.engineering,
} as const;

export type Layer = keyof typeof layerColors;

export const video = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

// seconds -> frames
export const sec = (seconds: number) => Math.round(seconds * video.fps);

export const spacing = {
  safe: 96, // outer margin at 1080p
  gap: 32,
  radius: 24,
} as const;

// Reusable spring settings for remotion's spring({ config })
export const springs = {
  pop: { damping: 12, stiffness: 120 }, // small bounce, for icons and cards
  smooth: { damping: 200 }, // no bounce, for fades and slides
  snappy: { damping: 20, stiffness: 200 },
} as const;

// "#E66F09" + 0.2 -> "rgba(230, 111, 9, 0.2)"
export const withAlpha = (hex: string, alpha: number) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
EOF

write src/fonts.ts <<'EOF'
// Brand fonts, loaded through Remotion's Google Fonts package.
// Wordmark / headings: Space Grotesk. Tagline, labels, code: JetBrains Mono.
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

const heading = loadSpaceGrotesk("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});

const mono = loadJetBrainsMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const fonts = {
  heading: heading.fontFamily,
  mono: mono.fontFamily,
} as const;
EOF

write docs/video1-script.md <<'EOF'
# Video 1: Hardware, Software & AI

Paste the final script and animation flow here (export it from the script doc).
Claude Code reads this file when building the scenes.
EOF

write public/brand/README.md <<'EOF'
Put the brand assets here and reference them with staticFile("brand/<file>"):

- logo-mark.png    (the orange "D" on navy)
- logo-banner.png  (wordmark + tagline banner)
EOF

write CLAUDE.md <<'EOF'
# Dadarzz Engineering: Remotion project

Animations for the YouTube channel **Dadarzz Engineering**.
Tagline: "Learning Software, Computer, & AI Engineering".
One Remotion project for ALL videos. Each video is one `<Composition>` in `src/Root.tsx`.

## Channel voice (applies to all on-screen text and narration notes)
- "Learning together", not teaching from above. Use "we" and "let's".
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
  components/         shared components (TitleCard, LayerIcon, VennDiagram, LayerStack, PhoneMock, ReasonCard, Captions)
  videos/<videoN>/    SceneN.tsx files + the main <VideoN /> composition
public/<videoN>/      per-video assets (voiceover, footage, images)
public/brand/         logo and banner
docs/<videoN>-script.md   script and animation flow (read before building a scene)
```
- Never copy a shared component into a video folder. Import it from `src/components`.
- Put new videos in `src/videos/videoN/` and register them in `src/Root.tsx`.

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
- Commit after each finished scene with a clear message.
- Ask before adding a new dependency. This project uses pnpm.
- Be honest in explanations: this channel says openly when AI helped make a video.
EOF

# ---------------------------------------------------------------------------
if ! grep -qE '^/?out/?$' .gitignore 2>/dev/null; then
  echo "out/" >>.gitignore
  echo "  update .gitignore (added out/)"
fi

# ---------------------------------------------------------------------------
if [[ "${SKIP_INSTALL:-0}" != "1" ]]; then
  echo "Installing @remotion/google-fonts (matching your remotion version)..."
  REMOTION_VERSION="$(node -p "require('./package.json').dependencies.remotion.replace(/^[^0-9]*/, '')")"
  pnpm add "@remotion/google-fonts@${REMOTION_VERSION}"
fi

cat <<'EOF'

Done. Next steps:
  1. Put your logo files in public/brand/ (logo-mark.png, logo-banner.png).
  2. Paste your script into docs/video1-script.md.
  3. Start Studio (pnpm dev) and, in a second terminal, run: claude
  4. First prompt idea:
     "Read CLAUDE.md and docs/video1-script.md. Build the shared components first
      (LayerIcon, TitleCard), using src/theme.ts and src/fonts.ts. Register Video1
      in src/Root.tsx with a placeholder, then show me the components in Studio."
EOF
