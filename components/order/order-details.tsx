"use client";
import { fetchOrderDetails } from "@/service/order.service";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ErrorBlock from "../error-block";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Stepper,
  Step,
  StepLabel,
  StepDescription,
} from "@/components/ui/steps";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import { openPopup } from "@/service/modal.service";
import LayoutLoader from "../layout-loader";
import { getInitials } from "@/utils/general";
import { getS3BasePath } from "@/config/aws";
import ImageBlock from "./image-block";

interface OrderStatusDates {
  orderItem: {
    tracking_id: string;
    created_at: Date | string;
    processed_at: Date | string;
    dispatched_at: Date | string;
    shipped_at: Date | string;
    delivered_at: Date | string;
  };
}

const OrderDetails = () => {
  const t = useTranslations("OrderPage");
  const AWS_URL = getS3BasePath();
  const [isPending, startTransition] = React.useTransition();
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order-item-number");
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [isError, setIsError] = useState<boolean>(false);
  const stepsWhereCancelButtonNotPresent = [0, 3, 4, 5];
  const steps: string[] = [
    "Order Received",
    "Order Process",
    "Order Dispatched",
    "Order In-Transit",
    "Order Delivered",
  ];
  const isTablet = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (orderId) {
      fetchOrderData(orderId);
    }
  }, [orderId]);

  const fetchOrderData = async (orderId: any) => {
    startTransition(async () => {
      try {
        const response = await fetchOrderDetails(orderId);
        if (response?.status !== true && response?.statusCode !== 200) {
          toast.error(response?.message);
          setIsError(true);
          return;
        }
        setOrderDetails(response?.data);
        setCurrentStepIndex(
          getCurrentStepIndex(response?.data.orderItem?.status)
        );
      } catch (error: any) {
        toast.error(error?.message);
      }
    });
  };
  const { orderItem, user } = orderDetails;
  console.log(orderItem);
  // Function to get current step index based on order status
  const getCurrentStepIndex = (status: string) => {
    const stepMap: { [key: string]: number } = {
      CANCELLED: 0,
      PENDING: 1,
      PROCESSING: 2,
      DISPATCHED: 3,
      SHIPPED: 4,
      DELIVERED: 5,
    };
    return stepMap[status] ?? -1;
  };
  const [currentStepIndex, setCurrentStepIndex] = useState(
    getCurrentStepIndex(orderItem?.status)
  );

  const calculateTotal = () => {
    const price = orderItem?.price || 0;
    const quantity = orderItem?.quantity || 1;
    // Calculate the subtotal as price * quantity
    const subtotal = price * quantity;
    const shipping = 0;
    const coupon = 0;
    // Return the total
    return subtotal + shipping - coupon;
  };
  const shippingCost = 0;
  const couponDiscount = 0;

  if (isError) {
    return <ErrorBlock />;
  }

  const handleOrder = (uuid: string, currentStepIndex: number) => {
    try {
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  //FORMAT DATE AND TIME
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "";
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${formattedDate} ${formattedTime}`;
  };

  const getStatusDate = (orderItem: any, status: string): string => {
    switch (status) {
      case "PENDING":
        return formatDate(orderItem?.created_at);
      case "PROCESSING":
        return formatDate(orderItem?.processed_at);
      case "DISPATCHED":
        return formatDate(orderItem?.dispatched_at);
      case "SHIPPED":
        return formatDate(orderItem?.shipped_at);
      case "DELIVERED":
        return formatDate(orderItem?.delivered_at);
      default:
        return "";
    }
  };

  const handleOpenModal = async () => {
    await openPopup("cancel_order", `${t("Cancel")} ${t("Order")}`, "cancel");
  };

  return (
    <>
      {!isPending ? (
        <>
          {currentStepIndex !== -1 && (
            <div className="w-full mx-auto">
              <Stepper
                current={currentStepIndex}
                alternativeLabel
                direction={isTablet ? "vertical" : "horizontal"}
              >
                {steps?.map((label, i) => {
                  const status = [
                    "PENDING",
                    "PROCESSING",
                    "DISPATCHED",
                    "SHIPPED",
                    "DELIVERED",
                  ][i];
                  const statusDate = getStatusDate(
                    orderDetails.orderItem,
                    status
                  );
                  return (
                    <Step key={i}>
                      <StepLabel>{label}</StepLabel>
                      <StepDescription className="text-sm text-default-600 flex items-center justify-center min-h-[20px]">
                        {statusDate || " "}
                      </StepDescription>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
          )}

          <div className="border-t-2 border-default-300 mt-4">
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="relative bg-[#f5f5f5] h-full p-4 rounded-xl">
                {orderItem?.product?.image? (
                  <>
                     <ImageBlock product={orderItem?.product}/>
                  </>
                ) : (
                  <>
                    <Avatar className="rounded-md object-cover w-full h-[250px] mt-20">
                      <AvatarFallback>
                        {orderItem?.product?.title
                          ? getInitials(orderItem?.product?.title)
                          : ""}
                      </AvatarFallback>
                    </Avatar>
                  </>
                )}
                <div className="absolute top-8 left-0 text-green-600 bg-white px-4 py-2 rounded-r-full">
                  {orderItem?.status}
                </div>
              </div>
              <div className="col-span-2 ms-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-default-500 font-normal mb-1">
                      Order Number
                    </p>
                    <h4 className="text-3xl text-default-800 font-bold mb-2">
                      #{orderItem?.order?.order_number}
                    </h4>
                  </div>

                  <div className="text-3xl font-medium text-default-800">
                    ₹{" "}
                    <span className="font-semibold text-red-500">
                      {calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-default-300 py-8">
                  <h6 className="text-lg text-default-800 font-semibold mb-3">
                    Order Item
                  </h6>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {orderItem?.product?.title}
                    </h3>
                    <Table className="w-full mt-4">
                      <TableBody>
                        <TableRow className="border-none">
                          <TableCell className="text-base p-2 font-medium text-default-500">
                            Brand
                          </TableCell>
                          <TableCell className="p-2 text-base font-semibold text-default-800 last:text-left">
                            {orderItem?.product?.brand?.brand_name}
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-none">
                          <TableCell className="text-base p-2 font-medium text-default-500">
                            Category
                          </TableCell>
                          <TableCell className="p-2 text-base font-semibold text-default-800 last:text-left">
                            {orderItem?.product?.category?.category_name}
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-none">
                          <TableCell className="text-base p-2 font-medium text-default-500">
                            Quantity
                          </TableCell>
                          <TableCell className="p-2 text-base font-semibold text-default-800 last:text-left">
                            {orderItem?.quantity}
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-none">
                          <TableCell className="text-base p-2 font-medium text-default-500">
                            Price
                          </TableCell>
                          <TableCell className="p-2 text-base font-semibold text-default-800 last:text-left">
                            ₹{orderItem?.price.toLocaleString()}
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-none">
                          <TableCell className="text-base p-2 font-medium text-default-500">
                            Status
                          </TableCell>
                          <TableCell className="p-2 text-base font-semibold text-default-800 last:text-left">
                            {orderItem?.status}
                          </TableCell>
                        </TableRow>
                        {orderItem?.tracking_id ? (
                          <TableRow className="border-none">
                            <TableCell className="text-base p-2 font-medium text-default-500">
                              Tracking ID
                            </TableCell>
                            <TableCell className="p-2 text-base font-semibold text-default-800 last:text-left">
                              {orderItem?.tracking_id || "Not available"}
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-default-200 p-5 rounded-xl">
                    <h5 className="text-default-800 text-base font-semibold mb-2">
                      Consumer Details
                    </h5>

                    <div className="divide-y divide-default-400">
                      <div className="py-2.5">
                        <p className="text-default-800 text-sm font-bold mb-1">{`${
                          user?.first_name
                        } ${user?.middle_name || ""} ${user?.last_name}`}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-default-600 text-sm font-medium">
                            {user?.mobile_number}
                          </p>{" "}
                          |
                          <p className="text-default-600 text-sm font-medium">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-default-800 p-5 rounded-xl">
                    <h5 className="text-white text-base font-semibold mb-4">
                      Order Summary
                    </h5>
                    <ul className="text-sm text-white font-normal space-y-3">
                      <li className="flex items-center justify-between">
                        <p>Shipping:</p>
                        <p className="font-medium">
                          ₹{shippingCost.toLocaleString()}
                        </p>
                      </li>
                      <li className="flex items-center justify-between">
                        <p>Coupon:</p>
                        <p className="font-medium text-red-400">
                          -₹{couponDiscount.toLocaleString()}
                        </p>
                      </li>
                      <li className="flex items-center justify-between border-t border-gray-400 pt-4">
                        <p>Grand Total:</p>
                        <p className="font-medium">
                          ₹{calculateTotal().toLocaleString()}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <LayoutLoader />
        </div>
      )}
    </>
  );
};

export default OrderDetails;
