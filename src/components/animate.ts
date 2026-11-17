// Small pure helpers shared by every component.
// They take `frame` and `fps` instead of calling hooks, so they can be used
// inside loops and `.map()` callbacks (one stagger delay per item).
import { interpolate, spring } from "remotion";
import { springs } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Spring pop-in: scale up from `from` and fade in over the first few frames.
export const popIn = (frame: number, fps: number, delay = 0, from = 0.84) => {
  const local = Math.max(0, frame - delay);
  const scale = spring({ frame: local, fps, config: springs.pop, from, to: 1 });
  const opacity = interpolate(local, [0, 7], [0, 1], clamp);
  return { scale, opacity };
};

// Rise into place: no bounce, settles fast. Returns the offset in px.
export const fadeUp = (
  frame: number,
  fps: number,
  delay = 0,
  distance = 28,
) => {
  const local = Math.max(0, frame - delay);
  const p = spring({
    frame: local,
    fps,
    config: springs.smooth,
    from: 0,
    to: 1,
  });
  return { opacity: p, translateY: (1 - p) * distance };
};

// Slide in horizontally. Positive distance comes from the right.
export const slideIn = (
  frame: number,
  fps: number,
  delay = 0,
  distance = 56,
) => {
  const local = Math.max(0, frame - delay);
  const p = spring({
    frame: local,
    fps,
    config: springs.smooth,
    from: 0,
    to: 1,
  });
  return { opacity: p, translateX: (1 - p) * distance };
};

// How many characters of `text` should be visible for a typewriter effect.
export const typedLength = (
  text: string,
  frame: number,
  fps: number,
  delay = 0,
  charsPerSecond = 30,
) => {
  const local = Math.max(0, frame - delay);
  const n = Math.floor((local / fps) * charsPerSecond);
  return Math.max(0, Math.min(text.length, n));
};
