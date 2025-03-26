import React from "react";
import styles from "./TextStroke.module.css";

interface TextStrokeProps {
  children: React.ReactNode;
  stroke?: number;
  color?: string;
  className?: string;
}

export const TextStroke: React.FC<TextStrokeProps> = ({
  children,
  stroke = 1,
  color = "#fff",
  className,
}) => {
  const cssVariables = {
    "--stroke-size": `${stroke}px`,
    "--stroke-color": color,
  } as React.CSSProperties;

  const combinedClassName = className
    ? `${styles.textStroke} ${className}`
    : styles.textStroke;

  return (
    <div className={combinedClassName} style={cssVariables}>
      {children}
    </div>
  );
};

export default TextStroke;
