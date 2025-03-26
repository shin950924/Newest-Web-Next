import React from "react";
import styles from "../../../styles/Post.module.css";
import { PostTypeSelectorProps } from "../../../../types";
import { Newspaper, Type } from "lucide-react";

export const PostTypeSelector = ({
  postType,
  onTypeChange,
}: PostTypeSelectorProps) => {
  const renderIcon = (type: "news" | "post") => {
    switch (type) {
      case "post":
        return postType === type ? (
          <Newspaper size={20} strokeWidth={1.5} color="#1D4ED8" />
        ) : (
          <Newspaper size={20} strokeWidth={2} color="#000" />
        );
      case "news":
        return postType === type ? (
          <Type size={20} strokeWidth={1.5} color="#1D4ED8" />
        ) : (
          <Type size={20} strokeWidth={2} color="#000" />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.typeSelector}>
      {(["news", "post"] as const).map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`${styles.typeButton} ${
            postType === type ? styles.typeButtonActive : ""
          }`}
        >
          {renderIcon(type)}
          <span
            className={`${styles.typeButtonText} ${
              postType === type ? styles.typeButtonTextActive : ""
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </button>
      ))}
    </div>
  );
};
