import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Backdrop } from "../../components/Backdrop";
import { Captions } from "../../components/Captions";
import { LayerIcon } from "../../components/LayerIcon";
import { LayerStack } from "../../components/LayerStack";
import { PhoneMock } from "../../components/PhoneMock";
import { ReasonCard } from "../../components/ReasonCard";
import { TitleCard } from "../../components/TitleCard";
import { VennDiagram } from "../../components/VennDiagram";
import { colors, sec, spacing, withAlpha } from "../../theme";
import { fonts } from "../../fonts";

// Dev tool, not a video: every shared component in one timeline so you can
// check them in Studio without building a scene. Not part of any upload.

const PANEL = sec(4);

const Panel: React.FC<{
  index: number;
  name: string;
  children: React.ReactNode;
}> = ({ index, name, children }) => {
  return (
    <Backdrop>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {children}
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: spacing.safe,
          top: spacing.safe,
          fontFamily: fonts.mono,
          fontSize: 24,
          letterSpacing: "0.16em",
          color: withAlpha(colors.muted, 0.85),
        }}
      >
        {`${index < 10 ? "0" : ""}${index} / ${name}`}
      </div>
    </Backdrop>
  );
};

const GlowPhone: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [24, 96], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <PhoneMock width={300} glow={glow} />;
};

const CAPTION_DEMO = [
  {
    text: "Hardware is the physical stuff: the chip, the screen, the battery.",
    from: 0,
    to: 60,
  },
  {
    text: "Software is the instructions. It tells the hardware what to do.",
    from: 60,
    to: 120,
  },
];

export const REEL_DURATION = PANEL * 7;

export const ComponentReel: React.FC = () => {
  return (
    <>
      <Sequence from={PANEL * 0} durationInFrames={PANEL} name="TitleCard">
        <Panel index={1} name="TitleCard">
          <TitleCard
            eyebrow="Video 1"
            title="Hardware, Software & AI"
            subtitle="Learning Software, Computer, & AI Engineering"
          />
        </Panel>
      </Sequence>

      <Sequence from={PANEL * 1} durationInFrames={PANEL} name="LayerIcon">
        <Panel index={2} name="LayerIcon">
          <div style={{ display: "flex", gap: 96, alignItems: "center" }}>
            <LayerIcon layer="hardware" size={180} delay={0} />
            <LayerIcon layer="software" size={180} delay={10} />
            <LayerIcon layer="ai" size={180} delay={20} />
          </div>
        </Panel>
      </Sequence>

      <Sequence from={PANEL * 2} durationInFrames={PANEL} name="VennDiagram">
        <Panel index={3} name="VennDiagram">
          <VennDiagram size={720} />
        </Panel>
      </Sequence>

      <Sequence from={PANEL * 3} durationInFrames={PANEL} name="LayerStack">
        <Panel index={4} name="LayerStack">
          <LayerStack width={640} />
        </Panel>
      </Sequence>

      <Sequence from={PANEL * 4} durationInFrames={PANEL} name="PhoneMock">
        <Panel index={5} name="PhoneMock">
          <GlowPhone />
        </Panel>
      </Sequence>

      <Sequence from={PANEL * 5} durationInFrames={PANEL} name="ReasonCard">
        <Panel index={6} name="ReasonCard">
          <div style={{ display: "flex", gap: 32, alignItems: "stretch" }}>
            <ReasonCard
              index={1}
              title="You understand the world around you"
              delay={0}
              width={480}
            />
            <ReasonCard
              index={2}
              title="You can build complete things"
              delay={12}
              width={480}
            />
            <ReasonCard
              index={3}
              title="The lines are blurring"
              delay={24}
              width={480}
            />
          </div>
        </Panel>
      </Sequence>

      <Sequence from={PANEL * 6} durationInFrames={PANEL} name="Captions">
        <Panel index={7} name="Captions">
          <Captions lines={CAPTION_DEMO} />
        </Panel>
      </Sequence>
    </>
  );
};
