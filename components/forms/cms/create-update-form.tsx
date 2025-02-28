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
import QuillEditor from "@/components/ui/text-editor";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  watch?: any;
  setValue?: any;
  trigger?: any;
  control?: any;
  errors?: any;
}

const CmsForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  watch,
  setValue,
  trigger,
  control,
  errors,
}) => {
  return (
    <>
      <ScrollArea className="h-full">
        <div className=" space-y-3">
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
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Type")}
              <span className="text-destructive">*</span>
            </Label>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  onValueChange={onChange}
                  value={value ? value : undefined}
                >
                  <SelectTrigger color={errors?.type && "destructive"}>
                    <SelectValue
                      placeholder={trans("Select type")}
                      className="whitespace-nowrap"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"SELLER"}>SELLER</SelectItem>
                    <SelectItem value={"CONSUMER"}>CONSUMER</SelectItem>
                    <SelectItem value={"FINANCIER"}>FINANCIER</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <div className=" text-destructive">
                {trans(errors.type.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Content")}
              <span className="text-destructive">*</span>
            </Label>
            <Controller
              name="content"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <QuillEditor
                  value={value}
                  onChange={onChange}
                  className={cn("border", {
                    "border-destructive": errors.content,
                  })}
                />
              )}
            />
            {errors.content && (
              <div className=" text-destructive">
                {trans(errors.content.message)}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default CmsForm;
