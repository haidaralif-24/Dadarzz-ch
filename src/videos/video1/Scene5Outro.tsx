import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeUp, popIn } from "../../components/animate";
import { Backdrop } from "../../components/Backdrop";
import { BrandLockup } from "../../components/BrandLockup";
import { fonts } from "../../fonts";
import { colors, sec, spacing } from "../../theme";

// Scene 5: Outro (0:50 to 1:00). See docs/video1-script.md.
// First person: why I like all three, then the Darz Bits logo lockup, then the
// subscribe prompt. All three are laid out from the start so nothing shifts.
// TODO: optional next-video teaser once the next topic is decided.
const LOGO_AT = sec(3);
const BUTTON_AT = sec(6);

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const line = fadeUp(frame, fps, 0);
  const button = popIn(frame, fps, BUTTON_AT, 0.8);

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
            fontSize: 80,
            lineHeight: 1.15,
            textAlign: "center",
            color: colors.white,
            opacity: line.opacity,
            translate: `0 ${line.translateY}px`,
          }}
        >
          I love building with{" "}
          <span style={{ color: colors.engineering }}>all three.</span>
        </div>
        <div
          style={{
            opacity: frame >= LOGO_AT ? 1 : 0,
            height: 300,
            display: "flex",
            alignItems: "center",
          }}
        >
          <BrandLockup size={280} delay={LOGO_AT} />
        </div>
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: 56,
            color: colors.bg,
            padding: "20px 56px",
            borderRadius: spacing.radius,
            backgroundColor: colors.brand,
            opacity: button.opacity,
            scale: `${button.scale}`,
          }}
        >
          Follow my journey: Subscribe
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
