import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, crt, withAlpha } from "../theme";

// Makes everything inside look like it is shown on an old CRT monitor, like the
// channel banner: dimmed, washed-out colors with a warm phosphor tint, horizontal scanlines
// across ALL content (including captions), and a soft dark vignette.
// Wrap a whole video in this once. All static, so every frame stays deterministic.
export const CrtScreen: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const line = withAlpha("#000000", crt.scanlineAlpha);
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgDeep }}>
      <AbsoluteFill
        style={{
          filter: `sepia(${crt.sepia}) saturate(${crt.saturate}) brightness(${crt.brightness})`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${line} 0px, ${line} 2px, transparent 2px, transparent 4px)`,
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 55%, ${withAlpha("#000000", 0.35)} 100%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
