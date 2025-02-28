import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { globalSettingSchema } from "@/validations";
import {
  updateGlobalSetting,
  fetchGlobalSetting,
} from "@/service/global-setting.service";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { setCookie } from "@/utils/cookie";
import { dateFormats } from "@/utils/date-format-array";

const GlobalSettingForm: React.FunctionComponent = () => {
  const t = useTranslations("GlobalSettingPage");
  const [isPending, startTransition] = React.useTransition();
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(globalSettingSchema),
    mode: "all",
    defaultValues: {
      site_name: "",
      site_email: "",
      phone: "",
      meta_title: "",
      meta_keyword: "",
      meta_description: "",
      otp_explore_time: "",
      revenue_percentage: "",
      currency_symbol: "",
      time_zone: "",
      address: "",
      footer_content: "",
      date_format: "",
    },
  });

  const fetchGlobalSettingData: any = async () => {
    const res = await fetchGlobalSetting();
    const data = res?.data;
    if (data) {
      setValue("site_name", data?.site_name);
      setValue("site_email", data?.site_email);
      setValue("phone", data?.phone);
      setValue("meta_title", data?.meta_title);
      setValue("meta_keyword", data?.meta_keyword);
      setValue("meta_description", data?.meta_description);
      setValue("otp_explore_time", data?.otp_explore_time);
      setValue("revenue_percentage", data?.revenue_percentage);
      setValue("currency_symbol", data?.currency_symbol);
      setValue("time_zone", data?.time_zone);
      setValue("date_format", data?.date_format);
      setValue("address", data?.address);
      setValue("footer_content", data?.footer_content);
    }
  };

  //UseEffect to fetch global setting data
  useEffect(() => {
    fetchGlobalSettingData();
  }, []);

  // Function to handle form submit
  const onSubmit = (data: any) => {
    data.otp_explore_time = parseInt(data.otp_explore_time);
    data.revenue_percentage = parseFloat(data.revenue_percentage);
    startTransition(async () => {
      try {
        const updateResponse: any = await updateGlobalSetting(data);
        if (
          updateResponse?.status === true &&
          updateResponse?.statusCode === 200
        ) {
          setCookie("admin_date_format", data.date_format);
          toast.success(updateResponse?.message);
        } else {
          toast.error(updateResponse?.message);
        }
      } catch (error: any) {
        toast.error(error?.message);
      }
    });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6 mt-6">
        <div>
          <Label
            htmlFor="site_name"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("Site Name")}:<span className="text-destructive">*</span>
          </Label>
          <Input
            id="site_name"
            type="text"
            placeholder="TrexoPro"
            disabled={isPending}
            {...register("site_name")}
            className={cn("", {
              "border-destructive": errors.site_name,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.site_name && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.site_name?.message}`)}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="site_email"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("Site Email")}:<span className="text-destructive">*</span>
          </Label>
          <Input
            id="site_email"
            type="email"
            placeholder="spatel1katalysttech.com"
            disabled={isPending}
            {...register("site_email")}
            className={cn("", {
              "border-destructive": errors.site_email,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.site_email && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.site_email?.message}`)}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="phone"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("Phone")}:<span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="text"
            placeholder="8806886201"
            disabled={isPending}
            {...register("phone")}
            className={cn("", {
              "border-destructive": errors.phone,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.phone && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.phone?.message}`)}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="otp_expiration_time"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("OTP Expire Time (In Minutes)")}:
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="otp_expiration_time"
            type="text"
            placeholder="3"
            disabled={isPending}
            {...register("otp_explore_time")}
            className={cn("", {
              "border-destructive": errors.otp_explore_time,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.otp_explore_time && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.otp_explore_time?.message}`)}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="revenue_percentage"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("Revenue Percentage")}:
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="revenue_percentage"
            type="string"
            placeholder="75"
            disabled={isPending}
            {...register("revenue_percentage")}
            className={cn("", {
              "border-destructive": errors.revenue_percentage,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.revenue_percentage && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.revenue_percentage?.message}`)}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="currency_symbol"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("Currency Symbol")}:<span className="text-destructive">*</span>
          </Label>
          <Controller
            control={control}
            name="currency_symbol"
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={onChange}
                value={value ? value : undefined}
              >
                <SelectTrigger color={errors?.currency_symbol && "destructive"}>
                  <SelectValue placeholder={t("Select currency symbol")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RUPEE">
                    <Icon
                      icon="heroicons:currency-rupee"
                      className="w-5 h-5 inline-block"
                    />{" "}
                    Rupee
                  </SelectItem>
                  <SelectItem value="DOLLAR">
                    <Icon
                      icon="heroicons:currency-dollar"
                      className="w-5 h-5 inline-block"
                    />{" "}
                    Dollar
                  </SelectItem>
                  <SelectItem value="EURO">
                    <Icon
                      icon="heroicons:currency-euro"
                      className="w-5 h-5 inline-block"
                    />{" "}
                    Euro
                  </SelectItem>
                  <SelectItem value="POUND">
                    <Icon
                      icon="heroicons:currency-pound"
                      className="w-5 h-5 inline-block"
                    />{" "}
                    Pound
                  </SelectItem>
                  <SelectItem value="YEN">
                    <Icon
                      icon="heroicons:currency-yen"
                      className="w-5 h-5 inline-block"
                    />{" "}
                    Yen
                  </SelectItem>
                  <SelectItem value="BANGLADESHI">
                    <Icon
                      icon="heroicons:currency-bangladeshi"
                      className="w-5 h-5 inline-block"
                    />{" "}
                    Bangladeshi
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors?.currency_symbol && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.currency_symbol?.message}`)}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="date_format"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("Date Format")} :<span className="text-destructive">*</span>
          </Label>

          <Controller
            control={control}
            name="date_format"
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={onChange}
                value={value ? value : undefined}
              >
                <SelectTrigger color={errors?.time_zone && "destructive"}>
                  <SelectValue placeholder={t("Select time zone")} />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {dateFormats.map((format, index) => (
                    <SelectItem key={index} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors?.date_format && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.date_format?.message}`)}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="timezone"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("Time Zone")} :<span className="text-destructive">*</span>
          </Label>

          <Controller
            control={control}
            name="time_zone"
            render={({ field: { onChange, value } }) => (
              <Select
                onValueChange={onChange}
                value={value ? value : undefined}
              >
                <SelectTrigger color={errors?.time_zone && "destructive"}>
                  <SelectValue placeholder={t("Select time zone")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UCT">UCT</SelectItem>
                  <SelectItem value="IST">IST</SelectItem>
                  <SelectItem value="BST">BST</SelectItem>
                  <SelectItem value="CST">CST</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors?.time_zone && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.time_zone?.message}`)}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="address"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("Address")} :
          </Label>
          <Textarea
            id="address"
            placeholder={t("Please enter address")}
            disabled={isPending}
            {...register("address")}
            className="rounded h-10"
          />
          {errors?.address && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.address?.message}`)}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="footer content"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("Footer Content")}:<span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="footer_content"
            placeholder={t("Please enter footer content")}
            disabled={isPending}
            {...register("footer_content")}
            className={cn("rounded h-10", {
              "border-destructive": errors.footer_content,
            })}
          />
          {errors?.footer_content && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.footer_content?.message}`)}
            </div>
          )}
        </div>
      </div>
      <hr className="mt-3 lg:mt-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6 mt-6">
        <div>
          <Label
            htmlFor="meta_title"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("Meta title")}:
          </Label>
          <Input
            id="meta_title"
            type="text"
            placeholder="TrexoPro"
            disabled={isPending}
            {...register("meta_title")}
            className={cn("", {
              "border-destructive": errors.meta_title,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.meta_title && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.meta_title?.message}`)}
            </div>
          )}
        </div>
        <div>
          <Label
            htmlFor="meta_keyword"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("Meta keyword")}:
          </Label>
          <Input
            id="meta_keyword"
            type="text"
            placeholder={t("Ecommerce")}
            disabled={isPending}
            {...register("meta_keyword")}
            className={cn("", {
              "border-destructive": errors.meta_keyword,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors?.meta_keyword && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.meta_keyword?.message}`)}
            </div>
          )}
        </div>

        <div>
          <Label
            htmlFor="meta description"
            className="text-sm font-medium text-default-600 mb-1"
          >
            {t("Meta Description")} :
          </Label>
          <Textarea
            id="meta_description"
            placeholder={t("Please enter meta description")}
            disabled={isPending}
            {...register("meta_description")}
            className="rounded h-10"
          />
          {errors?.meta_description && (
            <div className=" text-destructive mt-2">
              {t(`${errors?.meta_description?.message}`)}
            </div>
          )}
        </div>
      </div>
      <div className="flex-none flex items-center justify-end gap-4 mt-8">
        <Button>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? t("Loading") + "..." : t("Save")}
        </Button>
      </div>
    </form>
  );
};

export default GlobalSettingForm;
