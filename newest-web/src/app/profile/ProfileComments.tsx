import React, { FC, useEffect, useState, useMemo } from "react";
import ProfileNoItem from "./ProfileNoItem";
import ProfileCommentItem from "./ProfileCommentItem";
import { getProfileComments } from "../service/userService";
import styles from "../../styles/ProfileComments.module.css";
import { ProfileCommentsType } from "../../../types";

interface ProfileCommentsProps {
  userId: string;
}

const ProfileComments: FC<ProfileCommentsProps> = ({ userId }) => {
  const [comments, setComments] = useState<ProfileCommentsType[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getProfileComments(10, 0, userId);
        setComments(data);
      } catch (error) {
        console.error("댓글 데이터를 가져오는 중 에러 발생:", error);
      }
    };

    fetchComments();
  }, [userId]);

  const renderedComments = useMemo(
    () =>
      comments.map((item, index) => (
        <ProfileCommentItem key={index.toString()} item={item} />
      )),
    [comments]
  );

  return (
    <div className={styles.listContainer}>
      {comments.length > 0 ? (
        renderedComments
      ) : (
        <ProfileNoItem type="comment" />
      )}
    </div>
  );
};

export default React.memo(ProfileComments);
