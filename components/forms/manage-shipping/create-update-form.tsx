"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  control?: any;
  watch?: any;
  errors?: any;
  setValue?: any;
  clearErrors?: any;
  resetField?: any;
  action?: any;
}

const ManageShippingForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register, 
  control,
  watch,
  setValue, 
  errors,
  action,
}) => {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-5 mb-2">
        <div className="flex flex-col gap-2">
          <Label>{trans('Provider Name')} <span className="text-destructive">*</span></Label>
          <Input
            disabled={isPending}
            type="text"
            size="lg"
            placeholder={trans("Enter Provider name")}
            {...register("provider_name")}
          />
          {errors?.provider_name && (
            <div className=" text-destructive">
              {trans(errors.provider_name.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
  <Label>{trans('Service Areas')} <span className="text-destructive">*</span></Label>
  <Controller
    control={control}
    name="service_area"
    render={({ field }) => (
      <Select
        value={field.value || "Global"}
        onValueChange={field.onChange} 
      >
        <SelectTrigger>
          <SelectValue placeholder={trans("Select Service areas")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="India">{trans("India")}</SelectItem>
          <SelectItem value="Global">{trans("Global")}</SelectItem>
        </SelectContent>
      </Select>
    )}
  />
  {errors?.service_area && (
    <div className="text-destructive">
      {trans(errors.service_area.message)}
    </div>
  )}
</div>

        <div className="flex flex-col gap-2">
          <Label>{trans('Shipping Methods')} <span className="text-destructive">*</span></Label>
          <Input
            disabled={isPending}
            type="text"
            size="lg"
            placeholder={trans("Enter Shipping methods")}
            {...register("shipping_method")}
          />
          {errors?.shipping_method && (
            <div className=" text-destructive">
              {trans(errors.shipping_method.message)}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label>{trans('Rates')} <span className="text-destructive">*</span></Label>
          <Input
            disabled={isPending}
            type="number"
            size="lg"
            placeholder={trans("Enter Rates")}
            {...register("rates", {
              valueAsNumber: true, // Ensure value is treated as a number
              required: true, // Ensure this field is required
              validate: {
                isValidNumber: (value: number)  => !isNaN(value) || trans("Please enter a valid number"), 
              },
            })}
            min="0" 
          />
          {errors?.rates && (
            <div className="text-destructive">
              {trans(errors.rates.message)}
            </div>
          )}
        </div>


        <div className="flex flex-col gap-2">
          <Label>{trans('Api Key')} <span className="text-destructive">*</span></Label>
          <Input
            disabled={isPending}
            type="text"
            size="lg"
            placeholder={trans("Enter Api Key")}
            {...register("api_key")}
          />
          {errors?.api_key && (
            <div className=" text-destructive">
              {trans(errors.api_key.message)}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ManageShippingForm;

