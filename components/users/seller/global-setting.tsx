"use client";
import LayoutLoader from "@/components/layout-loader";
import { ProfileSidebar } from "@/components/partials/profile";
import ProfileTabs from "@/components/partials/profile/profile.tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  fetchRevenuePercentageByUserId,
  saveRevenuePercentage,
  updateRevenuePercentage,
} from "@/service/revenue.service";
import { fetchSellerBasicDetailsById } from "@/service/user.service";
import { sellertabs } from "@/utils/profile-tabs";
import updateRevenuePercentageSchema from "@/validations/revenue/update-revenue.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const GlobalSetting = () => {
  const [tabs, setTabs] =
    useState<{ label: string; value: string }[]>(sellertabs);
  const [isPending, startTransition] = React.useTransition();
  const [basicinformation, setBasicInformation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const { id } = useParams();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "all",
    resolver: zodResolver(updateRevenuePercentageSchema),
    defaultValues: {
      revenue_percentage: "",
    },
  });

  // Generic function to fetch basic details based on user type
  const fetchBusinessDetails = async (id: any) => {
    setLoading(true);
    try {
      let response = await fetchSellerBasicDetailsById(id);
      const data = response?.data;
      setBasicInformation(data);
      return response?.data?.id;
    } catch (error) {
      toast.error("Error fetching business details:");
    } finally {
      setLoading(false);
    }
  };
  // Generic function to fetch revenue percentage.
  const fetchSellerRevenuePercentage = async (uuid: any, user_id?: any) => {
    setLoading(true);
    try {
      let response = await fetchRevenuePercentageByUserId(uuid);
      if (response.message == "revenue percentage not found") {
        try {
          const res: any = await saveRevenuePercentage({ user_id });
          if (res?.data) {
            setValue("revenue_percentage", String(res?.data));
          }
          return;
        } catch (error) {
          toast.error("Error fetching saving percentage:");
        }
      }
      const data = response?.data;
      setValue("revenue_percentage", String(data?.revenue_percentage));
    } catch (error) {
      toast.error("Error fetching revenue percentage:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchBusinessDetails(id).then((data) => {
          fetchSellerRevenuePercentage(id, data);
        }),
      ]);
      setLoading(false);
    };

    fetchData();
  }, [pathname, id]);

  const updateRevenuePercentageHandler = async (payload: any) => {
    startTransition(async () => {
      try {
        const pay: any = {
          uuid: id,
          revenue_percentage: payload.revenue_percentage,
        };
        const response = await updateRevenuePercentage(pay.uuid, {
          revenue_percentage: pay.revenue_percentage,
        });
        if (response?.status === false) {
          toast.error(response?.message);
          return;
        }
        fetchRevenuePercentageByUserId(id);
        toast.success(response.message);
      } catch (error: any) {
        toast.error(error?.message);
      }
    });
  };

  return (
    <>
      {loading ? (
        <LayoutLoader />
      ) : (
        <React.Fragment>
          <div className="grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-12 lg:col-span-12">
              <div className="flex items-center gap-4 justify-end mb-4"></div>
              <ProfileTabs tabs={tabs}>
                {basicinformation?.universalOnBoardingStatus === "APPROVED" ? (
                  <>
                    <div className="mt-6 m-5 flex flex-col">
                      <Label htmlFor="revenue_percentage" className="mb-3">
                        Revenue Percentage
                        <span className=" text-destructive">*</span>
                      </Label>
                      <div className="flex items-center space-x-3">
                        <div className="flex flex-row">
                          <Input
                            className="w-30"
                            id="revenue_percentage"
                            {...register("revenue_percentage")}
                            type="text"
                            placeholder="Enter revenue percentage"
                          />
                          <span className="text-xl ml-3 mt-1">%</span>
                        </div>
                      </div>
                      {errors.revenue_percentage && (
                        <div className=" text-destructive mt-1">
                          {errors.revenue_percentage.message}
                        </div>
                      )}

                      <div className="mt-8 flex flex-col items-center">
                        <div className="mt-8 flex justify-between">
                          <Button
                            type="submit"
                            onClick={handleSubmit(
                              updateRevenuePercentageHandler
                            )}
                            className="m-5 mt-0 ml-0"
                          >
                            {isPending ? "Please Wait..." : "Update"}
                          </Button>
                        </div>
                      </div>
                    </div>
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

export default GlobalSetting;
