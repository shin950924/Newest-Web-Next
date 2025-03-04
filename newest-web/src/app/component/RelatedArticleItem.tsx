"use client";

import React from "react";
import PublishedTag from "./PublishedTag";
import { extractDomain } from "@/utils/common";
import RightArrowIcon from "@/assets/svg/RightArrowIcon";
import styles from "../../styles/RelatedArticleItem.module.css";

interface RelatedArticleItemProps {
  item: {
    titles: string;
    links: string;
    source_names?: string;
  };
  time: string;
}

const RelatedArticleItem: React.FC<RelatedArticleItemProps> = ({
  item,
  time,
}) => {
  const handleClick = () => {
    if (!item.links) return;
    window.open(item.links, "_blank");
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.row}>
        <span className={styles.title}>{item.titles}</span>
        <RightArrowIcon />
      </div>
      <div className={styles.row}>
        <span className={styles.subtitle}>Published by</span>
        <PublishedTag
          tag={
            item.source_names ? item.source_names : extractDomain(item.links)
          }
        />
      </div>
    </div>
  );
};

export default RelatedArticleItem;
