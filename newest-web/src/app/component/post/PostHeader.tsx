import React from "react";
import styles from "../../../styles/Post.module.css";

export const PostHeader = () => (
  <div className={styles.header}>
    <div>
      <h1 className={styles.headerTitle}>게시물 작성</h1>
      <p className={styles.headerSubtitle}>
        뉴스 또는 게시물을 작성하여 커뮤니티에 공유 하세요
      </p>
    </div>
  </div>
);

export default PostHeader;
