import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { popIn, typedLength } from "../../components/animate";
import { fonts } from "../../fonts";
import { colors, layerColors, spacing, withAlpha } from "../../theme";

// Animated content for the phone in Scene 4. Three stacked panels appear on the
// same beats as the layer stack (software, AI, hardware) and keep moving so the
// screen is never static. Everything is driven by the frame number.
type Props = {
  softwareAt: number;
  aiAt: number;
  hardwareAt: number;
};

const CODE = ["video = Scene()", "ai.write(video)", "device.play(video)"];
const LOOP = 150; // frames before the typing restarts

const Panel: React.FC<{
  color: string;
  at: number;
  children: React.ReactNode;
}> = ({ color, at, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = popIn(frame, fps, at, 0.9);
  return (
    <div
      style={{
        flex: 1,
        borderRadius: spacing.radius / 2,
        border: `2px solid ${withAlpha(color, 0.7)}`,
        backgroundColor: withAlpha(color, 0.1),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: p.opacity,
        scale: `${p.scale}`,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

const Code: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame - at) % LOOP;
  const cursorOn = Math.floor(frame / 10) % 2 === 0;
  let start = 6;
  return (
    <div style={{ padding: 18, width: "100%" }}>
      {CODE.map((line, i) => {
        const n = typedLength(line, t, fps, start, 20);
        const done = n === line.length;
        start += Math.ceil((line.length / 20) * fps) + 4;
        const last = i === CODE.length - 1;
        return (
          <div
            key={line}
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 24,
              lineHeight: 1.7,
              color: layerColors.software,
              whiteSpace: "pre",
              minHeight: 41,
            }}
          >
            {line.slice(0, n)}
            {(last ? n > 0 : !done && n > 0) && cursorOn ? "▌" : ""}
          </div>
        );
      })}
    </div>
  );
};

const NODES = [
  { x: 40, y: 40 },
  { x: 40, y: 140 },
  { x: 150, y: 20 },
  { x: 150, y: 90 },
  { x: 150, y: 160 },
  { x: 260, y: 90 },
];
const EDGES: [number, number][] = [
  [0, 2],
  [0, 3],
  [1, 3],
  [1, 4],
  [2, 5],
  [3, 5],
  [4, 5],
];

const Network: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={300} height={180} viewBox="0 0 300 180">
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke={layerColors.ai}
          strokeWidth={3}
          opacity={interpolate(Math.sin(frame / 9 - i), [-1, 1], [0.25, 0.9])}
        />
      ))}
      {NODES.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={interpolate(Math.sin(frame / 7 - i * 0.9), [-1, 1], [9, 15])}
          fill={layerColors.ai}
        />
      ))}
    </svg>
  );
};

const Chip: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 8), [-1, 1], [0.35, 1]);
  const pins = [0, 1, 2, 3];
  return (
    <svg width={180} height={180} viewBox="0 0 180 180">
      <g stroke={layerColors.hardware} strokeWidth={5} strokeLinecap="round">
        {pins.map((i) => {
          const p = 52 + i * 26;
          const lit = Math.floor(frame / 6) % 4 === i;
          return (
            <g key={i} opacity={lit ? 1 : 0.45}>
              <path d={`M${p} 14v22M${p} 144v22M14 ${p}h22M144 ${p}h22`} />
            </g>
          );
        })}
      </g>
      <rect
        x={40}
        y={40}
        width={100}
        height={100}
        rx={12}
        fill={withAlpha(layerColors.hardware, 0.15)}
        stroke={layerColors.hardware}
        strokeWidth={5}
      />
      <rect
        x={68}
        y={68}
        width={44}
        height={44}
        rx={6}
        fill={layerColors.hardware}
        opacity={pulse}
      />
    </svg>
  );
};

export const PhoneScreen: React.FC<Props> = ({
  softwareAt,
  aiAt,
  hardwareAt,
}) => {
  const frame = useCurrentFrame();
  // A thin progress bar like a video player: the screen is "playing" the video.
  const progress = interpolate(frame % 240, [0, 240], [0, 1]);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "64px 20px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Panel color={layerColors.software} at={softwareAt}>
        <Code at={softwareAt} />
      </Panel>
      <Panel color={layerColors.ai} at={aiAt}>
        <Network />
      </Panel>
      <Panel color={layerColors.hardware} at={hardwareAt}>
        <Chip />
      </Panel>
      <div
        style={{
          height: 8,
          borderRadius: 4,
          backgroundColor: withAlpha(colors.muted, 0.3),
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            borderRadius: 4,
            backgroundColor: colors.brand,
          }}
        />
      </div>
    </div>
  );
};
