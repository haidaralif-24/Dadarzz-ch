import React, { useId } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, withAlpha } from "../theme";
import { fonts } from "../fonts";
import { iconColor, IconLayer } from "./LayerIcon";
import { popIn } from "./animate";

// Geometry lives in a 1000x1000 box and is scaled by `size`.
// Hardware top-left, Software top-right, AI below: the centroid is inside all three.
const RADIUS = 280;
const CENTRES: Record<IconLayer, { x: number; y: number }> = {
  hardware: { x: 349, y: 418 },
  software: { x: 651, y: 418 },
  ai: { x: 500, y: 679 },
};
const LABEL_POS: Record<IconLayer, { left: string; top: string }> = {
  hardware: { left: "34.9%", top: "22.8%" },
  software: { left: "65.1%", top: "22.8%" },
  ai: { left: "50%", top: "86.9%" },
};

const ORDER: IconLayer[] = ["hardware", "software", "ai"];

const DEFAULT_LABELS: Record<IconLayer, string> = {
  hardware: "Hardware",
  software: "Software",
  ai: "AI",
};

type VennDiagramProps = {
  delay?: number;
  size?: number;
  labels?: Partial<Record<IconLayer, string>>;
  labelSize?: number;
  // The glowing centre: where all three meet, that's "Engineering".
  showCenter?: boolean;
  centerDelay?: number;
  centerLabel?: string;
};

export const VennDiagram: React.FC<VennDiagramProps> = ({
  delay = 0,
  size = 760,
  labels,
  labelSize = 32,
  showCenter = true,
  centerDelay = 42,
  centerLabel = "Engineering",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // useId contains colons, which are invalid inside url(#...).
  const gradientId = useId().replace(/:/g, "");

  const centerAt = delay + centerDelay;
  const centerOpacity = interpolate(frame, [centerAt, centerAt + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const centerScale = popIn(frame, fps, centerAt, 0.72).scale;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg viewBox="0 0 1000 1000" width={size} height={size} style={{ display: "block" }}>
        <defs>
          <radialGradient id={gradientId}>
            <stop offset="0%" stopColor={withAlpha(colors.brand, 0.55)} />
            <stop offset="55%" stopColor={withAlpha(colors.brand, 0.18)} />
            <stop offset="100%" stopColor={withAlpha(colors.brand, 0)} />
          </radialGradient>
        </defs>

        {ORDER.map((layer, i) => {
          const centre = CENTRES[layer];
          const p = popIn(frame, fps, delay + i * 11);
          return (
            <g
              key={layer}
              transform={`translate(${centre.x} ${centre.y}) scale(${p.scale})`}
              opacity={p.opacity}
              style={{ mixBlendMode: "screen" }}
            >
              <circle
                r={RADIUS}
                fill={iconColor[layer]}
                fillOpacity={0.16}
                stroke={iconColor[layer]}
                strokeOpacity={0.75}
                strokeWidth={3}
              />
            </g>
          );
        })}

        <circle
          cx={500}
          cy={505}
          r={210}
          fill={`url(#${gradientId})`}
          opacity={centerOpacity}
        />
      </svg>

      {ORDER.map((layer, i) => {
        const p = popIn(frame, fps, delay + i * 11 + 6);
        return (
          <div
            key={layer}
            style={{
              position: "absolute",
              left: LABEL_POS[layer].left,
              top: LABEL_POS[layer].top,
              transform: `translate(-50%, -50%) scale(${p.scale})`,
              opacity: p.opacity,
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: labelSize,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: iconColor[layer],
              whiteSpace: "nowrap",
            }}
          >
            {labels && labels[layer] ? labels[layer] : DEFAULT_LABELS[layer]}
          </div>
        );
      })}

      {showCenter ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50.5%",
            transform: `translate(-50%, -50%) scale(${centerScale})`,
            opacity: centerOpacity,
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: 48,
            letterSpacing: "-0.01em",
            color: colors.brand,
            textShadow: `0 0 44px ${withAlpha(colors.brand, 0.6)}`,
            whiteSpace: "nowrap",
          }}
        >
          {centerLabel}
        </div>
      ) : null}
    </div>
  );
};
