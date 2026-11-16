import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, spacing, withAlpha } from "../theme";
import { fonts } from "../fonts";
import { slideIn } from "./animate";

type ReasonCardProps = {
  // 1-based. Displayed as 01, 02, 03.
  index: number;
  title: string;
  accent?: string;
  delay?: number;
  width?: number;
};

export const ReasonCard: React.FC<ReasonCardProps> = ({
  index,
  title,
  accent = colors.brand,
  delay = 0,
  width = 520,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = slideIn(frame, fps, delay, 64);
  const number = index < 10 ? `0${index}` : `${index}`;

  return (
    <div
      style={{
        width,
        padding: spacing.gap + 12,
        borderRadius: spacing.radius,
        backgroundColor: colors.bgRaised,
        border: `1px solid ${withAlpha(accent, 0.28)}`,
        borderTop: `5px solid ${accent}`,
        opacity: s.opacity,
        transform: `translateX(${s.translateX}px)`,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 34,
          letterSpacing: "0.16em",
          color: accent,
          marginBottom: 22,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize: 50,
          lineHeight: 1.16,
          letterSpacing: "-0.015em",
          color: colors.white,
        }}
      >
        {title}
      </div>
    </div>
  );
};
