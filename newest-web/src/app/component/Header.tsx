"use client";

import React from "react";
import { HeaderProps } from "@/types";
import styles from "../../styles/Header.module.css";
import { useRouter } from "next/navigation";

const Header: React.FC<HeaderProps> = ({ leftArrow = false }) => {
  const router = useRouter();

  const handlePress = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        {leftArrow && (
          <button
            onClick={handlePress}
            className={styles.leftArrowButton}
            aria-label="뒤로가기"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
