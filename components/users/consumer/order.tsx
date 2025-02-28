"use client";
import React, { useEffect, useState } from "react";
import LayoutLoader from "@/components/layout-loader";
import { ProfileSidebar } from "@/components/partials/profile";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import { consumertabs } from "@/utils/profile-tabs";
import { useParams } from "next/navigation";
import { fetchConsumerBasicDetailsById } from "@/service/user.service";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { ConsumerOrderTable } from "@/components/tables";

interface IOrderProps {}

const Order: React.FunctionComponent<IOrderProps> = () => {
  const t = useTranslations("OrderPage");
  const [loading, setLoading] = useState<boolean>(false);
  const [basicDetails, setBasicDetails] = useState<any>({});
  const [user_id, setUserId] = useState<null | number>(null);
  const { id } = useParams();
  const [tabs, setTabs] =
    useState<{ label: string; value: string }[]>(consumertabs);

  // Fetch Seller's basic details
  const fetchBasicDetails = async (id: any) => {
    try {
        let response = await fetchConsumerBasicDetailsById(id);
        const data = response?.data;
        setBasicDetails(data);
      setUserId(response?.data?.id)
      return ;
    } catch (error) {
      toast.error("Error fetching business details:");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      fetchBasicDetails(id);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <LayoutLoader />
      ) : (
        <div className="grid grid-cols-12 gap-6 mt-6">
          <div className="col-span-12 lg:col-span-12">
            <ProfileTabs tabs={tabs}>
              <ConsumerOrderTable trans={t} user_id={user_id} />
            </ProfileTabs>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
