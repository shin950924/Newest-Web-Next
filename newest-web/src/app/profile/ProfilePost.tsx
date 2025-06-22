"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Feeds } from "../../../types";
import { useRouter } from "next/navigation";
import ProfileNoItem from "./ProfileNoItem";
import { useWindowSize } from "../hooks/useWindowSize";
import { getProfilePost } from "../service/userService";
import styles from "../../styles/ProfilePost.module.css";

interface ProfilePostProps {
  userId: string;
}

interface ProfilePostItemProps {
  item: Feeds;
  imageSize: number;
  onPress: (item: Feeds) => void;
}

const ProfilePostItemComponent: React.FC<ProfilePostItemProps> = ({
  item,
  imageSize,
  onPress,
}) => {
  const firstImageUri = item.media_urls?.[0] || "/images/001.png";
  return (
    <div className={styles.imageWrapper} onClick={() => onPress(item)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          alt=""
          width={imageSize}
          height={imageSize}
          src={firstImageUri}
          style={{ objectFit: "cover" }}
        />
      </motion.div>
    </div>
  );
};

const ProfilePostItem = React.memo(ProfilePostItemComponent);

const ProfilePost: React.FC<ProfilePostProps> = ({ userId }) => {
  const router = useRouter();
  const windowSize = useWindowSize();
  const [data, setData] = useState<Feeds[]>([]);

  const width = useMemo(
    () => Math.min(windowSize.width, 940) - 26,
    [windowSize.width]
  );
  const imageSize = useMemo(() => width / 3, [width]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getProfilePost(10, 0, userId);
      setData(response);
    } catch (error) {
      console.error("Error fetching profile posts:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePress = useCallback(
    (item: Feeds) => {
      console.log(item);
      router.push("/singleFeed/" + item.entry_id);
    },
    [router]
  );

  const renderedPosts = useMemo(
    () =>
      data.map((item, index) => (
        <ProfilePostItem
          item={item}
          key={index.toString()}
          imageSize={imageSize}
          onPress={handlePress}
        />
      )),
    [data, imageSize, handlePress]
  );

  return (
    <div className={styles.container}>
      {data.length > 0 ? (
        <div className={styles.grid}>{renderedPosts}</div>
      ) : (
        <ProfileNoItem type="news" />
      )}
    </div>
  );
};

export default ProfilePost;
