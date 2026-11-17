import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeUp, popIn } from "../../components/animate";
import { Backdrop } from "../../components/Backdrop";
import { TitleCard } from "../../components/TitleCard";
import { fonts } from "../../fonts";
import { colors, sec, spacing } from "../../theme";

// Scene 5: Outro (0:50 to 1:00). See docs/video1-script.md.
// First person: why I like all three, the name, then the subscribe prompt.
// TODO: optional next-video teaser once the next topic is decided.
export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const question = fadeUp(frame, fps, 0);
  const button = popIn(frame, fps, sec(4), 0.8);

  return (
    <Backdrop>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: spacing.gap * 1.5,
          padding: spacing.safe,
        }}
      >
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: 96,
            lineHeight: 1.15,
            textAlign: "center",
            color: colors.white,
            opacity: question.opacity,
            translate: `0 ${question.translateY}px`,
          }}
        >
          I love building with{" "}
          <span style={{ color: colors.engineering }}>all three.</span>
        </div>
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: 64,
            color: colors.white,
            padding: "24px 64px",
            borderRadius: spacing.radius,
            backgroundColor: colors.brand,
            opacity: button.opacity,
            scale: `${button.scale}`,
          }}
        >
          Follow my journey: Subscribe
        </div>
      </AbsoluteFill>
      <Sequence from={sec(6)} layout="none" name="Name">
        <TitleCard
          compact
          corner="top-left"
          title="Dadarzz Engineering"
          subtitle="Learning Software, Computer, & AI Engineering"
        />
      </Sequence>
    </Backdrop>
  );
};
