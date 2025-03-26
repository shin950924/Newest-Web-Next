import { PostFormFields } from "./PostFormFields";
import PostSubmitButton from "./PostSubmitButton";
import { PostTypeSelector } from "./PostTypeSelector";
import styles from "../../../styles/Post.module.css";
import { FormDataSet, PostType } from "../../../../types";
import React, { useState, useCallback, useEffect } from "react";

const PostScreen: React.FC = () => {
  const [postType, setPostType] = useState<PostType>("news");
  const [formData, setFormData] = useState<FormDataSet>({
    type: postType,
    title: "",
    images: [],
    description: "",
  });

  const handleFormChange = useCallback(
    (key: keyof FormDataSet, value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  useEffect(() => {
    setFormData({
      type: postType,
      title: "",
      images: [],
      description: "",
    });
  }, [postType]);

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.flex}>
          <div className={styles.scrollView}>
            <PostTypeSelector postType={postType} onTypeChange={setPostType} />
            <PostFormFields
              formData={formData}
              postType={postType}
              onFormChange={handleFormChange}
            />
            <PostSubmitButton form={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostScreen;
