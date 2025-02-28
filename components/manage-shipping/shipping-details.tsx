"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchShippingById } from "@/service/manage-shipping.service";
import LayoutLoader from "@/components/layout-loader";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";

interface ShippingDetails {
  provider_name: string;
  shipping_method: string;
  rates: number; // Adjust this type as needed
  service_area: string;
}

const ShippingDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchShippingById(id);
        setShippingDetails(response.data); // Ensure this matches the structure of ShippingDetails
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Safely access the message property
        } else {
          setError("An unknown error occurred"); // Fallback for unknown types
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

  return (
    <div className="space-y-6">
      <Breadcrumbs>
        <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
        <BreadcrumbItem>Setting</BreadcrumbItem>
        <BreadcrumbItem>Manage Shipping</BreadcrumbItem>
        <BreadcrumbItem>Shipping Details</BreadcrumbItem>
      </Breadcrumbs>

      {error && (
        <Alert color="destructive">
          {error}
        </Alert>
      )}

      {shippingDetails && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{shippingDetails.provider_name}</h1>
          <p><strong>Shipping Method:</strong> {shippingDetails.shipping_method}</p>
          <p><strong>Rates:</strong> {shippingDetails.rates}</p>
          <p><strong>Service Areas:</strong> {shippingDetails.service_area}</p>

          <Button onClick={() => window.history.back()}>Back</Button>
        </div>
      )}
    </div>
  );
};

export default ShippingDetails;
