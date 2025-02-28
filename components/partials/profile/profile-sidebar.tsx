import React from "react";
import UserMeta from "./user-meta";

interface IProfileSidebarProps {
  basicinformation?: any;
}

const ProfileSidebar: React.FC<IProfileSidebarProps> = ({
  basicinformation,
}) => {
  return (
    <div className="space-y-6">
      <UserMeta basicinformation={basicinformation} />
    </div>
  );
};

export default ProfileSidebar;
