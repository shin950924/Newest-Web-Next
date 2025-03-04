// components/Content.tsx
import React from "react";
import { ContentProps } from "@/types";
import styles from "../../styles/Content.module.css";

const Content: React.FC<ContentProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default Content;
