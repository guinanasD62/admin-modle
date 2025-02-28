"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchConsumerAadharCardById, fetchConsumerBasicDetailsById, fetchConsumerPanCardById } from "@/service/user.service";
import { Label } from "@/components/ui/label";
import { ProfileSidebar } from "@/components/partials/profile";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import { consumertabs } from "@/utils/profile-tabs";
import LayoutLoader from "@/components/layout-loader";
import { Icon } from "@iconify/react";

interface IBasicDetailsProps {
    props?: any;
}

const BasicDetails: React.FC<IBasicDetailsProps> = ({ props }) => {
    const [basicinformation, setBasicInformation] = useState<any>(null);
    const [aadharCardinformation, setAadharCardInformation] = useState<any>(null);
    const [panCardinformation, setPanCardInformation] = useState<any>(null);
    const [aadharCardVisible, setAadharCardVisible] = useState<any>(null);
    const [panCardVisible, setPanCardVisible] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const [tabs, setTabs] =
        useState<{ label: string; value: string }[]>(consumertabs);
    const pathname = usePathname();
    const { id } = useParams();

    // Generic function to fetch basic details based on user type
    const fetchBasicDetails = async (id: any) => {
        setLoading(true);
        try {
            let response = await fetchConsumerBasicDetailsById(id);
            const data = response?.data;
            setBasicInformation(data);
        } finally {
            setLoading(false);
        }
    };

    // Generic function to fetch aadhar-card based on user type
    const fetchAadharCardDetails = async (id: any) => {

        let response = await fetchConsumerAadharCardById(id);
        const data = response?.data;
        setAadharCardInformation(data);

    };

    // Generic function to fetch pan-card based on user type
    const fetchPanCardDetails = async (id: any) => {

        let response = await fetchConsumerPanCardById(id);
        const data = response?.data;
        setPanCardInformation(data);

    };

    const handleAadharCardClick = () => {
        if (!aadharCardVisible) {
            fetchAadharCardDetails(id);
        }
        setAadharCardVisible(!aadharCardVisible);
    };

    const handlePanCardClick = () => {
        if (!panCardVisible) {
            fetchPanCardDetails(id);
        }
        setPanCardVisible(!panCardVisible);
    };

    useEffect(() => {
        fetchBasicDetails(id);
    }, [setBasicInformation]);



    return (
        <>
            {loading ? (
                <>
                    <LayoutLoader />
                </>
            ) : (
                <React.Fragment>
                    <div className="grid grid-cols-12 gap-6 mt-2">
                        <div className="col-span-12 lg:col-span-4">
                            <ProfileSidebar basicinformation={basicinformation} />
                        </div>
                        <div className="col-span-12 lg:col-span-8 mt-6">
                            <ProfileTabs tabs={tabs}>
                                <div className="container">
                                    <div className="p-4">
                                        <div className="space-y-4">
                                            <div className="grid gap-8 grid-cols-2">
                                                <div>
                                                    <Label className="mb-2" htmlFor="first_name">
                                                        First Name
                                                    </Label>
                                                    <p>{basicinformation?.first_name}</p>
                                                </div>
                                                <div>
                                                    <Label className="mb-2" htmlFor="last_name">
                                                        Last Name
                                                    </Label>
                                                    <p>{basicinformation?.last_name}</p>
                                                </div>
                                            </div>

                                            <div className="grid gap-8 grid-cols-2">
                                                <div>
                                                    <Label className="mb-2" htmlFor="email">
                                                        Email
                                                    </Label>
                                                    <p>{basicinformation?.email}</p>
                                                </div>
                                                <div>
                                                    <Label className="mb-2" htmlFor="mobile_number">
                                                        Mobile Number
                                                    </Label>
                                                    <p>{basicinformation?.mobile_number}</p>
                                                </div>
                                            </div>
                                            <div className="grid gap-8 grid-cols-2">
                                                {basicinformation && basicinformation.gst_number && (
                                                    <div>
                                                        <Label className="mb-2" htmlFor="gst_number">
                                                            GST Number
                                                        </Label>
                                                        <div className="flex gap-2">
                                                            <span className="max-w-[500px] truncate font-medium">
                                                                **********
                                                            </span>
                                                            <Icon
                                                                icon="heroicons:eye-slash"
                                                                className="w-4 h-4 text-default-400"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="col">
                                                    <Label className="mb-2" htmlFor="pan_card_number">
                                                        Pan Card Number
                                                    </Label>
                                                    <div className="flex gap-2">
                                                        {panCardVisible ? (
                                                            <span className="max-w-[500px] truncate font-medium">
                                                                {panCardinformation?.pan_card_number}
                                                            </span>
                                                        ) : (
                                                            <span className="max-w-[500px] truncate font-medium">*********</span>
                                                        )}

                                                        <Icon
                                                            icon={panCardVisible ? "heroicons:eye" : "heroicons:eye-slash"}
                                                            className="w-4 h-4 text-default-400"
                                                            onClick={handlePanCardClick}
                                                        />
                                                    </div>
                                                </div>


                                                <div className="col">
                                                    <Label className="mb-2" htmlFor="pan_card_number">
                                                        Aadhar Card Number
                                                    </Label>
                                                    <div className="flex gap-2">
                                                        {aadharCardVisible ? (
                                                            <span className="max-w-[500px] truncate font-medium">
                                                                {aadharCardinformation?.aadhar_card_number}
                                                            </span>
                                                        ) : (
                                                            <span className="max-w-[500px] truncate font-medium">*********</span>
                                                        )}
                                                        <Icon
                                                            icon={aadharCardVisible ? "heroicons:eye" : "heroicons:eye-slash"}
                                                            className="w-4 h-4 text-default-400"
                                                            onClick={handleAadharCardClick}
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="grid gap-8 grid-cols-2">
                                                <div>
                                                    <Label className="mb-2" htmlFor="status">
                                                        Status
                                                    </Label>
                                                    <p>{basicinformation?.status}</p>
                                                </div>
                                                <div>
                                                    <Label className="mb-2" htmlFor="pincode">
                                                        Pincode
                                                    </Label>
                                                    <p>{basicinformation?.pincode}</p>
                                                </div>
                                            </div>
                                        </div>
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

export default BasicDetails;