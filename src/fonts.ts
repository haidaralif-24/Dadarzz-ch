// Brand font, loaded through Remotion's Google Fonts package.
// Everything is JetBrains Mono: wordmark, headings, tagline, labels and code.
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

const mono = loadJetBrainsMono("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

// `heading` is kept as a separate key so a heading font can change later
// without touching every component.
export const fonts = {
  heading: mono.fontFamily,
  mono: mono.fontFamily,
} as const;
