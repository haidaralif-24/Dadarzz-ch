import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { popIn, typedLength } from "../../components/animate";
import { fonts } from "../../fonts";
import { layerColors, spacing, withAlpha } from "../../theme";

// Calm phone screen for Scene 4: one code window whose lines type on, one at a
// time, then stay put. Driven only by the frame number.
type Props = {
  /** Frame (inside the scene) when the code window appears. */
  softwareAt: number;
};

const CODE = ["video = Scene()", "ai.write(video)", "device.play(video)"];
const CHARS_PER_SECOND = 14;

export const PhoneScreen: React.FC<Props> = ({ softwareAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = layerColors.software;
  const panel = popIn(frame, fps, softwareAt);
  const cursorOn = Math.floor(frame / 15) % 2 === 0;

  let start = softwareAt + 12;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "96px 20px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          borderRadius: spacing.radius / 2,
          border: `2px solid ${withAlpha(color, 0.7)}`,
          backgroundColor: withAlpha(color, 0.1),
          padding: 20,
          opacity: panel.opacity,
        }}
      >
        {CODE.map((line, i) => {
          const n = typedLength(line, frame, fps, start, CHARS_PER_SECOND);
          start += Math.ceil((line.length / CHARS_PER_SECOND) * fps) + 10;
          const typing = n > 0 && n < line.length;
          const lastDone = i === CODE.length - 1 && n === line.length;
          return (
            <div
              key={line}
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1.8,
                color,
                whiteSpace: "pre",
                minHeight: 43,
              }}
            >
              {line.slice(0, n)}
              {(typing || lastDone) && cursorOn ? "▌" : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};
