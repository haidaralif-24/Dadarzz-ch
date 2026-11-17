import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeUp } from "../../components/animate";
import { Backdrop } from "../../components/Backdrop";
import { ReasonCard } from "../../components/ReasonCard";
import { fonts } from "../../fonts";
import { colors, sec, spacing } from "../../theme";

// Scene 6: Why learn all three (5:30 to 6:30). See docs/video1-script.md.
// Three cards slide in on the beats "one, two, three". Provisional timing.
const CARD_AT = [sec(3), sec(7), sec(11)];
const CLOSING_AT = sec(14.5);

export const Scene6Why: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const closing = fadeUp(frame, fps, CLOSING_AT);

  return (
    <Backdrop>
      <AbsoluteFill
        style={{
          padding: spacing.safe,
          justifyContent: "center",
          gap: spacing.safe,
        }}
      >
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: 96,
            color: colors.white,
          }}
        >
          Why learn all three?
        </div>
        <div
          style={{ display: "flex", gap: spacing.gap, alignItems: "stretch" }}
        >
          <ReasonCard
            index={1}
            title="You understand the world around you"
            delay={CARD_AT[0]}
          />
          <ReasonCard
            index={2}
            title="You can build complete things"
            delay={CARD_AT[1]}
          />
          <ReasonCard
            index={3}
            title="The lines are blurring"
            delay={CARD_AT[2]}
          />
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 400,
            fontSize: 48,
            color: colors.muted,
            opacity: closing.opacity,
            translate: `0 ${closing.translateY}px`,
          }}
        >
          No need to master everything at once.
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
