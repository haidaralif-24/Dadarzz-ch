import React from "react";
import { Series } from "remotion";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Three } from "./Scene2Three";
import { Scene3Overlap } from "./Scene3Overlap";
import { Scene4Proof } from "./Scene4Proof";
import { Scene5Outro } from "./Scene5Outro";
import { SCENE_FRAMES } from "./timing";

// Main composition for Video 1: a 60-second explainer.
// Each scene is its own <Series.Sequence> so it can be edited and previewed
// separately. Script: docs/video1-script.md.
export const Video1: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={SCENE_FRAMES.hook} name="1 Hook">
        <Scene1Hook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES.three} name="2 The three">
        <Scene2Three />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES.overlap} name="3 Overlap">
        <Scene3Overlap />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES.proof} name="4 Proof">
        <Scene4Proof />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES.outro} name="5 Outro">
        <Scene5Outro />
      </Series.Sequence>
    </Series>
  );
};
