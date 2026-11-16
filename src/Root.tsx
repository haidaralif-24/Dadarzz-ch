import { Composition } from "remotion";
import { video } from "./theme";
import { ComponentReel, REEL_DURATION } from "./videos/dev/ComponentReel";
import { Video1, VIDEO1_DURATION } from "./videos/video1/Video1";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Video1"
        component={Video1}
        durationInFrames={VIDEO1_DURATION}
        fps={video.fps}
        width={video.width}
        height={video.height}
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
