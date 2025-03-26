import React, { memo } from "react";
import { LoadMoreButtonProps } from "../../../types";
import styles from "../../styles/LoadMoreButton.module.css";

const LoadMoreButton = memo(function LoadMoreButton({
  onPress,
  style,
}: LoadMoreButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onPress}
      style={style}
      aria-label="더 보기"
    >
      <span className={styles.text}>더 보기</span>
    </button>
  );
});

export default LoadMoreButton;
