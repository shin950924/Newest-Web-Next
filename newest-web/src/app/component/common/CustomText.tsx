import React from "react";

interface CustomTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const CustomText: React.FC<CustomTextProps> = ({ children, style }) => {
  return <span style={{ ...style }}>{children}</span>;
};

export default CustomText;
