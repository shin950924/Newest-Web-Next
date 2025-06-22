// components/MenuBar.tsx
import React from "react";
import MenuItem from "./MenuItem";
import Heart from "@/assets/svg/Heart";
import Person from "@/assets/svg/Person";
import { FeedItem } from "../../../types";
import Comment from "@/assets/svg/Comment";
import { formatNumberString } from "@/utils/common";
import styles from "../../styles/MenuBar.module.css";
interface MenuBarProps {
  data: FeedItem;
}

const MenuBar: React.FC<MenuBarProps> = ({ data }) => {
  const handleLike = () => {
    window.location.href = "https://bngjt.app.link/HvHwIruAoUb";
  };

  const handleComment = () => {
    window.location.href = "https://bngjt.app.link/HvHwIruAoUb";
  };
  return (
    <div className={styles.menuBar}>
      <MenuItem
        icon={<Heart />}
        count={data.like_count}
        label="좋아요"
        isCount={true}
        onPress={handleLike}
      />
      <MenuItem
        icon={<Comment />}
        count={data.comment_count}
        label="댓글"
        isCount={true}
        onPress={handleComment}
      />
      <MenuItem
        icon={<Person />}
        count={formatNumberString(data.traffic ?? "0")}
        label="트래픽"
        isCount={true}
        onPress={() => {}}
      />
    </div>
  );
};

export default MenuBar;
