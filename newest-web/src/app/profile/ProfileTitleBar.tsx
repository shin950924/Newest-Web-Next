// components/ProfileTitleBar.tsx
import React, { useCallback } from "react";
import CustomText from "../component/common/CustomText";
import { useRouter } from "next/navigation";
// import Setting from "@/assets/svg/Setting";
// import LeftArrow from "@/assets/svg/LeftArrow";

type ProfileTitleBarProps = {
  user_id: string;
  canGoBack?: boolean;
};

const ProfileTitleBar: React.FC<ProfileTitleBarProps> = ({
  user_id,
  canGoBack,
}) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSettings = useCallback(() => {
    router.push("/setting");
  }, [router]);

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <div style={styles.leftPlaceholder}>
          {canGoBack && (
            <button onClick={handleBack} style={styles.button}>
              {/* <LeftArrow /> */}
            </button>
          )}
        </div>
        <CustomText style={styles.title}>{user_id}</CustomText>
        <button onClick={handleSettings} style={styles.button}>
          {/* <Setting /> */}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "53px",
    borderBottom: "1px solid #E5E7EB",
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  leftPlaceholder: {
    width: "24px",
  },
  title: {
    fontSize: "16px",
    lineHeight: "28px",
    fontWeight: 700,
  },
  button: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
};

export default React.memo(ProfileTitleBar);
