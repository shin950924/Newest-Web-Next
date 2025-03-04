// components/MenuItem.tsx
import React from "react";
import { MenuItemProps } from "@/types";
import styles from "../../styles/MenuItem.module.css";

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  count,
  label,
  onPress,
  isCount,
}) => {
  return (
    <button className={styles.menuItem} onClick={onPress} aria-label={label}>
      {icon}
      {isCount && <span className={styles.countText}>{count}</span>}
    </button>
  );
};

export default MenuItem;
