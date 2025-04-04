import React, { useMemo } from "react";
import Image from "next/image";
import { timeDiff } from "@/utils/common";
import NoImage from "../../assets/NoImage.webp";
import CustomText from "../component/common/CustomText";
import { ProfileCommentCardProps } from "../../../types";
import styles from "../../styles/ProfileCommentCard.module.css";

const ProfileCommentCard: React.FC<ProfileCommentCardProps> = React.memo(
  ({ time, name, badge, comment_content, commenter_profile_image }) => {
    const imageSource = useMemo(
      () => commenter_profile_image || NoImage,
      [commenter_profile_image]
    );

    const timeText = useMemo(() => timeDiff(time), [time]);

    return (
      <div className={styles.container}>
        <Image
          className={styles.profileImage}
          src={imageSource}
          alt="Profile"
          width={32}
          height={32}
        />
        <div className={styles.content}>
          <div className={styles.header}>
            <CustomText className={styles.username}>{name}</CustomText>
            <div className={styles.proBadge}>
              <CustomText
                className={styles.proText}
                style={{ color: "#1D4ED8" }}
              >
                {badge}
              </CustomText>
            </div>
            <CustomText className={styles.timeText}>{timeText}</CustomText>
          </div>
          <CustomText className={styles.commentText}>
            {comment_content}
          </CustomText>
        </div>
      </div>
    );
  }
);

ProfileCommentCard.displayName = "ProfileCommentCard";

export default ProfileCommentCard;
