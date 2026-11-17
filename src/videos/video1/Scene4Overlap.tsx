import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeUp } from "../../components/animate";
import { Backdrop } from "../../components/Backdrop";
import { VennDiagram } from "../../components/VennDiagram";
import { fonts } from "../../fonts";
import { colors, layerColors, sec, spacing } from "../../theme";

// Scene 4: How they overlap (1:40 to 3:40). See docs/video1-script.md.
// The Venn diagram builds first, then one statement at a time appears beside
// it. The centre lights up with "Engineering" at the end.
// Timings are provisional; retime to the voiceover.
const STATEMENT_LEN = sec(20);
const FIRST_AT = sec(16);
const CENTER_AT = sec(100);

type Word = { text: string; color?: string };

const AI = { text: "AI", color: layerColors.ai };
const SW = { text: "software", color: layerColors.software };
const HW = { text: "hardware", color: layerColors.hardware };

const STATEMENTS: Word[][] = [
  [AI, { text: " is " }, { ...SW, text: "software." }],
  [
    { ...SW, text: "Software" },
    { text: " runs on " },
    { ...HW, text: "hardware." },
  ],
  [
    { ...HW, text: "Hardware" },
    { text: " is built for " },
    { ...AI, text: "AI." },
  ],
  [{ text: "They depend on each other." }],
];

const Statement: React.FC<{ words: Word[]; last?: boolean }> = ({
  words,
  last,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = fadeUp(frame, fps, 0);
  const exit = last
    ? 1
    : interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  return (
    <div
      style={{
        fontFamily: fonts.heading,
        fontWeight: 700,
        fontSize: 84,
        lineHeight: 1.15,
        color: colors.white,
        opacity: enter.opacity * exit,
        translate: `0 ${enter.translateY}px`,
      }}
    >
      {words.map((w, i) => (
        <span key={i} style={{ color: w.color ?? colors.white }}>
          {w.text}
        </span>
      ))}
    </div>
  );
};

export const Scene4Overlap: React.FC = () => {
  return (
    <Backdrop>
      <AbsoluteFill
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: spacing.safe,
          gap: spacing.safe,
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <VennDiagram size={800} delay={sec(1)} centerDelay={CENTER_AT} />
        </div>
        <div style={{ position: "relative", flex: 1, height: 400 }}>
          <AbsoluteFill style={{ justifyContent: "center" }}>
            {STATEMENTS.map((words, i) => (
              <Sequence
                key={i}
                from={FIRST_AT + i * STATEMENT_LEN}
                durationInFrames={STATEMENT_LEN}
                layout="none"
                name={`Statement ${i + 1}`}
              >
                <AbsoluteFill style={{ justifyContent: "center" }}>
                  <Statement words={words} />
                </AbsoluteFill>
              </Sequence>
            ))}
            <Sequence
              from={CENTER_AT + sec(3)}
              layout="none"
              name="Layers of one system"
            >
              <AbsoluteFill style={{ justifyContent: "center" }}>
                <Statement
                  last
                  words={[
                    { text: "Layers of one system: " },
                    { text: "engineering.", color: layerColors.engineering },
                  ]}
                />
              </AbsoluteFill>
            </Sequence>
          </AbsoluteFill>
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
