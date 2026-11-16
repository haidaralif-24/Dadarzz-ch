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
