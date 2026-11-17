import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, withAlpha } from "../theme";
import { fonts } from "../fonts";

export type CaptionLine = {
  text: string;
  // Optional: color individual words (e.g. by layer). Overrides `text` when set.
  segments?: { text: string; color?: string }[];
  // Local frames of the sequence this <Captions /> sits in.
  from: number;
  to: number;
};

type CaptionsProps = {
  lines: CaptionLine[];
  bottom?: number;
  maxWidth?: number;
  fadeFrames?: number;
  size?: number;
};

// Subtitle bar synced to the voiceover. Timing comes from the real audio:
// pass the measured in/out frames per line.
export const Captions: React.FC<CaptionsProps> = ({
  lines,
  bottom = 64,
  maxWidth = 1520,
  fadeFrames = 4,
  size = 56,
}) => {
  const frame = useCurrentFrame();

  let active: CaptionLine | undefined;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (frame >= line.from && frame < line.to) {
      active = line;
      break;
    }
  }

  if (!active) {
    return null;
  }

  const opacity = interpolate(
    frame,
    [active.from, active.from + fadeFrames, active.to - fadeFrames, active.to],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: bottom,
      }}
    >
      <div
        style={{
          maxWidth,
          padding: "18px 34px",
          borderRadius: 16,
          backgroundColor: withAlpha(colors.bg, 0.78),
          border: `1px solid ${withAlpha(colors.muted, 0.18)}`,
          opacity,
        }}
      >
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 500,
            fontSize: size,
            lineHeight: 1.3,
            color: colors.white,
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {active.segments
            ? active.segments.map((seg, i) => (
                <span key={i} style={{ color: seg.color ?? colors.white }}>
                  {seg.text}
                </span>
              ))
            : active.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
