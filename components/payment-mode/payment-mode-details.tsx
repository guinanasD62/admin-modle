"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchShippingById } from "@/service/manage-shipping.service";
import LayoutLoader from "@/components/layout-loader";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { fetchPaymentModeById } from "@/service/payment-mode.service";
import Image from "next/image";
import netBanking from "../../public/images/payment-mode/netbanking.png"
import upi from "../../public/images/payment-mode/UPI.png"
import card from "../../public/images/payment-mode/Card.png"
import wallets from "../../public/images/payment-mode/wallet.png"

interface PaymentMode {
    payment_methods: string;
    payment_providers: string[];
    created_at: string;
    updated_at: string;
    image: string;
}

const PaymentModeDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [paymentModeDetails, setPaymentModeDetails] = useState<PaymentMode | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchPaymentModeById(id);
                setPaymentModeDetails(response.data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <LayoutLoader />;
    }
    let imageSrc: any;

    switch (paymentModeDetails?.payment_methods) {
        case "UPI":
            imageSrc = upi
            break;
        case "CARD":
            imageSrc = card;
            break;
        case "NETBANKING":
            imageSrc = netBanking;
            break;
        case "WALLETS":
            imageSrc = wallets;
            break;
    }

    return (
        <div className="space-y-6">
            <Breadcrumbs>
                <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Setting</BreadcrumbItem>
                <BreadcrumbItem href="">Payment Mode</BreadcrumbItem>
                <BreadcrumbItem >Payment Mode Details</BreadcrumbItem>
            </Breadcrumbs>

            {error && (
                <Alert color="destructive">
                    {error}
                </Alert>
            )}
            <div className="flex">


                <div className="w-1/2 p-4">
                    <Image
                        className="w-50 h-50 "
                        src={imageSrc}
                        width={500}
                        height={300}
                        alt={paymentModeDetails?.payment_methods || "Payment Mode Image"}
                    />
                </div>
                <div className="w-1/2 p-4">
                    {paymentModeDetails && (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-bold">{paymentModeDetails.payment_methods}</h1>
                            <h2>About Payment Mode</h2>
                            <p><strong>Created At:</strong> {paymentModeDetails.created_at}</p>
                            <p><strong>Updated At:</strong> {paymentModeDetails.updated_at}</p>
                            <p><strong>Providers:</strong> {paymentModeDetails.payment_providers.join(", ")}</p>
                            <Button onClick={() => window.history.back()}>Back</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentModeDetails;
