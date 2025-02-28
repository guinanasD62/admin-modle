"use client";
import React, { useEffect, useState } from "react";
import LayoutLoader from "@/components/layout-loader";
import { ProfileSidebar } from "@/components/partials/profile";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import { sellertabs } from "@/utils/profile-tabs";
import { useParams } from "next/navigation";
import { fetchSellerBasicDetailsById } from "@/service/user.service";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import ProductTable from "@/components/tables/users/seller/product/product-table";

interface IProductProps {}

const Product: React.FunctionComponent<IProductProps> = () => {
  const t = useTranslations("SellerPage");
  const [loading, setLoading] = useState<boolean>(false);
  const [basicDetails, setBasicDetails] = useState<any>({});
  const [user_id, setUserId] = useState<null | number>(null);
  const { id } = useParams();
  const [tabs, setTabs] =
    useState<{ label: string; value: string }[]>(sellertabs);

  // Fetch Seller's basic details
  const fetchBasicDetails = async (id: any) => {
    try {
      const response = await fetchSellerBasicDetailsById(id);
      setBasicDetails(response?.data);
      setUserId(response?.data?.id);
      return;
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
  }, []);

  return (
    <>
      {loading ? (
        <LayoutLoader />
      ) : (
        <div className="grid grid-cols-12 gap-6 mt-6">
          <div className="col-span-12 lg:col-span-12">
            <ProfileTabs tabs={tabs}>
              <ProductTable trans={t} user_id={user_id} />
            </ProfileTabs>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
