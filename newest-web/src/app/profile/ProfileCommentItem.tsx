import Image from "next/image";
import React, { FC, useMemo } from "react";
import NoImage from "../../assets/NoImage.webp";
import VerticalDashedLine from "./VerticalDashedLine";
import ProfileCommentCard from "./ProfileCommentCard";
import CustomText from "../component/common/CustomText";
import { formatISODateToLongDate } from "@/utils/common";
import styles from "../../styles/ProfileCommentItem.module.css";
import { ProfileCommentItemProps } from "../../../types";

const ProfileCommentItem: FC<ProfileCommentItemProps> = ({ item }) => {
  const {
    type,
    title,
    articles,
    rss_title,
    media_urls,
    created_at,
    like_count,
    description,
    comment_count,
  } = item.entry;

  const shareCount = 0;
  const date = created_at;
  const heartCount = like_count || 0;
  const commentCount = comment_count || 0;

  const displayTitle = useMemo(
    () => (type === "post" ? title : rss_title),
    [type, title, rss_title]
  );

  const imageUri = useMemo(() => {
    if (type === "post") {
      return media_urls?.[0] || null;
    }
    if (articles && articles.length > 0) {
      return articles[0].images;
    }
    return null;
  }, [type, media_urls, articles]);

  const formattedDate = useMemo(() => formatISODateToLongDate(date), [date]);

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.itemContainer}>
        <div className={styles.contentContainer}>
          {imageUri ? (
            <Image
              src={imageUri}
              alt="Item Image"
              className={styles.image}
              width={160}
              height={100}
              style={{ borderRadius: 6, objectFit: "cover" }}
            />
          ) : (
            <Image
              src={NoImage}
              alt="Gradient Logo"
              className={styles.image}
              width={160}
              height={100}
              style={{ borderRadius: 6, objectFit: "cover" }}
            />
          )}
          <div className={styles.textContainer}>
            <CustomText className={styles.title}>{displayTitle}</CustomText>
            <CustomText className={styles.description}>
              {description}
            </CustomText>
            <CustomText className={styles.date}>{formattedDate}</CustomText>
          </div>
        </div>
      </div>
      <div className={styles.actionsContainer}>
        <div className={styles.action}>
          <Image
            src={"/svg/CommentsHeart.svg"}
            alt="Logo"
            width={24}
            height={24}
          />
          <CustomText className={styles.actionText}>{heartCount}</CustomText>
        </div>
        <button className={styles.action}>
          <Image
            src={"/svg/CommentsComment.svg"}
            alt="Logo"
            width={24}
            height={24}
          />
          <CustomText className={styles.actionText}>{commentCount}</CustomText>
        </button>
        <div className={styles.action}>
          <Image
            src={"/svg/CommentsShare.svg"}
            alt="Logo"
            width={24}
            height={24}
          />
          <CustomText className={styles.actionText}>{shareCount}</CustomText>
        </div>
      </div>
      <div style={{ marginLeft: 21 }}>
        <VerticalDashedLine />
      </div>
      <ProfileCommentCard
        badge={type}
        time={item.comment_date}
        name={item.commenter_name}
        comment_content={item.comment_content}
        commenter_profile_image={item.commenter_profile_image}
      />
    </div>
  );
};

export default React.memo(ProfileCommentItem);
