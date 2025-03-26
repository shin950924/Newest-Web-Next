import React from "react";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import { HeaderProps } from "../../../types";
import styles from "../../styles/Header.module.css";
import GradientText from "../component/common/GradientText";

const font = localFont({
  src: [
    {
      path: "../../../public/fonts/outline.ttf",
      weight: "900",
      style: "bold",
    },
  ],
  variable: "--font-Outline",
});

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
        <GradientText>
          <div className={font.className}>Newest</div>
        </GradientText>
      </div>
    </div>
  );
};

export default Header;
