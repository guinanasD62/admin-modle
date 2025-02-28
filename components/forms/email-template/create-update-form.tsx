import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import QuillEditor from "@/components/ui/text-editor";
import { cn } from "@/lib/utils";
import React from "react";
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

const EmailTemplateForm: React.FC<IFormProps> = ({
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
              {trans("Template Name")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              readOnly={true}
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter template name")}
              {...register("template_name")}
              className={cn("", {
                "border-destructive": errors.template_name,
              })}
            />
            {errors.template_name && (
              <div className=" text-destructive">
                {trans(errors.template_name.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Subject")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              type="text"
              size="lg"
              placeholder={trans("Enter subject")}
              {...register("subject")}
              className={cn("", {
                "border-destructive": errors.subject,
              })}
            />
            {errors.subject && (
              <div className=" text-destructive">
                {trans(errors.subject.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              {trans("Content")}
              <span className="text-destructive">*</span>
            </Label>
            <Controller
              name="html_content"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <QuillEditor
                  value={value}
                  onChange={onChange}
                  className={cn("border", {
                    "border-destructive": errors.html_content,
                  })}
                />
              )}
            />
            {errors.html_content && (
              <div className=" text-destructive">
                {trans(errors.html_content.message)}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default EmailTemplateForm;
