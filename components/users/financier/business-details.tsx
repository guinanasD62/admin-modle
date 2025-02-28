"use client";
import LayoutLoader from "@/components/layout-loader";
import { ProfileSidebar } from "@/components/partials/profile";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import { Label } from "@/components/ui/label";
import { fetchFinancierBasicDetailsById } from "@/service/user.service";
import { financiertabs } from "@/utils/profile-tabs";
import { Icon } from "@iconify/react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BusinessDetails = () => {
  const [tabs, setTabs] =
    useState<{ label: string; value: string }[]>(financiertabs);
  const [loading, setLoading] = useState<boolean>(false);
  const [businessDetails, setBusinessDetails] = useState<any>(null);
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

  function createSlug(product_category_id: any, categoryMeta: any) {
    if (product_category_id && categoryMeta) {
      const categoryIds = Array.isArray(businessDetails?.product_category_id)
        ? businessDetails?.product_category_id
        : [businessDetails?.product_category_id];

      return categoryIds
        .map((id: any) => businessDetails?.categoryMeta[id])
        .filter((name: any) => name !== undefined)
        .join(", ");
    }
  }

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
              <div className="flex items-center gap-4 justify-end mb-4"></div>
              <ProfileTabs tabs={tabs}>
                {businessDetails ? (
                  <>
                    <div className="grid grid-cols-12 md:gap-x-12 gap-y-6 mb-5 pt-6">
                    {businessDetails?.company_name && (
                        <div className="col-span-12 md:col-span-6">
                          <Label htmlFor="BusinessName" className="mb-2">
                            Business Name
                          </Label>
                          <p className="text-default-600">
                            {businessDetails.company_name}
                          </p>
                        </div>
                      )}

                      {businessDetails?.company_offerings && (
                        <div className="col-span-12 md:col-span-6">
                          <Label htmlFor="lastName" className="mb-2">
                            Product / Services
                          </Label>
                          <p className="text-default-600">
                            {businessDetails.company_offerings}
                          </p>
                        </div>
                      )}

                      {businessDetails?.product_industry && (
                        <div className="col-span-12 md:col-span-6">
                          <Label htmlFor="lastName" className="mb-2">
                            Product Division
                          </Label>
                          <p className="text-default-600">
                            {businessDetails.product_industry}
                          </p>
                        </div>
                      )}

                      {businessDetails?.product_category_id && (
                        <div className="col-span-12 md:col-span-6">
                          <Label htmlFor="lastName" className="mb-2">
                            Product Category
                          </Label>
                          <p className="text-default-600">
                            {createSlug(
                              businessDetails.product_category_id,
                              businessDetails.categoryMeta
                            )}
                          </p>
                        </div>
                      )}

                      {businessDetails?.gst_number && (
                        <div className="col-span-12 lg:col-span-6">
                          <Label htmlFor="AadharCard" className="mb-2">
                            GST Number
                          </Label>
                          <p className="text-default-600 flex items-center gap-1.5">
                            {businessDetails.gst_number}
                            <span>
                              <Icon
                                className="w-5 h-5 text-green-500 ltr:mr-1 rtl:ml-1"
                                icon="heroicons:check-circle"
                              />
                            </span>
                          </p>
                        </div>
                      )}

                      {businessDetails?.pan_card_number && (
                        <div className="col-span-12 lg:col-span-6">
                          <Label htmlFor="PANCard" className="mb-2">
                            PAN Number
                          </Label>
                          <p className="text-default-600 flex items-center gap-1.5">
                            {businessDetails.pan_card_number}
                            <span>
                              <Icon
                                className="w-5 h-5 text-green-500 ltr:mr-1 rtl:ml-1"
                                icon="heroicons:check-circle"
                              />
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                    {businessDetails?.UserAddress?.length > 0 && (
                      <>
                        <h4 className="text-lg font-semibold mb-2">
                          Shipping Address
                        </h4>
                        <p className="text-default-600">
                          {[
                            businessDetails.UserAddress[0]?.address1,
                            businessDetails.UserAddress[0]?.address2,
                            businessDetails.UserAddress[0]?.landmark,
                            businessDetails.UserAddress[0]?.city,
                            businessDetails.UserAddress[0]?.state,
                            businessDetails.UserAddress[0]?.country,
                            businessDetails.UserAddress[0]?.pincode,
                          ]
                            .filter(Boolean) // Removes any falsy values
                            .join(", ")}{" "}
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </ProfileTabs>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default BusinessDetails;
