import React, { memo } from "react";
import { MenuItemProps } from "../../../types";
import styles from "../../styles/MenuItem.module.css";

const MenuItem: React.FC<MenuItemProps> = memo(
  ({ icon, count, label, isCount, onPress }) => {
    return (
      <button className={styles.menuItem} onClick={onPress} aria-label={label}>
        {icon}
        {isCount && <span className={styles.countText}>{count}</span>}
      </button>
    );
  }
);

MenuItem.displayName = "MenuItem";

export default MenuItem;
