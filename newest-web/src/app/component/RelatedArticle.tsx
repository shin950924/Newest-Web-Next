"use client";

import React, { useState, useCallback, memo } from "react";
import DownArrow from "@/assets/svg/DownArrow";
import styles from "../../styles/RelatedArticle.module.css";
import LoadMoreButton from "./LoadMoreButton";
import RelatedArticleItem from "./RelatedArticleItem";

interface RelatedArticleProps {
  articles: any[];
  time: string;
}

const RelatedArticle: React.FC<RelatedArticleProps> = memo(
  ({ articles, time }) => {
    const [visibleCount, setVisibleCount] = useState<number>(3);
    const increment = 3;

    const handleLoadMore = useCallback(() => {
      setVisibleCount((prevCount) => prevCount + increment);
    }, []);

    const visibleArticles = articles?.slice(0, visibleCount);
    const allArticlesVisible = visibleCount >= (articles?.length || 0);

    return (
      <div className={styles.relatedArticle}>
        <div className={styles.header}>
          <div className={styles.headerText}>관련 기사</div>
          <DownArrow />
        </div>
        <div className={styles.articlesContainer}>
          {visibleArticles?.map((item, index) => (
            <RelatedArticleItem
              item={item}
              time={time}
              key={index.toString()}
            />
          ))}
          {!allArticlesVisible && <LoadMoreButton onPress={handleLoadMore} />}
        </div>
        <div className={styles.bottomSpacer} />
      </div>
    );
  }
);

export default RelatedArticle;
