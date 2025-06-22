"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { GridItemProps } from "../../../types";
import NoImage from "../../assets/NoImage.webp";
import styles from "../../styles/GridItem.module.css";
import React, { memo, useState, useEffect, useCallback, useMemo } from "react";

const DEFAULT_HEIGHT = 150;
const aspectRatioCache = new Map<string, number>();

const GridItem: React.FC<GridItemProps> = memo(
  ({ data, source, isTextOverlay = false }) => {
    const router = useRouter();
    const imgSrc = source || NoImage;
    const [ratio, setRatio] = useState(1);
    const [imageLoaded, setImageLoaded] = useState(false);

    const aspectRatioValue = useMemo(
      () => (source ? aspectRatioCache.get(source) ?? ratio : 1),
      [source, ratio]
    );

    const overlayText = useMemo(() => {
      const content = data.type === "post" ? data.description : data.rss_title;
      return `#${content || ""}`;
    }, [data.type, data.description, data.rss_title]);

    useEffect(() => {
      if (!source) return;
      if (!aspectRatioCache.has(source)) {
        const tempImg = new window.Image();
        tempImg.onload = () => {
          const calculatedRatio = tempImg.width / tempImg.height;
          aspectRatioCache.set(source, calculatedRatio);
          setRatio(calculatedRatio);
        };
        tempImg.src = source;
      }
    }, [source]);

    const handlePress = useCallback(() => {
      router.push("/singleFeed/" + data.entry_id);
    }, [data, router]);

    const imageContainerStyle: React.CSSProperties = useMemo(
      () => ({
        height:
          !source || !aspectRatioCache.has(source) ? DEFAULT_HEIGHT : "auto",
        aspectRatio: aspectRatioValue,
        position: "relative",
      }),
      [source, aspectRatioValue]
    );

    return (
      <div className={styles.itemContainer} onClick={handlePress}>
        <div className={styles.imageContainer} style={imageContainerStyle}>
          <div
            className={`${styles.imageWrapper} ${
              imageLoaded ? styles.imageLoaded : styles.imageLoading
            }`}
          >
            <Image
              src={imgSrc}
              alt={overlayText}
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
              quality={80}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
        {isTextOverlay && (
          <div className={styles.textOverlay}>
            <div className={styles.textStroke}>
              <div className={styles.text}>{overlayText}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

GridItem.displayName = "GridItem";
export default GridItem;
