// Darz Bits brand theme.
// Colors were sampled from the official logo and banner.
// Import from here. Never hardcode hex values in components.

export const colors = {
  // Brand (from logo + banner)
  bg: "#18181C", // charcoal background (banner centre)
  bgDeep: "#0C0C0E", // vignette at the screen edges
  bgRaised: "#232328", // cards, panels, code windows
  brand: "#FFC93C", // brand gold: "BITS", the cursor, the pixel "D" highlight
  accent: "#F28C28", // orange from the pixel "D" frame
  white: "#F5F5F7", // main text (banner text is off-white, not pure white)
  muted: "#B4B4BB", // tagline / secondary text

  // The three layers (used consistently in every video)
  hardware: "#4DB89A", // aged teal
  software: "#5E94D4", // dusty blue
  ai: "#9C86D0", // dusty violet
  // Where all three meet, use the brand gold: that's "Engineering".
  engineering: "#FFC93C",
} as const;

// Old-PC (CRT) screen look, applied over the whole video by <CrtScreen />.
// Tune these three numbers to make the picture dimmer or brighter.
export const crt = {
  saturate: 0.82, // 1 = unchanged, lower = more washed out
  sepia: 0.22, // warm phosphor tint: 0 = none, higher = more amber/brown
  brightness: 0.88, // 1 = unchanged, lower = dimmer
  scanlineAlpha: 0.24, // darkness of the horizontal scanlines (banner is about 0.22)
} as const;

export const layerColors = {
  hardware: colors.hardware,
  software: colors.software,
  ai: colors.ai,
  engineering: colors.engineering,
} as const;

export type Layer = keyof typeof layerColors;

// The three layers that carry their own colour and icon. "Engineering" is what
// you get when all three combine, so it is not one of them.
export type TriLayer = Exclude<Layer, "engineering">;

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
