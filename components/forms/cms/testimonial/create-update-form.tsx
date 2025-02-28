import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  errors?: any;
}

const TestimonialForm: React.FC<IFormProps> = ({
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
              {trans("Customer Name")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter customer name")}
              {...register("customer_name")}
              className={cn("", {
                "border-destructive": errors.customer_name,
              })}
            />
            {errors.customer_name && (
              <div className=" text-destructive">
                {trans(errors.customer_name.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Designation")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter designation")}
              {...register("designation")}
              className={cn("", {
                "border-destructive": errors.designation,
              })}
            />
            {errors.designation && (
              <div className=" text-destructive">
                {trans(errors.designation.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Rating")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter rating")}
              {...register("rating")}
              className={cn("", {
                "border-destructive": errors.rating,
              })}
            />
            {errors.rating && (
              <div className=" text-destructive">
                {trans(errors.rating.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Review")}
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              placeholder={trans("Enter review")}
              rows={4}
              disabled={isPending}
              {...register("review")}
              className={cn("", {
                "border-destructive": errors?.review,
              })}
            />
            {errors.review && (
              <div className=" text-destructive">
                {trans(errors.review.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Source Name")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter source name")}
              {...register("source_name")}
              className={cn("", {
                "border-destructive": errors.source_name,
              })}
            />
            {errors.source_name && (
              <div className=" text-destructive">
                {trans(errors.source_name.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Company Name")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter company name")}
              {...register("company_name")}
              className={cn("", {
                "border-destructive": errors.company_name,
              })}
            />
            {errors.company_name && (
              <div className=" text-destructive">
                {trans(errors.company_name.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Location City")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter location city")}
              {...register("location_city")}
              className={cn("", {
                "border-destructive": errors.location_city,
              })}
            />
            {errors.location_city && (
              <div className=" text-destructive">
                {trans(errors.location_city.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Title")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter title")}
              {...register("title")}
              className={cn("", {
                "border-destructive": errors.title,
              })}
            />
            {errors.title && (
              <div className=" text-destructive">
                {trans(errors.title.message)}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default TestimonialForm;
