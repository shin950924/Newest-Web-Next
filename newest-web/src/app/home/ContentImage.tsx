import Image from "next/image";
import React, { useState, memo } from "react";
import NoImage from "../../assets/NoImage.webp";
import { ContentImageProps } from "../../../types";
import styles from "../../styles/ContentImage.module.css";

const ContentImageComponent: React.FC<ContentImageProps> = ({
  uri,
  width = 330,
  height = 320,
  borderRadius = 12,
}) => {
  const [hasError, setHasError] = useState(false);
  const imageSource: string = uri && !hasError ? uri : NoImage.src;

  return (
    <div
      className={styles.container}
      style={{
        borderRadius,
        overflow: "hidden",
        width,
        height,
      }}
    >
      <Image
        src={imageSource}
        alt="Content"
        width={width}
        height={height}
        style={{ objectFit: "cover" }}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

ContentImageComponent.displayName = "ContentImage";

export default memo(ContentImageComponent);
