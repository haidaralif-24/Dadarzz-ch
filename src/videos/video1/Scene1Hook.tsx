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
import { Layer, colors, sec, springs } from "../../theme";

// Scene 1: Hook (about 5s). See docs/video1-script.md.
// Plain version: the three icons appear in place, one on each spoken word,
// then the line "All at once." Provisional timing; retime to the voiceover.
//   0.3s "hardware"   0.9s "software"   1.5s "AI"   3.3s "All at once."
const ICON = 200;
const ROW_GAP = 440;
const ROW_Y = -70;
const TEXT_AT = sec(3.3);

const ITEMS: { layer: Layer; popAt: number; x: number }[] = [
  { layer: "hardware", popAt: sec(0.3), x: -ROW_GAP },
  { layer: "software", popAt: sec(0.9), x: 0 },
  { layer: "ai", popAt: sec(1.5), x: ROW_GAP },
];

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const text = spring({
    frame: frame - TEXT_AT,
    fps,
    config: springs.smooth,
    durationInFrames: 20,
  });

  return (
    <Backdrop>
      {ITEMS.map((item) => (
        <AbsoluteFill
          key={item.layer}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              translate: `${item.x}px ${ROW_Y}px`,
              opacity: frame >= item.popAt ? 1 : 0,
            }}
          >
            <LayerIcon layer={item.layer} size={ICON} delay={item.popAt} />
          </div>
        </AbsoluteFill>
      ))}

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
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
          All at once.
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
