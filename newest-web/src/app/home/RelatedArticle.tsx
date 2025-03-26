"use client";
import { Article } from "../../../types";
import LoadMoreButton from "./LoadMoreButton";
import DownArrow from "@/assets/svg/DownArrow";
import RelatedArticleItem from "./RelatedArticleItem";
import styles from "../../styles/RelatedArticle.module.css";
import React, { useState, useCallback, useMemo, memo } from "react";
interface RelatedArticleProps {
  articles: Article[] | undefined;
  time: string;
}

const RelatedArticle: React.FC<RelatedArticleProps> = memo(
  ({ articles, time }) => {
    const increment = 3;
    const [visibleCount, setVisibleCount] = useState<number>(3);

    const handleLoadMore = useCallback(() => {
      setVisibleCount((prevCount) => prevCount + increment);
    }, []);

    const visibleArticles = useMemo(
      () => articles?.slice(0, visibleCount),
      [articles, visibleCount]
    );

    const allArticlesVisible = useMemo(
      () => visibleCount >= (articles?.length || 0),
      [articles, visibleCount]
    );

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

RelatedArticle.displayName = "RelatedArticle";

export default RelatedArticle;
