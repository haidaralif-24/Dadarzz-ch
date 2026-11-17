import React from "react";
import { AbsoluteFill } from "remotion";
import { colors } from "../theme";

// Every scene sits on the navy background. Wrap scene content in this so the
// background is defined in exactly one place.
export const Backdrop: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      {children}
    </AbsoluteFill>
  );
};
