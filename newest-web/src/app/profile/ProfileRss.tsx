import React, {
  FC,
  memo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Feeds } from "../../../types";
import Masonry from "react-masonry-css";
import ProfileNoItem from "./ProfileNoItem";
import { FeedGridItem } from "./FeedGridItem";
import { getProfileRss } from "../service/userService";
import styles from "../../styles/ProfileRss.module.css";

interface ProfileRssProps {
  userId: string;
}

const LIMIT = 10;

const ProfileRss: FC<ProfileRssProps> = memo(({ userId }) => {
  const [offset, setOffset] = useState(0);
  const [rssItems, setRssItems] = useState<Feeds[]>([]);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const breakpointColumnsObj = { default: 3 };

  const fetchRss = useCallback(async () => {
    try {
      const data = await getProfileRss(LIMIT, offset, userId);
      if (offset === 0) {
        setRssItems(data);
      } else {
        setRssItems((prev) => [...prev, ...data]);
      }
      setOffset((prev) => prev + LIMIT);
    } catch (error) {
      console.error("RSS 데이터 로딩 중 오류:", error);
    }
  }, [offset, userId]);

  const renderItem = useCallback(
    (item: Feeds, index: number) => (
      <FeedGridItem item={item} key={index.toString()} />
    ),
    []
  );

  useEffect(() => {
    setOffset(0);
    setRssItems([]);
    fetchRss();
  }, []);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        fetchRss();
      }
    };

    observer.current = new IntersectionObserver(handleIntersection);

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [fetchRss]);

  return (
    <div className={styles.profileRssContainer}>
      {rssItems.length > 0 ? (
        <div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.masonryGrid}
            columnClassName={styles.masonryGridcolumn}
          >
            {rssItems.map(renderItem)}
          </Masonry>
          {<div ref={sentinelRef} style={{ height: 20 }} />}
        </div>
      ) : (
        <ProfileNoItem type="news" />
      )}
    </div>
  );
});

ProfileRss.displayName = "ProfileRss";
export default ProfileRss;
