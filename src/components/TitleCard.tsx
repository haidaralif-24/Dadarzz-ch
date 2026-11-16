import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fonts } from "../fonts";
import { colors, spacing, springs } from "../theme";

type Props = {
  title: string;
  subtitle?: string;
  /** Small label above the title, e.g. "Video 1". */
  eyebrow?: string;
  /** Color of the accent bar. Defaults to brand orange. */
  accent?: string;
};

export const TitleCard: React.FC<Props> = ({
  title,
  subtitle,
  eyebrow,
  accent = colors.brand,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: springs.smooth,
    durationInFrames: 20,
  });
  const subEnter = spring({
    frame: frame - 6,
    fps,
    config: springs.smooth,
    durationInFrames: 20,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        padding: spacing.safe,
        justifyContent: "center",
        gap: spacing.gap,
      }}
    >
      {eyebrow ? (
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 48,
            color: colors.muted,
            opacity: enter,
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <div
        style={{
          width: interpolate(enter, [0, 1], [0, 160]),
          height: 8,
          borderRadius: 4,
          backgroundColor: accent,
        }}
      />
      <div
        style={{
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize: 120,
          lineHeight: 1.1,
          color: colors.white,
          opacity: enter,
          translate: `0 ${interpolate(enter, [0, 1], [30, 0])}px`,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 400,
            fontSize: 48,
            color: colors.muted,
            opacity: subEnter,
            translate: `0 ${interpolate(subEnter, [0, 1], [20, 0])}px`,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
