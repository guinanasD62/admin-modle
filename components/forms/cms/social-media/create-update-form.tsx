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

const SocialMediaForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  errors,
}) => {
  return (
    <ScrollArea className="h-full">
      <div className=" space-y-5 mb-2">
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Title")} <span className="text-destructive">*</span>
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
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Link")} <span className="text-destructive">*</span>
          </Label>
          <Input
            disabled={isPending}
            type="text"
            size="lg"
            placeholder={trans("Enter link")}
            {...register("link")}
            className={cn("", {
              "border-destructive": errors.link,
            })}
          />
          {errors.link && (
            <div className=" text-destructive">
              {trans(errors.link.message)}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default SocialMediaForm;
