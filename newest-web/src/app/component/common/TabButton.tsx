import React, { memo } from "react";
import { LucideIcon, LucideProps } from "lucide-react";
import styles from "../../../styles/BottomTabBar.module.css";

interface TabButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const buttonClassesCache = new Map<string, string>();

const getButtonClasses = (isActive: boolean): string => {
  const cacheKey = `${isActive}`;

  if (buttonClassesCache.has(cacheKey)) {
    return buttonClassesCache.get(cacheKey)!;
  }

  let classes = styles.btn;
  if (isActive) {
    classes += ` ${styles.btnActive}`;
  }

  buttonClassesCache.set(cacheKey, classes);
  return classes;
};

const TabButton = memo(
  ({ icon: Icon, label, isActive, onClick }: TabButtonProps) => {
    const buttonClasses = getButtonClasses(isActive);
    const labelClass = styles.label;
    const iconClass = styles.iconDefault;

    const IconComponent = Icon as React.ComponentType<LucideProps>;

    return (
      <div onClick={onClick} className={buttonClasses}>
        <IconComponent className={iconClass} />
        <span className={labelClass}>{label}</span>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isActive === nextProps.isActive &&
      prevProps.icon === nextProps.icon &&
      prevProps.label === nextProps.label
    );
  }
);

TabButton.displayName = "TabButton";

export default TabButton;
