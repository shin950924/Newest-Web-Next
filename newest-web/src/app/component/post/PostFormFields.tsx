import React from "react";
import { PostImage } from "./PostImage";
import styles from "@/styles/Post.module.css";
import { FormFieldsProps } from "../../../../types";

export const PostFormFields = ({
  formData,
  postType,
  onFormChange,
}: FormFieldsProps) => (
  <div>
    <div className={styles.formFields}>
      <label className={styles.label}>제목</label>
      <input
        className={styles.input}
        value={formData.title}
        onChange={(e) => onFormChange("title", e.target.value)}
        maxLength={100}
        placeholder="제목을 입력 하세요"
      />
    </div>

    {postType === "post" && (
      <div className={styles.formFields}>
        <label className={styles.label}>이미지</label>
        <PostImage
          images={formData.images}
          onImagesChange={(images) => onFormChange("images", images)}
        />
      </div>
    )}
    {postType === "post" && (
      <div className={styles.formFields}>
        <label className={styles.label}>내용</label>
        <textarea
          placeholder="내용을 입력 하세요"
          className={`${styles.input} ${styles.textArea}`}
          value={formData.description}
          onChange={(e) => onFormChange("description", e.target.value)}
          maxLength={1000}
        />
      </div>
    )}
  </div>
);
