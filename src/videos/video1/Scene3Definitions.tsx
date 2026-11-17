import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeUp, popIn, typedLength } from "../../components/animate";
import { Backdrop } from "../../components/Backdrop";
import { fonts } from "../../fonts";
import { SCENE_FRAMES } from "./timing";
import {
  Layer,
  colors,
  layerColors,
  spacing,
  springs,
  withAlpha,
} from "../../theme";

// Scene 3: The three, in one sentence each (0:50 to 1:40).
// Three panels in turn, one idea at a time. See docs/video1-script.md.
export const PANEL_FRAMES = SCENE_FRAMES.definitions / 3; // provisional; retime to the voiceover

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const VISUAL = 640;

// ---- Visual 1: chip assembles from pieces --------------------------------
const ChipVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = layerColors.hardware;

  const piece = (delay: number) =>
    spring({
      frame: frame - delay,
      fps,
      config: springs.smooth,
      durationInFrames: 20,
    });
  const pins = piece(0);
  const body = piece(10);
  const core = piece(22);

  const pinPositions = [0, 1, 2, 3].map((i) => 130 + i * 47);

  return (
    <svg width={VISUAL} height={VISUAL} viewBox="0 0 400 400">
      <g stroke={color} strokeWidth={8} strokeLinecap="round" opacity={pins}>
        {pinPositions.map((p) => (
          <React.Fragment key={p}>
            <path
              d={`M${p} 60v40`}
              style={{
                translate: `0 ${interpolate(pins, [0, 1], [-70, 0])}px`,
              }}
            />
            <path
              d={`M${p} 300v40`}
              style={{ translate: `0 ${interpolate(pins, [0, 1], [70, 0])}px` }}
            />
            <path
              d={`M60 ${p}h40`}
              style={{
                translate: `${interpolate(pins, [0, 1], [-70, 0])}px 0`,
              }}
            />
            <path
              d={`M300 ${p}h40`}
              style={{ translate: `${interpolate(pins, [0, 1], [70, 0])}px 0` }}
            />
          </React.Fragment>
        ))}
      </g>
      <rect
        x={100}
        y={100}
        width={200}
        height={200}
        rx={20}
        fill={withAlpha(color, 0.15)}
        stroke={color}
        strokeWidth={8}
        opacity={body}
        style={{
          scale: `${interpolate(body, [0, 1], [0.7, 1])}`,
          transformOrigin: "200px 200px",
        }}
      />
      <rect
        x={160}
        y={160}
        width={80}
        height={80}
        rx={10}
        fill={color}
        opacity={core}
        style={{
          scale: `${interpolate(core, [0, 1], [0.4, 1])}`,
          transformOrigin: "200px 200px",
        }}
      />
    </svg>
  );
};

// ---- Visual 2: lines of code type on -------------------------------------
const CODE_LINES = [
  "if screen.touched():",
  "    camera.start()",
  "    show(photo)",
];

const CodeVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = layerColors.software;
  const win = popIn(frame, fps, 0, 0.92);

  let start = 12;
  return (
    <div
      style={{
        width: VISUAL + 120,
        padding: spacing.gap,
        borderRadius: spacing.radius,
        backgroundColor: colors.bgRaised,
        border: `3px solid ${color}`,
        opacity: win.opacity,
        scale: `${win.scale}`,
      }}
    >
      <div style={{ display: "flex", gap: 12, marginBottom: spacing.gap }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: withAlpha(color, 0.5),
            }}
          />
        ))}
      </div>
      {CODE_LINES.map((line) => {
        const n = typedLength(line, frame, fps, start, 24);
        start += Math.ceil((line.length / 24) * fps) + 6;
        return (
          <div
            key={line}
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 40,
              lineHeight: 1.6,
              color,
              whiteSpace: "pre",
              minHeight: 64,
            }}
          >
            {line.slice(0, n)}
          </div>
        );
      })}
    </div>
  );
};

// ---- Visual 3: dots connect into a small network -------------------------
const NODES = [
  { x: 60, y: 130 },
  { x: 60, y: 270 },
  { x: 200, y: 60 },
  { x: 200, y: 200 },
  { x: 200, y: 340 },
  { x: 340, y: 130 },
  { x: 340, y: 270 },
];
const EDGES: [number, number][] = [
  [0, 2],
  [0, 3],
  [0, 4],
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
  [3, 5],
  [3, 6],
  [4, 5],
  [4, 6],
];

const NetworkVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = layerColors.ai;
  const lines = interpolate(frame, [24, 54], [0, 1], clamp);

  return (
    <svg width={VISUAL} height={VISUAL} viewBox="0 0 400 400">
      {EDGES.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke={color}
          strokeWidth={3}
          opacity={0.7 * lines}
        />
      ))}
      {NODES.map((n, i) => {
        const p = popIn(frame, fps, i * 3, 0.4);
        return (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={20}
            fill={color}
            opacity={p.opacity}
            style={{
              scale: `${p.scale}`,
              transformOrigin: `${n.x}px ${n.y}px`,
            }}
          />
        );
      })}
    </svg>
  );
};

// ---- Panel ---------------------------------------------------------------
const Panel: React.FC<{
  layer: Layer;
  label: string;
  headline: string;
  detail: string;
  visual: React.ReactNode;
}> = ({ layer, label, headline, detail, visual }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = layerColors[layer];
  const t1 = fadeUp(frame, fps, 6);
  const t2 = fadeUp(frame, fps, 16);
  const t3 = fadeUp(frame, fps, 26);

  return (
    <Backdrop>
      <AbsoluteFill
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: spacing.safe,
          gap: spacing.safe,
        }}
      >
        <div
          style={{
            width: 760,
            display: "flex",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {visual}
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: spacing.gap }}
        >
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: 120,
              color,
              opacity: t1.opacity,
              translate: `0 ${t1.translateY}px`,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 500,
              fontSize: 64,
              lineHeight: 1.2,
              color: colors.white,
              opacity: t2.opacity,
              translate: `0 ${t2.translateY}px`,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 400,
              fontSize: 48,
              color: colors.muted,
              opacity: t3.opacity,
              translate: `0 ${t3.translateY}px`,
            }}
          >
            {detail}
          </div>
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};

export const Scene3Definitions: React.FC = () => {
  const len = Math.round(PANEL_FRAMES);
  return (
    <>
      <Sequence durationInFrames={len} name="Hardware">
        <Panel
          layer="hardware"
          label="Hardware"
          headline="The physical stuff. Things you can touch."
          detail="chip, screen, camera, battery"
          visual={<ChipVisual />}
        />
      </Sequence>
      <Sequence from={len} durationInFrames={len} name="Software">
        <Panel
          layer="software"
          label="Software"
          headline="The instructions. They tell the hardware what to do."
          detail="without it: just a piece of glass"
          visual={<CodeVisual />}
        />
      </Sequence>
      <Sequence
        from={len * 2}
        durationInFrames={SCENE_FRAMES.definitions - len * 2}
        name="AI"
      >
        <Panel
          layer="ai"
          label="AI"
          headline="Software that learns patterns from data."
          detail="not only fixed rules"
          visual={<NetworkVisual />}
        />
      </Sequence>
    </>
  );
};
