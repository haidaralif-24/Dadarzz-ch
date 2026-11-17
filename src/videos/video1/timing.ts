import { sec } from "../../theme";

// Scene lengths for the 60-second explainer (see docs/video1-script.md).
// TODO: replace with real frames once the voiceover is recorded and timed.
export const SCENE_FRAMES = {
  hook: sec(5), // Scene 1
  three: sec(12), // Scene 2
  overlap: sec(20), // Scene 3
  proof: sec(13), // Scene 4
  outro: sec(10), // Scene 5
} as const;

// Total length of Video 1: the sum of every scene above.
export const VIDEO1_FRAMES =
  SCENE_FRAMES.hook +
  SCENE_FRAMES.three +
  SCENE_FRAMES.overlap +
  SCENE_FRAMES.proof +
  SCENE_FRAMES.outro;
