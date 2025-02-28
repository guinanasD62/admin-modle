import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React from "react";

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  errors?: any;
}

const CountryForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  errors,
}) => {
  return (
    <>
      <ScrollArea className="h-full">
        <div className=" space-y-3">
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Country Name")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter country name")}
              {...register("country_name")}
              className={cn("", {
                "border-destructive": errors.country_name,
              })}
            />
            {errors.country_name && (
              <div className=" text-destructive">
                {trans(errors.country_name.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("ISO Code")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter iso code")}
              {...register("iso_code")}
              className={cn("", {
                "border-destructive": errors.iso_code,
              })}
            />
            {errors.iso_code && (
              <div className=" text-destructive">
                {trans(errors.iso_code.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Mobile Code")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter mobile code")}
              {...register("mobile_code")}
              className={cn("", {
                "border-destructive": errors.mobile_code,
              })}
            />
            {errors.mobile_code && (
              <div className=" text-destructive">
                {trans(errors.mobile_code.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Currency Code")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter currency code")}
              {...register("currency_code")}
              className={cn("", {
                "border-destructive": errors.currency_code,
              })}
            />
            {errors.currency_code && (
              <div className=" text-destructive">
                {trans(errors.currency_code.message)}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default CountryForm;
