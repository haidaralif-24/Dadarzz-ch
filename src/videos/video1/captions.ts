import { CaptionLine } from "../../components/Captions";
import { colors, layerColors, sec } from "../../theme";

// Captions for Video 1, in Video1 (global) frames. One short line at a time.
// Provisional: retime each line to the real voiceover. Scene starts, in
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
  line(18.5, 22.3, [
    { text: "AI", color: AI },
    { text: " is " },
    { text: "software", color: SW },
    { text: "." },
  ]),
  line(22.5, 26.3, [
    { text: "Software", color: SW },
    { text: " runs on " },
    { text: "hardware", color: HW },
    { text: "." },
  ]),
  line(26.5, 30.3, [
    { text: "Hardware", color: HW },
    { text: " is built for " },
    { text: "AI", color: AI },
    { text: "." },
  ]),
  line(30.5, 36.5, [
    { text: "Put them together, and that's " },
    { text: "engineering", color: EN },
    { text: "." },
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
  line(50.3, 53.8, [
    { text: "What would we build with " },
    { text: "all three", color: EN },
    { text: "?" },
  ]),
  line(54, 57.8, [{ text: "Let's find out together." }]),
  line(58, 59.8, [{ text: "Subscribe to learn with me." }]),
];
