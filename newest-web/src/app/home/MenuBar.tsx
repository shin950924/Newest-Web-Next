// components/MenuBar.tsx
import React from "react";
import MenuItem from "./MenuItem";
import Heart from "@/assets/svg/Heart";
import { Feeds } from "../../../types";
import Person from "@/assets/svg/Person";
import Comment from "@/assets/svg/Comment";
import { formatNumberString } from "@/utils/common";
import styles from "../../styles/MenuBar.module.css";

interface MenuBarProps {
  data: Feeds;
}

const MenuBar: React.FC<MenuBarProps> = ({ data }) => {
  const handleLike = () => {
    window.alert("좋아요 기능은 앱에서 이용해 주세요.");
  };

  const handleComment = () => {
    window.alert("댓글 작성과 열람은 앱에서 이용해 주세요.");
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
