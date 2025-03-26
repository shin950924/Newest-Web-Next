// components/LoadingIndicator.tsx
import React from "react";
import styles from "../../../styles/LoadingIndicator.module.css";

const LoadingIndicator: React.FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingIndicator;
