"use client";
import { useRouter } from "next/navigation";
import { RootState, Tab } from "../../../../types";
import { setIndex } from "@/redux/slice/tabsSlice";
import { useDispatch, useSelector } from "react-redux";
import TabButton from "@/app/component/common/TabButton";
import React, { memo, useMemo, useCallback } from "react";
import { Home, LayoutGrid, User, Hash } from "lucide-react";
import styles from "../../../styles/BottomTabBar.module.css";

const TABS: readonly Tab[] = [
  { icon: Home, label: "Home", id: "" },
  { icon: LayoutGrid, label: "Grid", id: "grid" }
];

const BottomTabBar = memo(() => {
  const router = useRouter();
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.tabs.tabIndex);

  const handleTabClick = useCallback(
    (tabId: string) => () => {
      router.push(`/${tabId}`);
      dispatch(setIndex(tabId));
    },
    [dispatch, router]
  );

  const tabsWithHandlers = useMemo(
    () =>
      TABS.map((tab) => ({
        key: tab.id,
        icon: tab.icon,
        label: tab.label,
        isActive: activeTab === tab.id,
        onClick: handleTabClick(tab.id),
      })),
    [activeTab, handleTabClick]
  );

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {tabsWithHandlers.map(({ key, ...otherProps }) => (
          <TabButton key={key} {...otherProps} />
        ))}
      </div>
    </nav>
  );
});

BottomTabBar.displayName = "BottomTabBar";

export default BottomTabBar;
