import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Backdrop } from "../../components/Backdrop";
import { LayerIcon } from "../../components/LayerIcon";
import { fonts } from "../../fonts";
import {
  Layer,
  colors,
  layerColors,
  sec,
  springs,
  withAlpha,
} from "../../theme";

// Scene 1: Hook (about 10s). See docs/video1-script.md.
// Beats (provisional, retime to the voiceover):
//   1.5s "hardware"  -> chip pops in
//   2.3s "software"  -> code window pops in
//   3.1s "AI"        -> AI sparkle pops in
//   5.0s "all working together" -> the three slide into one glowing row
//   7.5s "Let's figure it out."
const ICON = 200;
const ROW_GAP = 440;

type Item = {
  layer: Layer;
  popAt: number;
  // Where it first appears, relative to the screen centre.
  from: { x: number; y: number };
  // Where it ends up in the row.
  to: { x: number; y: number };
};

const ITEMS: Item[] = [
  {
    layer: "hardware",
    popAt: sec(1.5),
    from: { x: -520, y: -150 },
    to: { x: -ROW_GAP, y: -70 },
  },
  {
    layer: "software",
    popAt: sec(2.3),
    from: { x: 460, y: 90 },
    to: { x: 0, y: -70 },
  },
  {
    layer: "ai",
    popAt: sec(3.1),
    from: { x: -60, y: 230 },
    to: { x: ROW_GAP, y: -70 },
  },
];

const MERGE_AT = sec(5);
const TEXT_AT = sec(7.5);

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const merge = spring({
    frame: frame - MERGE_AT,
    fps,
    config: springs.smooth,
    durationInFrames: 20,
  });
  const text = spring({
    frame: frame - TEXT_AT,
    fps,
    config: springs.smooth,
    durationInFrames: 20,
  });

  return (
    <Backdrop>
      {/* Warm glow behind the row once the three are together. */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: merge,
        }}
      >
        <div
          style={{
            width: 1500,
            height: 360,
            translate: "0 -70px",
            borderRadius: 180,
            background: `radial-gradient(closest-side, ${withAlpha(colors.engineering, 0.28)}, ${withAlpha(colors.engineering, 0)})`,
          }}
        />
      </AbsoluteFill>

      {ITEMS.map((item) => (
        <AbsoluteFill
          key={item.layer}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              translate: `${interpolate(merge, [0, 1], [item.from.x, item.to.x])}px ${interpolate(merge, [0, 1], [item.from.y, item.to.y])}px`,
              opacity: frame >= item.popAt ? 1 : 0,
              filter: `drop-shadow(0 0 ${interpolate(merge, [0, 1], [0, 28])}px ${withAlpha(layerColors[item.layer], 0.6)})`,
            }}
          >
            <LayerIcon layer={item.layer} size={ICON} delay={item.popAt} />
          </div>
        </AbsoluteFill>
      ))}

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            translate: `0 ${interpolate(text, [0, 1], [310, 290])}px`,
            opacity: text,
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: 84,
            color: colors.white,
          }}
        >
          Let&apos;s figure it out.
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
