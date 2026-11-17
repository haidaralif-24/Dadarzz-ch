import React from "react";
import { Series } from "remotion";
import { Scene1Hook } from "./Scene1Hook";
import { SCENE_FRAMES } from "./timing";

// Main composition for Video 1. Scenes are added one at a time from
// docs/video1-script.md; each is its own <Series.Sequence> so it can be
// edited and previewed separately.
export const Video1: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={SCENE_FRAMES.hook} name="1 Hook">
        <Scene1Hook />
      </Series.Sequence>
    </Series>
  );
};
