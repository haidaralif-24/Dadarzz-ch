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
