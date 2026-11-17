import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fonts } from "../fonts";
import {
  Layer,
  layerColors,
  spacing,
  springs,
  withAlpha,
  colors,
} from "../theme";

type Props = {
  layer: Layer;
  /** Tile size in px (the label sits below). */
  size?: number;
  /** Show the layer name under the icon. */
  showLabel?: boolean;
  /** Label text. Defaults to the layer name. */
  label?: string;
  /** Frame (inside the parent Sequence) when the pop-in starts. */
  delay?: number;
};

const defaultLabels: Record<Layer, string> = {
  hardware: "Hardware",
  software: "Software",
  ai: "AI",
  engineering: "Engineering",
};

// Simple line glyphs on a 64x64 grid, drawn with currentColor.
const Glyph: React.FC<{ layer: Layer }> = ({ layer }) => {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (layer) {
    case "hardware":
      return (
        <g {...common}>
          <rect x="16" y="16" width="32" height="32" rx="4" />
          <rect x="26" y="26" width="12" height="12" rx="2" />
          <path d="M24 6v10M32 6v10M40 6v10M24 48v10M32 48v10M40 48v10M6 24h10M6 32h10M6 40h10M48 24h10M48 32h10M48 40h10" />
        </g>
      );
    case "software":
      return (
        <g {...common}>
          <path d="M22 18 8 32l14 14M42 18l14 14-14 14M36 12 28 52" />
        </g>
      );
    case "ai":
      return (
        <g {...common}>
          <circle cx="12" cy="18" r="5" />
          <circle cx="12" cy="46" r="5" />
          <circle cx="32" cy="32" r="6" />
          <circle cx="52" cy="18" r="5" />
          <circle cx="52" cy="46" r="5" />
          <path d="M16.5 20.5 26.5 29.5M16.5 43.5 26.5 34.5M37.5 29.5 47.5 20.5M37.5 34.5 47.5 43.5" />
        </g>
      );
    case "engineering":
      return (
        <g {...common}>
          <circle cx="32" cy="32" r="9" />
          <path d="M32 8v8M32 48v8M8 32h8M48 32h8M15 15l6 6M43 43l6 6M49 15l-6 6M21 43l-6 6" />
        </g>
      );
  }
};

export const LayerIcon: React.FC<Props> = ({
  layer,
  size = 160,
  showLabel = true,
  label,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = layerColors[layer];

  const pop = spring({
    frame: frame - delay,
    fps,
    config: springs.smooth,
    durationInFrames: 20,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing.gap / 2,
        scale: interpolate(pop, [0, 1], [0.94, 1]),
        opacity: interpolate(pop, [0, 1], [0, 1], {
          extrapolateRight: "clamp",
        }),
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: spacing.radius,
          backgroundColor: withAlpha(color, 0.15),
          border: `3px solid ${color}`,
          color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 64 64"
          overflow="visible"
        >
          <Glyph layer={layer} />
        </svg>
      </div>
      {showLabel ? (
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 48,
            color: colors.white,
          }}
        >
          {label ?? defaultLabels[layer]}
        </div>
      ) : null}
    </div>
  );
};
