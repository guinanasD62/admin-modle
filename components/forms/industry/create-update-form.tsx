import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  errors?: any;
}

const IndustryForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  errors,
}) => {  
  return (
    <div className=" space-y-5 mb-2">
      <div className="flex flex-col gap-2">
        <Label>{trans('Industry Name')} <span className="text-destructive">*</span></Label>
        <Input
          disabled={isPending}
          type="text"
          size="lg"
          placeholder={trans("Enter industry name")}
          {...register("industry_name")}
          className={cn("", {
            "border-destructive": errors.industry_name,
          })}
        />
        {errors.industry_name && (
          <div className=" text-destructive">
            {trans(errors.industry_name.message)}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndustryForm;
