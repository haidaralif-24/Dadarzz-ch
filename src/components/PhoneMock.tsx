import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, withAlpha } from "../theme";
import { popIn } from "./animate";

type PhoneMockProps = {
  delay?: number;
  width?: number;
  // 0 to 1. Drives the rim light, for "this is running on your hardware".
  glow?: number;
  glowColor?: string;
  children?: React.ReactNode;
};

export const PhoneMock: React.FC<PhoneMockProps> = ({
  delay = 0,
  width = 380,
  glow = 0,
  glowColor = colors.hardware,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = popIn(frame, fps, delay, 0.92);
  const height = Math.round(width * 1.98);
  const bezel = 12;
  const radius = Math.round(width * 0.13);

  const shadow =
    glow > 0
      ? `0 0 ${Math.round(70 * glow)}px ${withAlpha(glowColor, 0.5 * glow)}, 0 0 ${Math.round(
          190 * glow,
        )}px ${withAlpha(glowColor, 0.22 * glow)}`
      : "none";

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: radius,
        border: `${bezel}px solid ${withAlpha(colors.muted, 0.34)}`,
        backgroundColor: colors.bgRaised,
        boxShadow: shadow,
        overflow: "hidden",
        transform: `scale(${p.scale})`,
        opacity: p.opacity,
        flexShrink: 0,
      }}
    >
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${colors.bgRaised} 0%, ${colors.bg} 100%)`,
        }}
      >
        {children}
      </AbsoluteFill>

      {/* Notch, drawn in the background colour so it reads as cut out. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: Math.round(width * 0.3),
          height: 20,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          backgroundColor: colors.bg,
        }}
      />
    </div>
  );
};
