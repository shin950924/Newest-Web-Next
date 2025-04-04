// components/ProfileHeader.tsx
import React from "react";
import ProfileView from "./ProfileView";
import ProfileTitleBar from "./ProfileTitleBar";
import { ProfileTabViewProps } from "../../../types";

interface ProfileHeaderProps {
  data: ProfileTabViewProps | undefined;
  user_id: string;
  tabBarContent?: React.ReactNode;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  data,
  user_id,
  tabBarContent,
}) => {
  return (
    <div className="headerContainer">
      <ProfileTitleBar user_id={user_id} canGoBack={true} />
      <ProfileView
        user_id={user_id}
        bio={data?.bio || ""}
        profile_picture={data?.profile_picture}
        is_following={data?.is_following || false}
      />
      <div>{tabBarContent}</div>
    </div>
  );
};

export default React.memo(ProfileHeader);
