import React from "react";
import { Composition } from "remotion";
import { Video1 } from "./videos/video1/Video1";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Video1"
        component={Video1}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
