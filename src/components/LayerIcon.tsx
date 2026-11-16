import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { popIn } from "./animate";

export type IconLayer = "hardware" | "software" | "ai";

// The three layer colors never change meaning. See CLAUDE.md.
export const iconColor: Record<IconLayer, string> = {
  hardware: colors.hardware,
  software: colors.software,
  ai: colors.ai,
};

// Pin positions for the chip: three per side, symmetric around the centre.
const PINS = [36, 50, 64];

const ChipShape: React.FC<{ color: string }> = ({ color }) => (
  <>
    <rect x={26} y={26} width={48} height={48} rx={9} />
    <rect x={40} y={40} width={20} height={20} rx={3} fill={color} stroke="none" />
    {PINS.map((p) => (
      <g key={p}>
        <line x1={p} y1={14} x2={p} y2={26} />
        <line x1={p} y1={74} x2={p} y2={86} />
        <line x1={14} y1={p} x2={26} y2={p} />
        <line x1={74} y1={p} x2={86} y2={p} />
      </g>
    ))}
  </>
);

const CodeShape: React.FC<{ color: string }> = ({ color }) => (
  <>
    <rect x={14} y={20} width={72} height={60} rx={8} />
    <line x1={14} y1={38} x2={86} y2={38} strokeOpacity={0.55} />
    <circle cx={25} cy={29} r={3.2} fill={color} stroke="none" />
    <circle cx={36} cy={29} r={3.2} fill={color} stroke="none" opacity={0.6} />
    <circle cx={47} cy={29} r={3.2} fill={color} stroke="none" opacity={0.35} />
    <line x1={26} y1={52} x2={60} y2={52} />
    <line x1={26} y1={64} x2={48} y2={64} strokeOpacity={0.7} />
    <line x1={26} y1={76} x2={38} y2={76} strokeOpacity={0.45} />
  </>
);

const AiShape: React.FC<{ color: string }> = ({ color }) => (
  <>
    <path
      d="M50 12 C52.5 32 68 47.5 88 50 C68 52.5 52.5 68 50 88 C47.5 68 32 52.5 12 50 C32 47.5 47.5 32 50 12 Z"
      fill={color}
      stroke="none"
    />
    <circle cx={80} cy={20} r={3.6} fill={color} stroke="none" opacity={0.85} />
    <circle cx={90} cy={34} r={2.4} fill={color} stroke="none" opacity={0.6} />
    <circle cx={70} cy={11} r={2} fill={color} stroke="none" opacity={0.45} />
  </>
);

type LayerIconProps = {
  layer: IconLayer;
  size?: number;
  delay?: number;
  // Set false when the parent already animates the icon in.
  animate?: boolean;
  style?: React.CSSProperties;
};

export const LayerIcon: React.FC<LayerIconProps> = ({
  layer,
  size = 160,
  delay = 0,
  animate = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = animate ? popIn(frame, fps, delay) : { scale: 1, opacity: 1 };
  const color = iconColor[layer];

  return (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        transform: `scale(${p.scale})`,
        opacity: p.opacity,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "block" }}
      >
        {layer === "hardware" ? (
          <ChipShape color={color} />
        ) : layer === "software" ? (
          <CodeShape color={color} />
        ) : (
          <AiShape color={color} />
        )}
      </svg>
    </div>
  );
};
