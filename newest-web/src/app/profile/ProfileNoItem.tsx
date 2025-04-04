"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomText from "../component/common/CustomText";
import styles from "../../styles/ProfileNoItem.module.css";

interface ProfileNoItemProps {
  type: string;
}

const ProfileNoItem: React.FC<ProfileNoItemProps> = ({ type }) => {
  const router = useRouter();

  const config = useMemo(() => {
    const defaultConfig = {
      buttonText: "토론 시작하기",
      imageSrc: "/svg/ProfileCommentAsset.svg",
      mainText: "No discussions yet",
      subText: "Be the first one to start a discussion",
      onPress: () => {},
    };

    const mapping: Record<string, typeof defaultConfig> = {
      news: {
        buttonText: "이슈 등록하기",
        imageSrc: "/svg/ProfileNewsAsset.svg",
        mainText: "등록한 이슈가 없습니다",
        subText: "기사를 등록하고, 사용자와 공유해 보세요.",
        onPress: () => router.push("/PostScreen"),
      },
      post: {
        buttonText: "게시글 등록하기",
        imageSrc: "/svg/ProfilePostAsset.svg",
        mainText: "등록한 게시글이 없습니다",
        subText: "게시글을 등록하고, 사용자와 공유해 보세요.",
        onPress: () => router.push("/PostScreen"),
      },
      comment: {
        buttonText: "댓글 등록하기",
        imageSrc: "/svg/ProfileCommentAsset.svg",
        mainText: "등록한 댓글이 없습니다",
        subText: "댓글을 등록하고, 사용자와 공유해 보세요.",
        onPress: () => router.push("/(tabs)"),
      },
    };

    return mapping[type] || defaultConfig;
  }, [type, router]);

  const { buttonText, imageSrc, mainText, subText, onPress } = config;

  return (
    <div className={styles.container}>
      <Image src={imageSrc} alt="Logo" width={64} height={64} />
      <CustomText className={styles.mainText}>{mainText}</CustomText>
      <CustomText className={styles.subText}>{subText}</CustomText>
      <button
        className={styles.button}
        onClick={onPress}
        aria-label={buttonText}
      >
        <CustomText className={styles.buttonText} style={{ color: "#fff" }}>
          {buttonText}
        </CustomText>
      </button>
    </div>
  );
};

export default React.memo(ProfileNoItem);
