// components/PublishedTag.tsx
import React from "react";
import styles from "../../styles/PublishedTag.module.css";

interface PublishedTagProps {
  tag?: string | null;
}

const PublishedTag: React.FC<PublishedTagProps> = ({ tag }) => {
  return (
    <div className={styles.container} title={tag || ""}>
      <span className={styles.text}>{tag}</span>
    </div>
  );
};

export default PublishedTag;
