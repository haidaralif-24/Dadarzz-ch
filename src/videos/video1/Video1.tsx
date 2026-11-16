import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Backdrop } from "../../components/Backdrop";
import { colors, sec, spacing, withAlpha } from "../../theme";
import { fonts } from "../../fonts";

// Video 1: Hardware, Software & AI. See docs/video1-script.md for the script
// and the scene-by-scene animation flow.
//
// The timeline below is the full 7:00 structure from the script. Every scene is
// still a placeholder: replace them one at a time with real scene components
// from src/videos/video1/, in order. Do not build the whole video in one pass.

type SceneSpec = {
  number: number;
  title: string;
  // Seconds, from the script.
  start: number;
  length: number;
};

const SCENES: SceneSpec[] = [
  { number: 1, title: "Hook", start: 0, length: 20 },
  { number: 2, title: "Intro", start: 20, length: 30 },
  { number: 3, title: "The three, in one sentence each", start: 50, length: 50 },
  { number: 4, title: "How they overlap", start: 100, length: 120 },
  { number: 5, title: "The proof: this video itself", start: 220, length: 110 },
  { number: 6, title: "Why learn all three", start: 330, length: 60 },
  { number: 7, title: "Outro", start: 390, length: 30 },
];

export const VIDEO1_DURATION = sec(420);

const timecode = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const ScenePlaceholder: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  return (
    <Backdrop>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: spacing.safe,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: "0.18em",
            color: colors.brand,
            marginBottom: 28,
          }}
        >
          {`SCENE ${scene.number} / 7`}
          <span style={{ color: withAlpha(colors.muted, 0.7) }}>
            {`   ${timecode(scene.start)}`}
          </span>
        </div>
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: 72,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: colors.white,
            textAlign: "center",
            maxWidth: 1300,
          }}
        >
          {scene.title}
        </div>
        <div
          style={{
            marginTop: 32,
            fontFamily: fonts.mono,
            fontSize: 26,
            letterSpacing: "0.1em",
            color: withAlpha(colors.muted, 0.65),
          }}
        >
          TODO: scene not built yet
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};

export const Video1: React.FC = () => {
  return (
    <>
      {SCENES.map((scene) => (
        <Sequence
          key={scene.number}
          from={sec(scene.start)}
          durationInFrames={sec(scene.length)}
          name={`Scene ${scene.number}: ${scene.title}`}
        >
          <ScenePlaceholder scene={scene} />
        </Sequence>
      ))}
    </>
  );
};
