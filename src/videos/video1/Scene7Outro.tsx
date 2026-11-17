import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fadeUp, popIn } from "../../components/animate";
import { Backdrop } from "../../components/Backdrop";
import { TitleCard } from "../../components/TitleCard";
import { fonts } from "../../fonts";
import { colors, sec, spacing, withAlpha } from "../../theme";

// Scene 7: Outro (6:30 to 7:00). See docs/video1-script.md.
//   0 to 12s   name and tagline return
//   12s onward subscribe prompt, then the teaser for the next video
// TODO: set the next video's topic. The teaser stays hidden while it is empty.
const NEXT_TOPIC = "";
const SPLIT = sec(12);

const Subscribe: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const button = popIn(frame, fps, 0, 0.8);
  const next = fadeUp(frame, fps, sec(8));

  return (
    <Backdrop>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: spacing.gap * 1.5,
        }}
      >
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: 96,
            color: colors.white,
          }}
        >
          Let&apos;s keep learning together.
        </div>
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: 64,
            color: colors.white,
            padding: "24px 64px",
            borderRadius: spacing.radius,
            backgroundColor: colors.brand,
            opacity: button.opacity,
            scale: `${button.scale}`,
          }}
        >
          Subscribe
        </div>
        {NEXT_TOPIC ? (
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 48,
              color: colors.muted,
              padding: "16px 40px",
              borderRadius: spacing.radius,
              border: `2px solid ${withAlpha(colors.muted, 0.4)}`,
              opacity: next.opacity,
              translate: `0 ${next.translateY}px`,
            }}
          >
            Next up: {NEXT_TOPIC}
          </div>
        ) : null}
      </AbsoluteFill>
    </Backdrop>
  );
};

export const Scene7Outro: React.FC = () => {
  return (
    <>
      <Sequence durationInFrames={SPLIT} name="Title">
        <TitleCard
          title="Dadarzz Engineering"
          subtitle="Learning Software, Computer, & AI Engineering"
        />
      </Sequence>
      <Sequence from={SPLIT} name="Subscribe">
        <Subscribe />
      </Sequence>
    </>
  );
};
