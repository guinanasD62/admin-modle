import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchIndustryDropdown } from "@/service/industry.service";
import toast from "react-hot-toast";
import FileUploaderSingle from "@/components/ui/file-uploader-single";

type FileWithPreview = File & {
  preview: string;
};

interface IFormProps {
  trans: any;
  isPending: boolean;
  register?: any;
  control?: any;
  errors?: any;
  file: FileWithPreview | null;   
  setFile: (file: FileWithPreview | null) => void;  
}

interface Industry {
  uuid: string;
  industry_name: string;
}

const CategoryForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  control,
  errors,
  file,  
  setFile, 
}) => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [validateFileState, setValidateFileState] = useState<boolean>(false);

  useEffect(() => {
    fetchIndustry();
  }, []);

  //Function to fetch industries
  const fetchIndustry = async () => {
    try {
      const response = await fetchIndustryDropdown();
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setIndustries(response?.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (file) {
      setValidateFileState(true); // Enable validation when a file is present
    } else {
      setValidateFileState(false); // Disable validation when no file is present
    }
  }, [file]);

  const validateFile = (): string | true => {
    if (!file) return true;
    if (!file.type.startsWith("image/")) return "Only image files are allowed";
    if (file.size > 2 * 1024 * 1024) return "File size should be less than 2MB";
    return true;
  };

  const handleSetFile = (selectedFile: FileWithPreview | null) => {
    if (selectedFile) {
      const validation = validateFile();
      if (validation !== true) {
        setFileError(validation as string);
      } else {
        setFileError(null);
      }
    }
    setFile(selectedFile);  
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-5 mb-2">
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Industry")}
            <span className="text-destructive">*</span>
          </Label>
          <Controller
            control={control}
            name="industry_id"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                onValueChange={onChange}
                value={value ? value : undefined}
              >
                <SelectTrigger color={errors?.industry_id && "destructive"}>
                  <SelectValue
                    placeholder={trans("Select industry")}
                    className="whitespace-nowrap"
                  />
                </SelectTrigger>
                <SelectContent>
                  {industries?.map((industry: any) => {
                    return (
                      <SelectItem
                        value={industry?.uuid}
                        key={industry?.uuid}
                      >
                        {industry?.industry_name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
          {errors.industry_id && (
            <div className=" text-destructive">
              {trans(errors.industry_id.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans('Category Type')} <span className=" text-destructive">*</span>
          </Label>
          <Controller
            control={control}
            name="category_type"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select onValueChange={onChange} value={(value) ? value : undefined}>
                <SelectTrigger color={errors?.category_type && "destructive"}>
                  <SelectValue placeholder={trans('Select category type')} className="whitespace-nowrap" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRODUCT">Product</SelectItem>
                  <SelectItem value="SERVICE">Service</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category_type && (
            <div className=" text-destructive">
              {trans(errors.category_type.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans('Category Name')} <span className=" text-destructive">*</span>
          </Label>
          <Input
            type="text"
            size="lg"
            placeholder={trans('Enter category name')}
            disabled={isPending}
            {...register("category_name")}
            className={cn("", {
              "border-destructive": errors?.category_name,
            })}
          />
          {errors.category_name && (
            <div className=" text-destructive">
              {trans(errors.category_name.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans('Category Description')} <span className=" text-destructive">*</span>
          </Label>
          <Textarea
            placeholder={trans("Enter category description")}
            rows={4}
            disabled={isPending}
            {...register("category_description")}
            className={cn("", {
              "border-destructive": errors?.category_description,
            })}
          />
          {errors.category_description && (
            <div className=" text-destructive">
              {trans(errors.category_description.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans('Meta Title')}
          </Label>
          <Input
            type="text"
            size="lg"
            placeholder={trans("Enter meta title")}
            disabled={isPending}
            {...register("meta_title")}
            className={cn("", {
              "border-destructive": errors?.meta_title,
            })}
          />
          {errors.meta_title && (
            <div className=" text-destructive">{trans(errors.meta_title.message)}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans('Meta Keyword')}
          </Label>
          <Input
            type="text"
            size="lg"
            placeholder={trans("Enter meta keyword")}
            disabled={isPending}
            {...register("meta_keywords")}
            className={cn("", {
              "border-destructive": errors?.meta_keywords,
            })}
          />
          {errors.meta_keywords && (
            <div className=" text-destructive">
              {trans(errors.meta_keywords.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans('Meta Description')}
          </Label>
          <Textarea
            placeholder={trans("Enter meta description")}
            rows={4}
            disabled={isPending}
            {...register("meta_description")}
            className={cn("", {
              "border-destructive": errors?.meta_description,
            })}
          />
          {errors.meta_description && (
            <div className=" text-destructive">
              {trans(errors.meta_description.message)}
            </div>
          )}
        </div>

        <div className="mt-4">
        <Label>
            {trans('Image')}
          </Label>
          <FileUploaderSingle file={file} setFile={handleSetFile} />
          {fileError && <p className="text-red-500">{fileError}</p>}
        </div>
      </div>
    </ScrollArea>
  );
};

export default CategoryForm;
