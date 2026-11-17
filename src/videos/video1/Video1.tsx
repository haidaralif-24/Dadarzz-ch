import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { TitleCard } from "../../components/TitleCard";
import { LayerIcon } from "../../components/LayerIcon";
import { colors, sec, spacing } from "../../theme";

// Placeholder: real scenes are built one at a time from docs/video1-script.md.
// TODO: replace once the final script is pasted into docs/video1-script.md.
export const Video1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <Sequence durationInFrames={sec(3)} name="Title (placeholder)">
        <TitleCard
          eyebrow="Video 1"
          title="Hardware, Software & AI"
          subtitle="Placeholder: scenes coming soon"
        />
      </Sequence>
      <Sequence from={sec(3)} durationInFrames={sec(3)} name="Layers (placeholder)">
        <AbsoluteFill
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: spacing.safe,
          }}
        >
          <LayerIcon layer="hardware" />
          <LayerIcon layer="software" delay={6} />
          <LayerIcon layer="ai" delay={12} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
