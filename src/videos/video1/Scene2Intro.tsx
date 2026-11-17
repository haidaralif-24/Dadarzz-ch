import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeUp } from "../../components/animate";
import { Backdrop } from "../../components/Backdrop";
import { TitleCard } from "../../components/TitleCard";
import { fonts } from "../../fonts";
import { colors, layerColors, sec, spacing } from "../../theme";

// Scene 2: Intro (0:20 to 0:50). See docs/video1-script.md.
//   0 to 14s   title card: name + tagline
//   14s onward "They're one system": the three layer colors as one line
const SPLIT = sec(14);

const OneSystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = fadeUp(frame, fps, 0);
  const b = fadeUp(frame, fps, 12);

  return (
    <Backdrop>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: spacing.safe,
          gap: spacing.gap,
        }}
      >
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 500,
            fontSize: 72,
            color: colors.muted,
            opacity: a.opacity,
            translate: `0 ${a.translateY}px`,
          }}
        >
          Not three separate worlds.
        </div>
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: 120,
            color: colors.white,
            opacity: b.opacity,
            translate: `0 ${b.translateY}px`,
          }}
        >
          One system.
        </div>
        <div
          style={{
            display: "flex",
            height: 8,
            width: 480,
            borderRadius: 4,
            overflow: "hidden",
            opacity: b.opacity,
          }}
        >
          <div style={{ flex: 1, backgroundColor: layerColors.hardware }} />
          <div style={{ flex: 1, backgroundColor: layerColors.software }} />
          <div style={{ flex: 1, backgroundColor: layerColors.ai }} />
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};

export const Scene2Intro: React.FC = () => {
  return (
    <>
      <Sequence durationInFrames={SPLIT} name="Title">
        <TitleCard
          eyebrow="Hi, I'm"
          title="Dadarzz"
          subtitle="Learning Software, Computer, & AI Engineering"
        />
      </Sequence>
      <Sequence from={SPLIT} name="One system">
        <OneSystem />
      </Sequence>
    </>
  );
};
