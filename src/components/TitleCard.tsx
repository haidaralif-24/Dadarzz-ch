import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, spacing } from "../theme";
import { fonts } from "../fonts";
import { fadeUp, typedLength } from "./animate";

const DEFAULT_TAGLINE = "Learning Software, Computer, & AI Engineering";

type TitleCardProps = {
  delay?: number;
  wordmark?: string;
  // Rendered in brand orange straight after the wordmark. Omit for "Dadarzz" alone.
  secondary?: string;
  tagline?: string;
  size?: number;
  showMark?: boolean;
  align?: "center" | "left";
};

export const TitleCard: React.FC<TitleCardProps> = ({
  delay = 0,
  wordmark = "Dadarzz",
  secondary,
  tagline = DEFAULT_TAGLINE,
  size = 108,
  showMark = false,
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rise = fadeUp(frame, fps, delay, 26);
  const underline = interpolate(frame - delay - 12, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineDelay = delay + 30;
  const typed = typedLength(tagline, frame, fps, taglineDelay, 34);
  const taglineRise = fadeUp(frame, fps, taglineDelay - 4, 12);
  const caretOn = typed < tagline.length && Math.floor(Math.max(0, frame - delay) / 15) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: align === "center" ? "center" : "flex-start",
        padding: spacing.safe,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: align === "center" ? "center" : "flex-start",
          opacity: rise.opacity,
          transform: `translateY(${rise.translateY}px)`,
        }}
      >
        {showMark ? (
          <Img
            src={staticFile("brand/logo-mark.png")}
            style={{ width: size * 1.7, height: size * 1.7, marginBottom: 8 }}
          />
        ) : null}

        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: size,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: colors.white,
            whiteSpace: "nowrap",
          }}
        >
          {wordmark}
          {secondary ? (
            <span style={{ color: colors.brand }}> {secondary}</span>
          ) : null}
        </div>

        <div
          style={{
            marginTop: 22,
            width: size * 2.9,
            height: 6,
            borderRadius: 3,
            backgroundColor: colors.brand,
            transform: `scaleX(${underline})`,
            transformOrigin: align === "center" ? "center" : "left",
          }}
        />

        <div
          style={{
            marginTop: 30,
            fontFamily: fonts.mono,
            fontWeight: 400,
            fontSize: 30,
            letterSpacing: "0.06em",
            color: colors.muted,
            opacity: taglineRise.opacity,
            transform: `translateY(${taglineRise.translateY}px)`,
            whiteSpace: "nowrap",
          }}
        >
          <span>{tagline.slice(0, typed)}</span>
          {/* Keeps the line width stable while typing. */}
          <span style={{ color: "transparent" }}>{tagline.slice(typed)}</span>
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 26,
              marginLeft: 4,
              verticalAlign: "-3px",
              backgroundColor: colors.brand,
              opacity: caretOn ? 1 : 0,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
