import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeUp } from "../../components/animate";
import { Backdrop } from "../../components/Backdrop";
import { LayerIcon } from "../../components/LayerIcon";
import { fonts } from "../../fonts";
import { Layer, colors, layerColors, sec, spacing } from "../../theme";

// Scene 2: The three (0:05 to 0:17). See docs/video1-script.md.
// One icon and one line each, appearing on the spoken beats. Provisional timing.
const ITEMS: { layer: Layer; at: number; line: string }[] = [
  { layer: "hardware", at: sec(0.5), line: "The stuff you can touch." },
  { layer: "software", at: sec(4), line: "The instructions it follows." },
  { layer: "ai", at: sec(7.5), line: "Software that learns from data." },
];

const Column: React.FC<{ layer: Layer; at: number; line: string }> = ({
  layer,
  at,
  line,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const text = fadeUp(frame, fps, at + 6);

  return (
    <div
      style={{
        width: 520,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing.gap,
      }}
    >
      <LayerIcon layer={layer} size={180} delay={at} />
      <div
        style={{
          fontFamily: fonts.heading,
          fontWeight: 500,
          fontSize: 52,
          lineHeight: 1.2,
          textAlign: "center",
          color: colors.white,
          borderTop: `5px solid ${layerColors[layer]}`,
          paddingTop: spacing.gap / 2,
          opacity: text.opacity,
          translate: `0 ${text.translateY}px`,
        }}
      >
        {line}
      </div>
    </div>
  );
};

export const Scene2Three: React.FC = () => {
  return (
    <Backdrop>
      <AbsoluteFill
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: spacing.gap,
          paddingTop: 280,
        }}
      >
        {ITEMS.map((item) => (
          <Column key={item.layer} {...item} />
        ))}
      </AbsoluteFill>
    </Backdrop>
  );
};
