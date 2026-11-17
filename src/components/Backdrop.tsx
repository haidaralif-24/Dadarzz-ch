import React from "react";
import { AbsoluteFill } from "remotion";
import { fonts } from "../fonts";
import { colors, withAlpha } from "../theme";

// Every scene sits on this retro-terminal backdrop: charcoal with a dark
// vignette and dim binary strings in two corners (the same
// look as the channel banner). Wrap scene content in this so the background is
// defined in exactly one place. The CRT scanlines and dimming come from <CrtScreen />, which wraps the whole video.
// Everything here is static.
type Props = {
  children?: React.ReactNode;
  /** Turn off the binary strings, e.g. for a clean screenshot. */
  plain?: boolean;
};

const binary = {
  position: "absolute",
  fontFamily: fonts.mono,
  fontWeight: 500,
  fontSize: 40,
  letterSpacing: "0.3em",
  color: withAlpha(colors.brand, 0.1),
  whiteSpace: "nowrap",
} as const;

export const Backdrop: React.FC<Props> = ({ children, plain = false }) => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${colors.bg} 0%, ${colors.bg} 45%, ${colors.bgDeep} 100%)`,
      }}
    >
      {plain ? null : (
        <>
          <div style={{ ...binary, left: 48, top: 36 }}>
            01001000 01101001 10110010 01101101
          </div>
          <div style={{ ...binary, right: 48, bottom: 28 }}>
            11010010 00110101 01011100 10100110
          </div>
        </>
      )}
      {children}
    </AbsoluteFill>
  );
};
