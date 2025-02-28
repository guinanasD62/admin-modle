"use client";
import React, { useEffect, useState } from "react";
import { ProfileSidebar } from "../partials/profile";

import ProfileTabs from "../partials/profile/profile.tabs";
import {
  fetchAdminBasicDetailsById,
  fetchConsumerBasicDetailsById,
  fetchFinancierBasicDetailsById,
  fetchSellerBasicDetailsById,
} from "@/service/user.service";
import { useParams, usePathname } from "next/navigation";
import {
  admintabs,
  consumertabs,
  financiertabs,
  sellertabs,
} from "@/utils/profile-tabs";

interface UserProfileLayoutProps {
  children: React.ReactNode;
}

const UserProfileLayout: React.FC<UserProfileLayoutProps> = ({ children }) => {
  const [basicinformation, setBasicInformation] = useState<any>(null);
  const [tabs, setTabs] =
    useState<{ label: string; value: string }[]>(admintabs); // Set default tabs
  const pathname = usePathname();
  const { id } = useParams();

  // Generic function to fetch basic details based on user type
  const fetchBasicDetails = async (userType: string, id: any) => {
    try {
      let response;
      switch (userType) {
        case "seller":
          setTabs(sellertabs);
          response = await fetchSellerBasicDetailsById(id);
          break;
        case "admin":
          setTabs(admintabs);
          response = await fetchAdminBasicDetailsById(id);
          break;
        case "financier":
          setTabs(financiertabs);
          response = await fetchFinancierBasicDetailsById(id);
          break;
        default:
          setTabs(consumertabs);
          response = await fetchConsumerBasicDetailsById(id);
          break;
      }
      const data = response?.data;
      setBasicInformation(data);
    } catch (error) {
      console.error("Error fetching basic details:", error);
    }
  };

  useEffect(() => {
    if (!basicinformation) {
      const userType = pathname.split("/")[2];
      fetchBasicDetails(userType, id);
    }
  }, [pathname, id]);

  return (
    <React.Fragment>
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 lg:col-span-4">
          <ProfileSidebar basicinformation={basicinformation} />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <ProfileTabs tabs={tabs}>{children}</ProfileTabs>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfileLayout;
