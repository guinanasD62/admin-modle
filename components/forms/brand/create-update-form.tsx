import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { default as MultiSelect } from "react-select";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import FileUploaderSingle from "@/components/ui/file-uploader-single";
import { Controller } from "react-hook-form";
import { fetchCategoryDropdown } from "@/service/category.service";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ICategory {
  id: number;
  uuid: string;
  category_name: string;
}

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
  preview: any;
  setPreview: any;
}

const BrandForm: React.FC<IFormProps> = ({
  trans,
  isPending,
  register,
  control,
  errors,
  file,
  setFile,
  preview,
  setPreview,
}) => {
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      validateFile(file);
    }
  }, [file]);

  const validateFile = (file: FileWithPreview): string | true => {
    if (!file.type.startsWith("image/")) return "Only image files are allowed";
    if (file.size > 2 * 1024 * 1024) return "File size should be less than 2MB";
    return true;
  };

  const handleSetFile = (selectedFile: FileWithPreview | null) => {
    if (selectedFile) {
      const validation = validateFile(selectedFile);
      if (validation !== true) {
        setFileError(validation as string);
      } else {
        setFileError(null);
      }
    }
    setFile(selectedFile);
  };

  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    fetchCategory();
  }, []);

  //Function to fetch categories
  const fetchCategory = async () => {
    try {
      const response = await fetchCategoryDropdown();
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setCategories(response?.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-5 mb-2">
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Category")} <span className=" text-destructive">*</span>
          </Label>
          <Controller
            control={control}
            name="category_ids"
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                className={`${
                  errors?.category_ids ? "border-red-500" : "border-gray-300"
                }`}
                isMulti
                options={categories.map((category) => ({
                  label: category.category_name,
                  value: category.uuid,
                }))}
                value={categories
                  .filter((category) => value?.includes(category.uuid))
                  .map((category) => ({
                    label: category.category_name,
                    value: category.uuid,
                  }))}
                onChange={(selected) =>
                  onChange(selected ? selected.map((item) => item.value) : [])
                }
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors?.category_ids
                      ? "#EF4444"
                      : baseStyles.borderColor,
                    "&:hover": {
                      borderColor: errors?.category_ids
                        ? "#EF4444"
                        : baseStyles.borderColor,
                    },
                  }),
                  placeholder: (baseStyles, state) => ({
                    ...baseStyles,
                    color: errors?.category_ids ? "#EF4444" : baseStyles.color,
                  }),
                }}
                placeholder={trans("Select categories")}
              />
            )}
          />
          {errors.category_ids && (
            <div className=" text-destructive">
              {trans(errors.category_ids.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Brand Name")} <span className="text-destructive">*</span>
          </Label>
          <Input
            disabled={isPending}
            type="text"
            size="lg"
            placeholder={trans("Enter brand name")}
            {...register("brand_name")}
            className={cn("", {
              "border-destructive": errors?.brand_name,
            })}
          />
          {errors.brand_name && (
            <div className=" text-destructive">
              {trans(errors.brand_name.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            {trans("Brand Description")}{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            placeholder={trans("Enter brand description")}
            rows={4}
            disabled={isPending}
            {...register("brand_description")}
            className={cn("", {
              "border-destructive": errors?.brand_description,
            })}
          />
          {errors.brand_description && (
            <div className=" text-destructive">
              {trans(errors.brand_description.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>{trans("Meta Title")}</Label>
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
            <div className=" text-destructive">
              {trans(errors.meta_title.message)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>{trans("Meta Keyword")}</Label>
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
          <Label>{trans("Meta Description")}</Label>
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
        <div className="flex flex-col gap-2">
          {preview ? (
            <>
              <div className="w-full h-full relative">
                <Button
                  type="button"
                  className="absolute top-4 right-4 h-12 w-12 rounded-full bg-default-900 hover:bg-background hover:text-default-900 z-20"
                  onClick={() => setPreview("")}
                >
                  <span className="text-sm">
                    <Icon icon="fa6-solid:xmark" />
                  </span>
                </Button>
                <Image
                  key="brandImage"
                  alt="brandImage"
                  width={50}
                  height={50}
                  className="w-full h-full object-cover rounded-md"
                  src={preview}
                />
              </div>
            </>
          ) : (
            <div>
              <Label>{trans("Upload File Here")}</Label>
              <div className="mt-4">
                <FileUploaderSingle file={file} setFile={handleSetFile} />
                {fileError && <p className="text-red-500">{fileError}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default BrandForm;
