import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { fonts } from "../fonts";
import { colors, spacing, withAlpha } from "../theme";
import { fadeUp, popIn, typedLength } from "./animate";

// The channel logo lockup: pixel "D" mark, DARZ BITS wordmark, and the tagline
// typed in after a ">" prompt with a blinking block cursor.
// The mark is the real logo file, cropped to the "D" (never re-drawn).
type Props = {
  /** Height of the mark in px. The wordmark scales with it. */
  size?: number;
  /** Frame (inside the parent Sequence) when the lockup starts. */
  delay?: number;
  tagline?: string;
};

// The "D" occupies this box inside the 1600x1600 logo-mark.png.
const CROP = { x: 480, y: 320, w: 640, h: 960 };

export const BrandLockup: React.FC<Props> = ({
  size = 300,
  delay = 0,
  tagline = "Computing... one bit at a time",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = size / CROP.h;
  const mark = popIn(frame, fps, delay, 0.85);
  const word = fadeUp(frame, fps, delay + 6, 20);
  const typed = typedLength(tagline, frame, fps, delay + 22, 22);
  const cursorOn = Math.floor((frame - delay) / 15) % 2 === 0;
  const wordSize = size * 0.4;
  const tagSize = Math.max(48, size * 0.16);

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: spacing.gap * 1.5 }}
    >
      <div
        style={{
          width: CROP.w * k,
          height: size,
          position: "relative",
          overflow: "hidden",
          opacity: mark.opacity,
          scale: `${mark.scale}`,
          flexShrink: 0,
        }}
      >
        <Img
          src={staticFile("brand/logo-mark.png")}
          style={{
            position: "absolute",
            width: 1600 * k,
            height: 1600 * k,
            left: -CROP.x * k,
            top: -CROP.y * k,
            mixBlendMode: "lighten",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.gap / 2,
        }}
      >
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: wordSize,
            lineHeight: 1,
            letterSpacing: "0.04em",
            color: colors.white,
            whiteSpace: "nowrap",
            opacity: word.opacity,
            translate: `0 ${word.translateY}px`,
          }}
        >
          DARZ{" "}
          <span
            style={{
              color: colors.brand,
              textShadow: `0 0 ${wordSize * 0.35}px ${withAlpha(colors.brand, 0.5)}`,
            }}
          >
            BITS
          </span>
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: tagSize,
            color: colors.muted,
            whiteSpace: "pre",
            minHeight: tagSize * 1.2,
          }}
        >
          {frame >= delay + 22 ? "> " : ""}
          {tagline.slice(0, typed)}
          <span
            style={{
              display: "inline-block",
              width: tagSize * 0.5,
              height: tagSize * 0.85,
              marginLeft: tagSize * 0.15,
              verticalAlign: "text-bottom",
              backgroundColor: colors.brand,
              opacity: frame >= delay + 22 && cursorOn ? 1 : 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};
