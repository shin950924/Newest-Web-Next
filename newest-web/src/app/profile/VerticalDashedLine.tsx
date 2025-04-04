import React from "react";
interface VerticalDashedLineProps {
  height?: number | string;
  width?: number | string;
  color?: string;
}

const VerticalDashedLine: React.FC<VerticalDashedLineProps> = ({
  height = 50,
  width = 3,
  color = "#6B7280",
}) => {
  return (
    <div style={{ height, width, borderLeft: `${width}px dashed ${color}` }} />
  );
};

export default VerticalDashedLine;
