import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeUp, popIn } from "../../components/animate";
import { Backdrop } from "../../components/Backdrop";
import { fonts } from "../../fonts";
import { colors, sec, spacing } from "../../theme";

// Scene 5: Outro (0:50 to 1:00). See docs/video1-script.md.
// A question for the viewer, then the subscribe prompt, then the name.
// TODO: optional next-video teaser once the next topic is decided.
export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const question = fadeUp(frame, fps, 0);
  const button = popIn(frame, fps, sec(4), 0.8);
  const name = fadeUp(frame, fps, sec(6));

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
          What would we build with{" "}
          <span style={{ color: colors.engineering }}>all three?</span>
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
          Subscribe to learn with us
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 400,
            fontSize: 48,
            color: colors.muted,
            opacity: name.opacity,
            translate: `0 ${name.translateY}px`,
          }}
        >
          Dadarzz Engineering
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
