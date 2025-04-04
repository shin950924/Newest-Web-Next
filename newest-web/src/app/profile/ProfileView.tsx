"use client";
import Image from "next/image";
import NoImage from "../../assets/NoImage.webp";
import { postFollow } from "../service/userService";
import CustomText from "../component/common/CustomText";
import styles from "../../styles/ProfileView.module.css";
import React, { useState, useCallback, useMemo } from "react";
type ProfileViewProps = {
  bio: string;
  user_id: string;
  is_following: boolean;
  profile_picture?: string;
};

const ProfileViewComponent: React.FC<ProfileViewProps> = ({
  bio,
  user_id,
  is_following,
  profile_picture,
}) => {
  const [follow, setFollow] = useState(is_following);

  const toggleFollow = useCallback(() => {
    postFollow(user_id);
    setFollow((prev) => !prev);
  }, [user_id]);

  const imageSrc = useMemo(() => profile_picture || NoImage, [profile_picture]);

  const userTextStyle = useMemo(() => ({ fontSize: 17, fontWeight: 800 }), []);
  const bioTextStyle = useMemo(() => ({ marginTop: 8, color: "#4B5563" }), []);
  const buttonTextStyle = useMemo(() => ({ color: "#fff" }), []);

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.userImageWrapper}>
          <Image
            src={imageSrc}
            alt={`${user_id} profile picture`}
            width={96}
            height={96}
          />
        </div>
        <div className={styles.profileDetails}>
          <CustomText style={userTextStyle}>{user_id}</CustomText>
          <CustomText style={bioTextStyle}>
            {bio || "아직 소개 글이 없는 회원님이에요"}
          </CustomText>
          <button className={styles.followButton} onClick={toggleFollow}>
            <CustomText style={buttonTextStyle}>
              {follow ? "팔로잉 취소" : "팔로잉"}
            </CustomText>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileViewComponent);
