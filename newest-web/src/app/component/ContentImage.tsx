// components/ContentImage.tsx
import React, { useState } from "react";
import { ContentImageProps } from "@/types";
import NoImage from "../../assets/NoImage.png";
import styles from "../../styles/ContentImage.module.css";

const ContentImage: React.FC<ContentImageProps> = ({
  uri,
  width = 330,
  height = 320,
  borderRadius = 12,
}) => {
  const [hasError, setHasError] = useState(false);
  const imageSource = uri && !hasError ? uri : NoImage;

  return (
    <div className={styles.container}>
      <img
        src={imageSource}
        alt="Content"
        width={width}
        height={height}
        style={{
          borderRadius,
          objectFit: "cover",
        }}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default ContentImage;
