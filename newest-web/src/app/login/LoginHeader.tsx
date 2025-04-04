import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/LoginHeader.module.css";
// import LeftArrow from "@/assets/svg/LeftArrow";

const LoginHeader: React.FC = () => {
  const router = useRouter();

  const handlePress = () => {
    router.back(); // 이전 페이지로 돌아가기
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <button
          onClick={handlePress}
          aria-label="뒤로가기"
          className={styles.button}
        >
          {/* <LeftArrow /> */}
        </button>
        <div className={styles.placeholder} />
        <div className={styles.placeholder} />
      </div>
    </div>
  );
};

export default React.memo(LoginHeader);
