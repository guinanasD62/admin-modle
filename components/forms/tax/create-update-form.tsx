import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";
import { Controller } from "react-hook-form";

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  control?: any;
  errors?: any;
}

const TaxForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  control,
  errors,
}) => {
  return (
    <ScrollArea className="h-full">
      <div className=" space-y-5 mb-2">
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Tax Name")} <span className="text-destructive">*</span>
          </Label>
          <Input
            disabled={isPending}
            type="text"
            size="lg"
            placeholder={trans("Enter tax name")}
            {...register("tax_name")}
            className={cn("", {
              "border-destructive": errors.tax_name,
            })}
          />
          {errors.tax_name && (
            <div className=" text-destructive">
              {trans(errors.tax_name.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Description")} <span className="text-destructive">*</span>
          </Label>
          <Textarea
            placeholder={trans("Enter description")}
            rows={4}
            disabled={isPending}
            {...register("description")}
            className={cn("", {
              "border-destructive": errors?.description,
            })}
          />
          {errors.description && (
            <div className=" text-destructive">
              {trans(errors.description.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Tax Type")} <span className=" text-destructive">*</span>
          </Label>
          <Controller
            control={control}
            name="tax_type"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                onValueChange={onChange}
                value={value ? value : undefined}
                disabled={isPending}
              >
                <SelectTrigger color={errors?.tax_type && "destructive"}>
                  <SelectValue
                    placeholder={trans("Select tax type")}
                    className="whitespace-nowrap"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TAX">TAX</SelectItem>
                  <SelectItem value="FEE_AND_CHARGES">
                    FEE_AND_CHARGES
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.tax_type && (
            <div className=" text-destructive">
              {trans(errors.tax_type.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Value Type")} <span className=" text-destructive">*</span>
          </Label>
          <Controller
            control={control}
            name="value_type"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                onValueChange={onChange}
                value={value ? value : undefined}
                disabled={isPending}
              >
                <SelectTrigger color={errors?.value_type && "destructive"}>
                  <SelectValue
                    placeholder={trans("Select value type")}
                    className="whitespace-nowrap"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIXED">FIXED</SelectItem>
                  <SelectItem value="PERCENT">PERCENT</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.value_type && (
            <div className=" text-destructive">
              {trans(errors.value_type.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Tax Value")} <span className="text-destructive">*</span>
          </Label>
          <Input
            disabled={isPending}
            type="text"
            size="lg"
            placeholder={trans("Enter tax value")}
            {...register("tax_value")}
            className={cn("", {
              "border-destructive": errors.tax_value,
            })}
          />
          {errors.tax_value && (
            <div className=" text-destructive">
              {trans(errors.tax_value.message)}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default TaxForm;
