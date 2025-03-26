"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitButtonProps } from "../../../../types";
import styles from "../../../styles/PostSubmitButton.module.css";
import { handlePublish, handlePublishNews } from "@/app/service/postService";

const PostSubmitButton = ({ form }: SubmitButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (!form.title) {
        alert("제목을 입력해주세요");
        return;
      }
      if (form.type === "news") {
        await handlePublishNews(form);
      } else {
        await handlePublish(form);
      }
      router.replace("/");
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={onSubmit}
      className={`${styles.submitButton} ${loading ? styles.disabled : ""}`}
    >
      <span className={styles.buttonText}>
        {loading ? "등록 중..." : "등록하기"}
      </span>
    </button>
  );
};

export default PostSubmitButton;
