import { sec } from "../../theme";

// Provisional scene lengths from docs/video1-script.md (7:00 total).
// TODO: replace with real frames once the voiceover is recorded and timed.
export const SCENE_FRAMES = {
  hook: sec(20), // Scene 1, 0:00 to 0:20
  intro: sec(30), // Scene 2, 0:20 to 0:50
  definitions: sec(50), // Scene 3, 0:50 to 1:40
  overlap: sec(120), // Scene 4, 1:40 to 3:40
  proof: sec(110), // Scene 5, 3:40 to 5:30
  why: sec(60), // Scene 6, 5:30 to 6:30
  outro: sec(30), // Scene 7, 6:30 to 7:00
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
