
import React from "react";
import UserMeta from "./user-meta";

interface IProfileSidebarProps {
}

const ProfileSidebar: React.FC<IProfileSidebarProps> = ({
}) => {
    return (
        <div className="space-y-6">
            <UserMeta />
        </div>
    );
};

export default ProfileSidebar;
