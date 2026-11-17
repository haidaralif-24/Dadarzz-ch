import React from "react";
import { AbsoluteFill } from "remotion";
import { colors } from "../theme";

// Every scene sits on this flat charcoal background. Wrap scene content in it so
// the background is defined in exactly one place. (The old-PC look is the
// optional <CrtScreen />, off by default; see `crt` in theme.ts.)
export const Backdrop: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      {children}
    </AbsoluteFill>
  );
};
