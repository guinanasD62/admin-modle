"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image"; // Import the Image component
import {
  fetchSellerBasicDetailsById,
  fetchSellerVerificationById,
  updateVerificationDetailsStatus,
} from "@/service/user.service";
import { getS3BasePath } from "@/config/aws";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import { ProfileSidebar } from "@/components/partials/profile";
import { sellertabs } from "@/utils/profile-tabs";
import LayoutLoader from "@/components/layout-loader";
import { Icon } from "@iconify/react";
import VerificationCode from "@/public/images/profile/verification-code.png";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
const Verification = () => {
  const [verification, setVerification] = useState<any>(null);
  const [basicinformation, setBasicInformation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [verificationStatus, SetverificationStatus] = useState("");
  const [reason, setReason] = useState("");
  const [tabs, setTabs] =
    useState<{ label: string; value: string }[]>(sellertabs);
  const AWS_URL = getS3BasePath();
  const [status, setStatus] = useState({
    label: "",
    colorClass: "",
    iconPath: "",
    iconColor: "",
  });
  const pathname = usePathname();
  const { id } = useParams();

  // Generic function to fetch verification based on user type
  const fetchVerification = async (id: any) => {
    try {
      let response = await fetchSellerVerificationById(id);
      const data = response?.data;
      setVerification(data);
    } catch (error) {
      toast.error("Error fetching business details");
    }
  };

  // Update status based on the verification data
  useEffect(() => {
    const getVerificationStatus = () => {
      if (verification?.verification_status === "APPROVED") {
        setStatus({
          label: "Verified",
          colorClass: "text-green-800 bg-green-100",
          iconPath: "M5 13l4 4L19 7",
          iconColor: "text-green-600",
        });
      } else if (verification?.verification_status === "REJECTED") {
        setStatus({
          label: "UnVerified",
          colorClass: "text-red-800 bg-red-100",
          iconPath: "M6 18L18 6M6 6l12 12",
          iconColor: "text-red-600",
        });
      } else {
        setStatus({
          label: "Pending",
          colorClass: "text-yellow-800 bg-yellow-100",
          iconPath: "M12 8v4m0 4h.01",
          iconColor: "text-yellow-600",
        });
      }
    };

    getVerificationStatus();
  }, [verification]); // Run effect whenever verification data changes

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchVerification(id)]);
      setLoading(false); // Set loading to false once both API calls are done
    };

    fetchData();
  }, [pathname, id]);

  const handleApprove = async () => {
    SetverificationStatus("APPROVED");
    setReason("");
    try {
      const payload = {
        uuid: id,
        admin_status: "APPROVED",
      };
      const response = await updateVerificationDetailsStatus(payload);
      if (response?.status === false) {
        toast.error(response?.message);
        return;
      }
      fetchVerification(id);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    }
    setError("");
    SetverificationStatus("");
    setReason("");
  };

  const handleReject = () => {
    SetverificationStatus("REJECTED");
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
      if (!verificationStatus) {
        setError("Please provide reason");
        return;
      }
      const response = await updateVerificationDetailsStatus(payload);
      if (response?.status === false) {
        toast.error(response?.message);
        return;
      }
      fetchVerification(id);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    }
    setError("");
    SetverificationStatus("");
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
                      verification?.verification_status === "APPROVED"
                        ? "success"
                        : verification?.verification_status === "REJECTED"
                        ? "destructive"
                        : "warning"
                    }
                    variant="soft"
                  >
                    {verification?.verification_status === "APPROVED"
                      ? "Approved"
                      : verification?.verification_status === "REJECTED"
                      ? "Rejected"
                      : "Pending"}
                  </Badge>
                </div>
              </div>
              <ProfileTabs tabs={tabs}>
                {
                  verification? <>
                     <div>
                  {verification?.verification_status === "REJECTED" && (
                    <Alert color="destructive" variant="soft">
                      <AlertDescription>
                        Rejection Reason :{" "}
                        {verification?.verification_rejection_detail}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                {verification && (
                  <div className="flex items-start gap-4 pt-6">
                    <Image
                      src={
                        verification &&
                        `${AWS_URL}/users/${verification?.user_id}/verification/${verification?.code_image}`
                      }
                      alt=""
                      width={176}
                      height={176}
                      className="w-44"
                    />
                    <p
                      className={`flex items-center gap-1 px-3 py-2 w-fit border rounded-lg ${
                        verification?.verification_status === "APPROVED"
                          ? "border-green-200 bg-green-100 text-green-600"
                          : "border-red-200 bg-red-100 text-red-600"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          verification?.verification_status === "APPROVED"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                        icon={
                          verification?.verification_status === "APPROVED"
                            ? "heroicons:check-circle"
                            : "heroicons:x-circle"
                        }
                      />
                      {verification?.verification_status === "APPROVED"
                        ? "Verified"
                        : "Unverified"}
                    </p>
                  </div>
                )}
                <div className="flex gap-4 mt-2">
                  {verification?.verification_status == null && (
                    <button
                      type="button"
                      onClick={handleApprove}
                      className="text-green-500 hover:text-green-700 border border-green-500 rounded px-2 py-1"
                    >
                      Approve
                    </button>
                  )}
                  {verification?.verification_status !== "REJECTED" && (
                    <button
                      type="button"
                      onClick={handleReject}
                      className="text-red-500 hover:text-red-700 border border-red-500 rounded px-2 py-1"
                    >
                      Reject
                    </button>
                  )}
                </div>
                {verificationStatus === "REJECTED" && (
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
                  </>:<></>
                }
              </ProfileTabs>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default Verification;
