"use client";
import React, { Dispatch, SetStateAction } from "react";
import styles from "../../styles/BottomTabBar.module.css"; // CSS 모듈
import { Home, Flame, Plus, LayoutGrid, User } from "lucide-react";

interface BottomTabBarProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { icon: Home, label: "Home", id: "home" },
    { icon: Flame, label: "Hot", id: "hot" },
    { icon: Plus, label: "Create", id: "create", isCreate: true },
    { icon: LayoutGrid, label: "Grid", id: "grid" },
    { icon: User, label: "Profile", id: "profile" },
  ];

  return (
    <nav className={styles.nav}>
      {tabs.map(({ icon: Icon, label, id, isCreate }) => {
        // 버튼 기본 클래스
        let buttonClass = styles.btn;
        let iconClass = styles.iconDefault;
        let labelClass = styles.label;

        // Create 버튼이면 추가 스타일
        if (isCreate) {
          buttonClass += ` ${styles.btnCreate}`;
          iconClass = styles.iconCreate;
          labelClass = styles.labelHidden; // Create 버튼에서는 라벨 숨김
        }

        // 활성화된 탭이면 추가 스타일
        if (!isCreate && activeTab === id) {
          buttonClass += ` ${styles.btnActive}`;
        }

        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={buttonClass}
          >
            <Icon className={iconClass} />
            <span className={labelClass}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomTabBar;
