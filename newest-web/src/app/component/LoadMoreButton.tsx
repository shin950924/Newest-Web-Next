// src/components/LoadMoreButton.tsx
import React, { memo, CSSProperties } from "react";
import { LoadMoreButtonProps } from "@/types";
import styles from "../../styles/LoadMoreButton.module.css";

const LoadMoreButton: React.FC<LoadMoreButtonProps> = memo(
  ({ onPress, style }) => {
    return (
      <button className={styles.button} onClick={onPress} aria-label="더 보기">
        <span className={styles.text}>더 보기</span>
      </button>
    );
  }
);

export default LoadMoreButton;
