"use client";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProfileRss from "./ProfileRss";
import Tabs from "@mui/material/Tabs";
import ProfilePost from "./ProfilePost";
import { useRouter } from "next/navigation";
import ProfileHeader from "./ProfileHeader";
import { useSession } from "next-auth/react";
import ProfileComments from "./ProfileComments";
import { getProfile } from "../service/userService";
import { ProfileTabViewProps } from "../../../types";
import styles from "../../styles/ProfilePage.module.css";
import BottomTabBar from "../component/common/BottomTabBar";
import React, { useState, useEffect, useCallback, memo } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = memo(({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={styles.tabPanelContent}>{children}</Box>
      )}
    </div>
  );
});

TabPanel.displayName = "TabPanel";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<ProfileTabViewProps>();

  const fetchUserProfile = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const data = await getProfile(id);
      setProfileData(data);
    } catch (error) {
      console.error("프로필 데이터를 가져오는 중 에러 발생:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const id = session?.user?.id;
        if (!session && status != "loading") {
          router.push("/login");
          return;
        }

        if (id) {
          setUserId(id);
          fetchUserProfile(id);
        } else {
          setUserId("Newest");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router, session, status, fetchUserProfile]);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setTabIndex(newValue);
    },
    []
  );

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.profilePage}>
        <ProfileHeader data={profileData} user_id={userId || "Newest"} />
        <div className={styles.tabPage}>
          <Box className={styles.tabsWrapper}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              variant="fullWidth"
              className={styles.tabsContainer}
            >
              <Tab label="게시글" />
              <Tab label="댓글" />
              <Tab label="뉴스" />
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
              {tabIndex === 0 && <ProfilePost userId={userId || "Newest"} />}
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              {tabIndex === 1 && (
                <ProfileComments userId={userId || "Newest"} />
              )}
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
              {tabIndex === 2 && <ProfileRss userId={userId || "Newest"} />}
            </TabPanel>
          </Box>
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default ProfilePage;
