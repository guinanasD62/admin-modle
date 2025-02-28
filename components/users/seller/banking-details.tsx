"use client";
import LayoutLoader from "@/components/layout-loader";
import { ProfileSidebar } from "@/components/partials/profile";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  fetchSellerBankDetailsById,
  fetchSellerBasicDetailsById,
  updateBankDetailsStatus,
} from "@/service/user.service";
import { sellertabs } from "@/utils/profile-tabs";
import { Icon } from "@iconify/react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Bankdetails = () => {
  const [bankdetails, setBankDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [basicinformation, setBasicInformation] = useState<any>(null);
  const [tabs, setTabs] =
    useState<{ label: string; value: string }[]>(sellertabs);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const pathname = usePathname();
  const { id } = useParams();

  // Generic function to fetch bank details based on user type
  const fetchBankDetails = async (id: any) => {
    try {
      const response = await fetchSellerBankDetailsById(id);
      const data = response?.data;
      setBankDetails(data);
    } catch (error) {
      console.error("Error fetching basic details:", error);
    }
  };

  // Generic function to fetch basic details based on user type
  const fetchBasicDetails = async (id: any) => {
    try {
      let response = await fetchSellerBasicDetailsById(id);
      const data = response?.data;
      data;
      setBasicInformation(data);
    } catch (error) {
      toast.error("Error fetching business details:");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchBasicDetails(id), fetchBankDetails(id)]);
      setLoading(false); // Set loading to false once both API calls are done
    };

    fetchData();
  }, [pathname, id]);

  const handleApprove = async () => {
    setStatus("APPROVED");
    setReason("");
    try {
      const payload = {
        uuid: id,
        admin_status: "APPROVED",
      };
      const response = await updateBankDetailsStatus(payload);
      if (response?.status === false) {
        toast.error(response?.message);
        return;
      }
      fetchBankDetails(id);
      toast.success(response.message);
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
      const response = await updateBankDetailsStatus(payload);
      if (response?.status === false) {
        toast.error(response?.message);
        return;
      }
      fetchBankDetails(id);
      toast.success(response.message);
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
                      bankdetails?.banking_status === "APPROVED"
                        ? "success"
                        : bankdetails?.banking_status === "REJECTED"
                        ? "destructive"
                        : "warning"
                    }
                    variant="soft"
                  >
                    {bankdetails?.banking_status === "APPROVED"
                      ? "Approved"
                      : bankdetails?.banking_status === "REJECTED"
                      ? "Rejected"
                      : "Pending"}
                  </Badge>
                </div>
              </div>
              <ProfileTabs tabs={tabs}>
                {bankdetails ? (
                  <>
                    <div>
                      {bankdetails?.banking_status === "REJECTED" && (
                        <Alert color="destructive" variant="soft">
                          <AlertDescription>
                            Rejection Reason :{" "}
                            {bankdetails?.banking_rejection_detail}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <div className="grid grid-cols-12 md:gap-x-12 gap-y-6 mb-5 pt-6">
                      <div className="col-span-12 md:col-span-6">
                        <Label htmlFor="BusinessName" className="mb-2">
                          Account Holder Name
                        </Label>
                        <p className="text-default-600">
                          {bankdetails?.account_holder_name}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <Label htmlFor="lastName" className="mb-2">
                          Account Number
                        </Label>
                        <p className="text-default-600">
                          {bankdetails?.account_number}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <Label htmlFor="lastName" className="mb-2">
                          IFSC Code
                        </Label>
                        <p className="text-default-600 flex items-center gap-1.5">
                          {bankdetails?.ifsc_code}
                          <span>
                            <Icon
                              className="w-5 h-5 text-green-500 ltr:mr-1 rtl:ml-1"
                              icon="heroicons:check-circle"
                            />
                          </span>
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <Label htmlFor="lastName" className="mb-2">
                          Branch
                        </Label>
                        <p className="text-default-600">
                          {bankdetails?.branch_name}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <Label htmlFor="lastName" className="mb-2">
                          Account Type
                        </Label>
                        <p className="text-default-600">
                          {bankdetails?.account_type}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {bankdetails?.banking_status == null && (
                        <button
                          type="button"
                          onClick={handleApprove}
                          className="text-green-500 hover:text-green-700 border border-green-500 rounded px-2 py-1"
                        >
                          Approve
                        </button>
                      )}
                      {bankdetails?.banking_status !== "REJECTED" && (
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

export default Bankdetails;
