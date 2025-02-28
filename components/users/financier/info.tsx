"use client";
import LayoutLoader from "@/components/layout-loader";
import { ProfileSidebar } from "@/components/partials/profile";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  fetchFinancierBasicDetailsById,
} from "@/service/user.service";
import { financiertabs, sellertabs } from "@/utils/profile-tabs";
import { Icon } from "@iconify/react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Info = () => {
  const [tabs, setTabs] =
    useState<{ label: string; value: string }[]>(financiertabs);
  const [businessDetails, setBusinessDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const { id } = useParams();
  // Generic function to fetch basic details based on user type
  const fetchBusinessDetails = async (id: any) => {
    setLoading(true);
    try {
      let response = await fetchFinancierBasicDetailsById(id);
      const data = response?.data;
      setBusinessDetails(data);
    } catch (error) {
      toast.error("Error fetching business details:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessDetails(id);
  }, [pathname, id]);

  return (
    <>
      {loading ? (
        <>
          <LayoutLoader />
        </>
      ) : (
        <React.Fragment>
          <div className="grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-12 lg:col-span-12">
              <div className="flex items-center gap-4 justify-end mb-4">
              </div>
              <ProfileTabs tabs={tabs}>
                <div className="grid grid-cols-12 md:gap-x-12 gap-y-6 mb-5 pt-6">
                  <div className="col-span-12 md:col-span-6">
                    <Label htmlFor="BusinessName" className="mb-2">
                      Name
                    </Label>
                    <p className="text-default-600">
                    {businessDetails?.first_name} {businessDetails?.last_name}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <Label htmlFor="lastName" className="mb-2">
                      Mobile Number
                    </Label>
                    <p className="text-default-600">
                    {businessDetails?.mobile_number}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <Label htmlFor="lastName" className="mb-2">
                     Email
                    </Label>
                    <p className="text-default-600">
                    {businessDetails?.email}
                    </p>
                  </div>
                </div>
              </ProfileTabs>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default Info;
