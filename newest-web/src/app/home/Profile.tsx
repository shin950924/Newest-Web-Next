import Image from "next/image";
import React, { memo } from "react";
import Logo from "../../assets/Logo.png";
import PublishedTag from "./PublishedTag";
import { FeedItem } from "../../../types";
import ProfileClock from "@/assets/svg/ProfileClock";
import styles from "../../styles/Profile.module.css";
import { extractDomain, timeDiff } from "@/utils/common";
import ProfileIncreaseArrow from "@/assets/svg/ProfileIncreaseArrow";

interface ProfileProps {
  item: FeedItem;
  image?: string | undefined | null;
}

const Profile: React.FC<ProfileProps> = ({ item, image }) => {
  const tag =
    item.type === "news"
      ? item.articles?.[0]?.source_names ||
        extractDomain(item.articles?.[0]?.links) ||
        "기사없음"
      : item.rss_title;

  const createdAt = item.created_at || new Date().toISOString();

  return (
    <div className={styles.profile}>
      <div className={styles.profileInfo}>
        <div className={styles.profileImageContainer}>
          <Image
            src={image || Logo}
            alt="Profile"
            width={40}
            height={40}
            className={
              image ? styles.profileImageWithBg : styles.profileImageDefault
            }
          />
        </div>
        <div style={{ marginLeft: 8 }}>
          <div className={styles.infoRow}>
            <div className={styles.nameText}>
              {item.rss_title || item.rss_title}
            </div>
            <ProfileIncreaseArrow />
            <PublishedTag tag={tag} />
          </div>
          <div className={styles.infoRow}>
            <ProfileClock />
            <div className={styles.infoText}>{timeDiff(createdAt)}</div>
            <div className={styles.separator}>•</div>
            <div className={styles.infoText}>{item.traffic || "10+"} 방문</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Profile);
