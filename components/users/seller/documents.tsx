"use client";
import LayoutLoader from "@/components/layout-loader";
import { ProfileSidebar } from "@/components/partials/profile";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getS3BasePath } from "@/config/aws";
import {
  fetchSellerBasicDetailsById,
  fetchSellerDocumentById,
  updateDocumentDetailsStatus,
  viewDocument,
} from "@/service/user.service";
import { sellertabs } from "@/utils/profile-tabs";
import { Icon } from "@iconify/react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AWS_URL = getS3BasePath();

const Document = () => {
  const [documents, setDocuments] = useState<any>([]);
  const [basicinformation, setBasicInformation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabs, setTabs] =
    useState<{ label: string; value: string }[]>(sellertabs);
  const [documentStatus, setDocumentStatus] = useState<{
    [key: string]: string;
  }>({});
  const [messages, setMessages] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const pathname = usePathname();
  const { id } = useParams();

  const titles: any = {
    chequeFile: "Cancelled check / Bank Statement",
    gstFile: "GST Certificate",
    signatureFile: "Signature",
    Passport: "Passport",
    "Aadhar card": "Aadhar card",
    "Pan card": "Pan card",
  };

  const order = [
    "Cancelled check / Bank Statement",
    "GST Certificate",
    "Signature",
    "Passport",
    "Aadhar card",
    "Pan card",
  ];

  const fetchDocument = async (id: any) => {
    try {
      const response = await fetchSellerDocumentById(id);
      const data = response?.data.map((doc: any) => ({
        ...doc,
        status: doc.document_status || "Pending",
      }));
      const sortedDocuments = data?.sort(
        (a: any, b: any) =>
          order.indexOf(titles[a.document_name]) -
          order.indexOf(titles[b.document_name])
      );
      setDocuments(sortedDocuments);
    } catch (error) {
      toast.error("Error fetching documents");
    }
  };

  const fetchBasicDetails = async (id: any) => {
    try {
      const response = await fetchSellerBasicDetailsById(id);
      const data = response?.data;
      setBasicInformation(data);
    } catch (error) {
      toast.error("Error fetching business details");
    }
  };

  const getGlobalStatus: any = () => {
    const hasRejected = documents?.some(
      (doc: any) => doc.document_status === "REJECTED"
    );
    const allApproved = documents?.every(
      (doc: any) => doc.document_status === "APPROVED"
    );

    if (hasRejected) return "REJECTED";
    if (allApproved) return "APPROVED";
    return "PENDING";
  };

  const downloadDocumentHandler = (doc: string, user_id: number) => {
    const link = document.createElement("a");
    const fileUrl = `${AWS_URL}/users/${user_id}/documents/${doc}`;
    link.href = fileUrl;
    link.download = doc;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openDocumentInNewTab = async (doc: string, user_id: number) => {
    try {  
      const fileUrl = `users/${user_id}/documents/${doc}`;
      const response = await viewDocument(fileUrl);
      const signedUrl = response.data;
      // Open the document in a new tab
      window.open(signedUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      toast.error('Error opening document. Please try again later.');
    }
  };  
   
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchBasicDetails(id), fetchDocument(id)]);
      setLoading(false);
    };

    fetchData();
  }, [pathname, id]);

  const handleDocumentState = async (uuid: string, state: string) => {
    setDocumentStatus((prevStatus) => ({
      ...prevStatus,
      [uuid]: state,
    }));

    if (state === "APPROVED") {
      const payload = {
        uuid: id,
        document_uuid: uuid,
        admin_status: state,
      };
      const response = await updateDocumentDetailsStatus(payload);
      if (response?.status === false) {
        toast.error(response?.message);
        return;
      }
      fetchDocument(id);
      toast.success(response.message);
    }
  };

  const handleMessageChange = (uuid: string, message: string) => {
    setMessages((prevMessages: any) => ({
      ...prevMessages,
      [uuid]: message,
    }));
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [uuid]: "",
    }));
  };

  const handleSubmit = async (uuid: string) => {
    const reason = messages[uuid];
    if (!reason) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [uuid]: "Rejection reason is required",
      }));
      return;
    }
    try {
      const payload = {
        uuid: id,
        admin_status: "REJECTED",
        document_uuid: uuid,
        reason: reason,
      };
      const response = await updateDocumentDetailsStatus(payload);
      if (response?.status === false) {
        toast.error(response?.message);
        return;
      }
      fetchDocument(id);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    }

    setDocumentStatus((prevStatus) => ({
      ...prevStatus,
      [uuid]: "",
    }));
    setMessages((prevMessages: any) => ({
      ...prevMessages,
      [uuid]: "",
    }));
  };
  return (
    <>
      {loading ? (
        <LayoutLoader />
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
                      getGlobalStatus() === "APPROVED"
                        ? "success"
                        : getGlobalStatus() === "REJECTED"
                        ? "destructive"
                        : "warning"
                    }
                    variant="soft"
                  >
                    {getGlobalStatus() === "APPROVED"
                      ? "Approved"
                      : getGlobalStatus() === "REJECTED"
                      ? "Rejected"
                      : "Pending"}
                  </Badge>
                </div>
              </div>
              <ProfileTabs tabs={tabs}>
                <div className="grid grid-cols-12 md:gap-x-12 gap-y-6 mb-5 pt-6">
                  {documents?.length > 0 &&
                    documents?.map((doc: any) => {
                      return (
                        <>
                          <div
                            className="col-span-12 md:col-span-12"
                            key={doc.uuid}
                          >
                            <Label htmlFor="BusinessName" className="mb-2">
                              {titles[doc?.document_name]}{" "}
                              <Badge
                                color={
                                  doc.document_status === "APPROVED"
                                    ? "success"
                                    : doc.document_status === "REJECTED"
                                    ? "destructive"
                                    : "warning"
                                }
                              >
                                {doc.document_status === "APPROVED"
                                  ? "APPROVED"
                                  : doc.document_status === "REJECTED"
                                  ? "REJECTED"
                                  : "PENDING"}
                              </Badge>
                            </Label>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Icon
                                  className="w-6 h-6 text-red-500 ltr:mr-1 rtl:ml-1"
                                  icon="heroicons:document-text"
                                />
                                <p className="text-default-600">
                                  {doc.document}
                                </p>
                              </div>

                              <Button
                                className="px-2"
                                size="sm"
                                color="secondary"
                                variant="outline"
                                onClick={() =>
                                  downloadDocumentHandler(
                                    doc.document,
                                    doc?.user_id
                                  )
                                }
                              >
                                <Icon
                                  className="w-6 h-6"
                                  icon="heroicons:cloud-arrow-down"
                                />
                              </Button>
                             
                              <Button
                                  className="px-2"
                                  size="sm"
                                  color="secondary"
                                  variant="outline"
                                  onClick={() => 
                                    openDocumentInNewTab(
                                      doc.document,
                                      doc?.user_id)} // Pass doc.document here
                                  >
                                <Icon 
                                  className="w-6 h-6" 
                                  icon="heroicons:eye" />
                              </Button>
                              
                            </div>
                            <div>
                              {doc?.document_rejection_detail && (
                                <Alert
                                  color="destructive"
                                  variant="soft"
                                  className="py-2 mt-2"
                                >
                                  <AlertDescription className="text-sm leading-tight">
                                  Rejection Reason : {doc?.document_rejection_detail}
                                  </AlertDescription>
                                </Alert>
                              )}
                            </div>
                            <div className="space-y-4 w-full col-span-12 mt-2">
                              <div className="flex space-x-2">
                                {doc?.document_status == null && (
                                  <button
                                    className="text-green-500 hover:text-green-700 border border-green-500 rounded px-2 py-1"
                                    onClick={() =>
                                      handleDocumentState(doc.uuid, "APPROVED")
                                    }
                                  >
                                    Approve
                                  </button>
                                )}
                                {doc?.document_status !== "REJECTED" && (
                                  <button
                                    className="text-red-500 hover:text-red-700 border border-red-500 rounded px-2 py-1"
                                    onClick={() =>
                                      handleDocumentState(doc.uuid, "REJECTED")
                                    }
                                  >
                                    Reject
                                  </button>
                                )}
                              </div>

                              {/* Textarea and Submit Button for Rejection Reason */}
                              {documentStatus[doc.uuid] === "REJECTED" && (
                                <div className="mt-2 space-y-2">
                                  <textarea
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Add a rejection reason..."
                                    value={messages[doc.uuid] || ""}
                                    onChange={(e) =>
                                      handleMessageChange(
                                        doc.uuid,
                                        e.target.value
                                      )
                                    }
                                    rows={2}
                                  />
                                  {errors[doc.uuid] && (
                                    <p className="text-red-500 text-sm mt-0">
                                      {errors[doc.uuid]}
                                    </p>
                                  )}
                                  <button
                                    className="text-white bg-red-500 hover:bg-red-700 rounded px-3 py-2"
                                    onClick={() => handleSubmit(doc.uuid)}
                                  >
                                    Submit
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </ProfileTabs>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default Document;
