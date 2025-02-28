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
  fetchSellerBasicDetailsById,
  updateBusinessDetailsStatus,
} from "@/service/user.service";
import { sellertabs } from "@/utils/profile-tabs";
import { Icon } from "@iconify/react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BusinessDetails = () => {
  const [tabs, setTabs] =
    useState<{ label: string; value: string }[]>(sellertabs);
  const [businessDetails, setBusinessDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const pathname = usePathname();
  const { id } = useParams();
  // Generic function to fetch basic details based on user type
  const fetchBusinessDetails = async (id: any) => {
    setLoading(true);
    try {
      let response = await fetchSellerBasicDetailsById(id);
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

  const handleApprove = async () => {
    setStatus("APPROVED");
    setReason("");
    try {
      const payload = {
        uuid: id,
        admin_status: "APPROVED",
      };
      const response = await updateBusinessDetailsStatus(payload);
      if (response?.status === false) {
        toast.error(response?.message);
        return;
      }
      toast.success(response.message);
      fetchBusinessDetails(id);
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    }
    setError("");
    setStatus("");
    setReason("");
  };

  const handleReject = () => {
    setStatus("REJECTED");
  };

  const handleReasonChange = (e: any) => {
    setReason(e.target.value);
  };

  const handleRejectSubmit = async () => {
    try {
      const payload = {
        uuid: id,
        admin_status: "REJECTED",
        reason: reason,
      };
      if (!reason) {
        setError("Please provide reason");
        return;
      }
      const response = await updateBusinessDetailsStatus(payload);
      if (response?.status === false) {
        toast.error(response?.message);
        return;
      }
      toast.success(response.message);
      fetchBusinessDetails(id);
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    }
    setError("");
    setStatus("");
    setReason("");
  };

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
                <div className="flex items-center gap-2">
                  <p>Status :</p>
                  <Badge
                    className="py-2 px-4"
                    color={
                      businessDetails?.basic_info_status === "APPROVED"
                        ? "success"
                        : businessDetails?.basic_info_status === "REJECTED"
                        ? "destructive"
                        : "warning"
                    }
                    variant="soft"
                  >
                    {businessDetails?.basic_info_status === "APPROVED"
                      ? "Approved"
                      : businessDetails?.basic_info_status === "REJECTED"
                      ? "Rejected"
                      : "Pending"}
                  </Badge>
                </div>
              </div>
              <ProfileTabs tabs={tabs}>
                {businessDetails ? (
                  <>
                    <div>
                      {businessDetails?.basic_info_status === "REJECTED" && (
                        <Alert color="destructive" variant="soft">
                          <AlertDescription>
                            Rejection Reason :{" "}
                            {businessDetails?.basic_info_rejection_detail}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
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
                    {businessDetails?.company_name && (
                      <>
                        <div className="flex gap-4">
                          {businessDetails?.basic_info_status == null && (
                            <button
                              type="button"
                              onClick={handleApprove}
                              className="text-green-500 hover:text-green-700 border border-green-500 rounded px-2 py-1"
                            >
                              Approve
                            </button>
                          )}
                          {businessDetails?.basic_info_status !==
                            "REJECTED" && (
                            <button
                              type="button"
                              onClick={handleReject}
                              className="text-red-500 hover:text-red-700 border border-red-500 rounded px-2 py-1"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                        {status === "REJECTED" && (
                          <>
                            <div className="flex flex-col gap-2 mb-3 mt-5">
                              <label htmlFor="reason" className="text-gray-700">
                                Reason for Rejection:
                              </label>
                              <input
                                type="text"
                                id="reason"
                                value={reason}
                                onChange={handleReasonChange}
                                className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter reason"
                                required
                              />
                              {error && (
                                <div className=" text-destructive">{error}</div>
                              )}
                            </div>
                            <button
                              onClick={() => handleRejectSubmit()}
                              type="button"
                              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                              Submit
                            </button>
                          </>
                        )}
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
