import { sec } from "../../theme";

// Provisional scene lengths. Target: 2:00 total (the full script is ~7:00,
// so the voiceover must be trimmed to match). Same order as the script.
// TODO: replace with real frames once the voiceover is recorded and timed.
export const SCENE_FRAMES = {
  hook: sec(10), // Scene 1
  intro: sec(8), // Scene 2
  definitions: sec(21), // Scene 3
  overlap: sec(35), // Scene 4
  proof: sec(18), // Scene 5
  why: sec(18), // Scene 6
  outro: sec(10), // Scene 7
} as const;

// Total length of Video 1: the sum of every scene above.
export const VIDEO1_FRAMES =
  SCENE_FRAMES.hook +
  SCENE_FRAMES.intro +
  SCENE_FRAMES.definitions +
  SCENE_FRAMES.overlap +
  SCENE_FRAMES.proof +
  SCENE_FRAMES.why +
  SCENE_FRAMES.outro;
