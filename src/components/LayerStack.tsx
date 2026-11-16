import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { withAlpha } from "../theme";
import { fonts } from "../fonts";
import { iconColor, IconLayer, LayerIcon } from "./LayerIcon";
import { slideIn } from "./animate";

export type StackLayer = IconLayer;

const DEFAULT_ORDER: StackLayer[] = ["ai", "software", "hardware"];

const DEFAULT_LABELS: Record<StackLayer, string> = {
  ai: "AI",
  software: "Software",
  hardware: "Hardware",
};

type LayerStackProps = {
  delay?: number;
  width?: number;
  rowHeight?: number;
  // Top to bottom. Default reads AI > Software > Hardware, the way they stack.
  order?: StackLayer[];
  labels?: Partial<Record<StackLayer, string>>;
  showIcons?: boolean;
  stagger?: number;
  gap?: number;
};

export const LayerStack: React.FC<LayerStackProps> = ({
  delay = 0,
  width = 600,
  rowHeight = 104,
  order = DEFAULT_ORDER,
  labels,
  showIcons = true,
  stagger = 12,
  gap = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap, width }}>
      {order.map((layer, i) => {
        const rowDelay = delay + i * stagger;
        const s = slideIn(frame, fps, rowDelay, -48);
        const color = iconColor[layer];
        const label = labels && labels[layer] ? labels[layer] : DEFAULT_LABELS[layer];

        return (
          <div
            key={layer}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              height: rowHeight,
              paddingLeft: 26,
              paddingRight: 26,
              borderRadius: 18,
              backgroundColor: withAlpha(color, 0.12),
              borderLeft: `6px solid ${color}`,
              opacity: s.opacity,
              transform: `translateX(${s.translateX}px)`,
            }}
          >
            {showIcons ? (
              <LayerIcon layer={layer} size={Math.round(rowHeight * 0.46)} animate={false} />
            ) : null}
            <span
              style={{
                fontFamily: fonts.mono,
                fontWeight: 500,
                fontSize: 28,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color,
              }}
            >
              {label}
            </span>
            <span
              style={{
                flex: 1,
                height: 1,
                backgroundColor: withAlpha(color, 0.25),
                marginLeft: 8,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
