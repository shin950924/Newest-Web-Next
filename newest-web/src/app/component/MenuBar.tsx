// components/MenuBar.tsx
import MenuItem from "./MenuItem";
import Heart from "@/assets/svg/Heart";
import React, { useState } from "react";
import Person from "@/assets/svg/Person";
import Comment from "@/assets/svg/Comment";
import { formatNumberString } from "@/utils/common";
import styles from "../../styles/MenuBar.module.css";

interface MenuBarProps {
  data: any;
}

const MenuBar: React.FC<MenuBarProps> = ({ data }) => {
  const [item, setItem] = useState(data);

  return (
    <div className={styles.menuBar}>
      <MenuItem
        icon={<Heart />}
        count={item.like_count}
        label="좋아요"
        isCount={true}
      />
      <MenuItem
        icon={<Comment />}
        count={item.comment_count}
        label="댓글"
        isCount={true}
      />
      <MenuItem
        icon={<Person />}
        count={formatNumberString(item.traffic ?? "0")}
        label="트래픽"
        isCount={true}
      />
    </div>
  );
};

export default MenuBar;
