import Image from "next/image";
import React, { memo } from "react";
import { Feeds } from "../../../types";
import PublishedTag from "./PublishedTag";
import Logo from "../../assets/Logo.png";
import ProfileClock from "@/assets/svg/ProfileClock";
import styles from "../../styles/Profile.module.css";
import { extractDomain, timeDiff } from "@/utils/common";
import ProfileIncreaseArrow from "@/assets/svg/ProfileIncreaseArrow";

interface ProfileProps {
  item: Feeds;
  image?: string;
}

const Profile: React.FC<ProfileProps> = ({ item, image }) => {
  const tag =
    item.type === "news"
      ? item.articles?.[0]?.source_names ||
        extractDomain(item.articles?.[0]?.links) ||
        "기사없음"
      : item.user_id;

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
            style={{
              borderRadius: "50%",
              backgroundColor: image ? "green" : "#fff",
              border: image ? undefined : "1px solid #F3E8FF",
              objectFit: image ? undefined : "contain",
            }}
          />
        </div>
        <div style={{ marginLeft: 8 }}>
          <div className={styles.infoRow}>
            <div className={styles.nameText}>
              {item.rss_title || item.title}
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
