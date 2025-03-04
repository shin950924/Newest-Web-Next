"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import PublishedTag from "./PublishedTag";
import styles from "../../styles/Profile.module.css";
import ProfileClock from "@/assets/svg/ProfileClock";
import { extractDomain, timeDiff } from "@/utils/common";
import ProfileIncreaseArrow from "@/assets/svg/ProfileIncreaseArrow";

interface ProfileProps {
  item: any;
  image?: string;
}

const Profile: React.FC<ProfileProps> = ({ item, image }) => {
  const [hasError, setHasError] = useState(false);

  const getTag = () => {
    if (item.type === "news") {
      if (item.articles?.[0]?.source_names) {
        return item.articles[0].source_names;
      } else if (item.articles?.[0]?.links) {
        return extractDomain(item.articles[0].links) ?? "기사없음";
      }
    }
    return item.user_id;
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileInfo}>
        <div className={styles.profileImageContainer}>
          {image ? (
            <Image
              src={hasError ? Logo : image}
              alt="Profile"
              width={40}
              height={40}
              onError={() => setHasError(true)}
              style={{
                borderRadius: "50%",
                backgroundColor: "green",
              }}
            />
          ) : (
            <Image
              src={Logo}
              alt="Default Logo"
              width={40}
              height={40}
              style={{
                borderRadius: "50%",
                border: "1px solid #F3E8FF",
                backgroundColor: "#fff",
                objectFit: "contain",
              }}
            />
          )}
        </div>
        <div style={{ marginLeft: 8 }}>
          <div className={styles.infoRow}>
            <div className={styles.nameText}>
              {item.rss_title ?? item.title}
            </div>
            <ProfileIncreaseArrow />
            <PublishedTag tag={getTag()} />
          </div>
          <div className={styles.infoRow}>
            <ProfileClock />
            <div className={styles.infoText}>
              {timeDiff(item.created_at ?? new Date().toISOString())}
            </div>
            <div className={styles.separator}>•</div>
            <div className={styles.infoText}>{item.traffic || "10+"} 방문</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
