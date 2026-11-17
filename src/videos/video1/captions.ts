import { CaptionLine } from "../../components/Captions";
import { colors, layerColors, sec } from "../../theme";

// Captions for Video 1, in Video1 (global) frames. One short line at a time.
// The overlap scene (17s to 37s) has no captions: its statements are
// on-screen text. Provisional: retime each line to the real voiceover. Scene starts, in
// seconds: hook 0, three 5, overlap 17, proof 37, outro 50.
const HW = layerColors.hardware;
const SW = layerColors.software;
const AI = layerColors.ai;
const EN = layerColors.engineering;
const W = colors.white;

const line = (
  from: number,
  to: number,
  segments: { text: string; color?: string }[],
): CaptionLine => ({
  from: sec(from),
  to: sec(to),
  text: segments.map((s) => s.text).join(""),
  segments,
});

export const VIDEO1_CAPTIONS: CaptionLine[] = [
  line(0.2, 4.8, [
    { text: "This video is " },
    { text: "hardware", color: HW },
    { text: ", " },
    { text: "software", color: SW },
    { text: ", and " },
    { text: "AI", color: AI },
    { text: ". All at once." },
  ]),
  line(5.5, 8.7, [
    { text: "Hardware", color: HW },
    { text: ": the stuff you can touch.", color: W },
  ]),
  line(9, 12.2, [
    { text: "Software", color: SW },
    { text: ": the instructions it follows." },
  ]),
  line(12.5, 16.5, [
    { text: "AI", color: AI },
    { text: ": software that learns from data." },
  ]),
  line(38, 41, [
    { text: "The animations are " },
    { text: "code", color: SW },
    { text: "." },
  ]),
  line(41, 44, [
    { text: "AI", color: AI },
    { text: " helped write that code." },
  ]),
  line(44, 47.5, [
    { text: "And it's playing on your " },
    { text: "device", color: HW },
    { text: "." },
  ]),
  line(50.3, 53.3, [{ text: "That's why I like them." }]),
  line(53.5, 57, [
    { text: "I love building things with " },
    { text: "all three", color: EN },
    { text: "." },
  ]),
  line(57.2, 59.8, [{ text: "Follow my journey. Hit Subscribe." }]),
];
