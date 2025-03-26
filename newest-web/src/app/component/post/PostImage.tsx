import React from "react";
import Image from "next/image";
import styles from "../../../styles/Post.module.css";

interface PostImageProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export const PostImage = ({ images, onImagesChange }: PostImageProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const newImageUrls = fileArray.map((file) => URL.createObjectURL(file));
      onImagesChange([...images, ...newImageUrls]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

  return (
    <div className={styles.imageUploadContainer}>
      <div className={styles.imageGrid}>
        {images.map((src, index) => (
          <div key={index} className={styles.imagePreview}>
            <Image src={src} alt="uploaded" width={100} height={100} />
            <button
              onClick={() => removeImage(index)}
              className={styles.removeImageBtn}
            >
              ✕
            </button>
          </div>
        ))}
        {images.length < 5 && (
          <label className={styles.uploadImageLabel}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className={styles.fileInput}
            />
            <div className={styles.uploadImagePlaceholder}>+</div>
          </label>
        )}
      </div>
    </div>
  );
};
