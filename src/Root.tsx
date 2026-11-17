import React from "react";
import { Composition } from "remotion";
import { video } from "./theme";
import { ComponentReel, REEL_DURATION } from "./videos/dev/ComponentReel";
import { Video1 } from "./videos/video1/Video1";
import { SCENE_FRAMES } from "./videos/video1/timing";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Video1"
        component={Video1}
        durationInFrames={SCENE_FRAMES.hook}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Dev tool: every shared component on one timeline. Not uploaded. */}
      <Composition
        id="ComponentReel"
        component={ComponentReel}
        durationInFrames={REEL_DURATION}
        fps={video.fps}
        width={video.width}
        height={video.height}
      />
    </>
  );
};
