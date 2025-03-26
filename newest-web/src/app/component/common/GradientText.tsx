import React, { ReactNode } from "react";
import styles from "../../../styles/GradientText.module.css";

interface GradientTextProps {
  colors?: [string, string];
  fontWeight?: string;
  fontSize?: string;
  children: ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  colors = ["#2563EB", "#9333EA"],
  fontWeight = "900",
  fontSize = "23px",
  children,
  className = "",
}) => {
  return (
    <span
      className={`${styles.gradientText} ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
        fontWeight,
        fontSize,
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;
