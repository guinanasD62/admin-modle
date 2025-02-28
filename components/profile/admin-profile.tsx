"use client";
import React from "react";
import ProfileHeader from "./profile-header";
import ProfileSidebar from "./profile-sidebar";
import BasicDetails from "./basic-details";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";
import LayoutLoader from "../layout-loader";

const AdminProfile = () => {
  const { profile, isProfileLoading } = useAppSelector(
    (state: RootState) => state.profile
  );
  return (
    <>
      {isProfileLoading ? (
        <>
          <LayoutLoader />
        </>
      ) : (
        <React.Fragment>
          <ProfileHeader />
          <div className="grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-12 lg:col-span-4">
              <ProfileSidebar />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <BasicDetails />
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default AdminProfile;
