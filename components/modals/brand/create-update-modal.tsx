import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { BrandForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import { closePopup } from "@/service/modal.service";
import { createBrand, updateBrand } from "@/service/brand.service";
import { brandSchema } from "@/validations";
import { getS3BasePath } from "@/config/aws";

type FileWithPreview = File & {
  preview: string;
};

interface IModalProps {
  trans: any;
}

const CreateUpdateBrandModal: React.FC<IModalProps> = ({ trans }) => {
  const AWS_URL = getS3BasePath();
  // `${AWS_URL}/brand/${row.original.id}/small/${row.original.image}`
  const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
    (state: RootState) => state.modal
  );
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [preview, setPreview] = useState<FileWithPreview | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
    setValue,
    clearErrors,
  } = useForm({
    mode: "all",
    resolver: zodResolver(brandSchema),
    defaultValues: {
      brand_name: "",
      brand_description: "",
      meta_title: "",
      category_ids: "",
      meta_keywords: "",
      meta_description: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      clearErrors();
      if (action === "edit") {
        if (data) {
          setValue("brand_name", data?.brand_name || "");
          setValue("brand_description", data?.brand_description || "");
          setValue("meta_title", data?.meta_title || "");
          setValue("meta_keywords", data?.meta_keywords || "");
          setValue("meta_description", data?.meta_description || "");
          setValue(
            "category_ids",
            data?.brandCategory.map((item: any) => item.category.uuid) || []
          );
          if (data?.image) {
            const previewUrl = AWS_URL + `/brand/${data.id}/small/${data.image}`;
            setPreview(previewUrl as any);
          } else {
            setPreview(null);
          }
        }
      } else {
        reset();
      }
    }
  }, [isOpen, action, clearErrors, reset, data]);

  const onSubmit = async (payload: any) => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        // Append all payload fields to FormData

        // Append file if it's available
        if (file) {
          formData.append("file", file);
        }

        let response: any;
        //Converting category ids in json
        let categoryIds = payload.category_ids.split(",");
        const jsonCategory = JSON.stringify(categoryIds);
        Object.keys(payload).forEach((key) => {
          if (key === "category_ids") {
            formData.append("category_ids", jsonCategory);
          } else {
            formData.append(key, payload[key]);
          }
        });
        if (action === "add") {
          response = await createBrand(formData);
        } else {
          response = await updateBrand(data?.uuid, formData);
        }
        if (response?.status === true && response?.statusCode === 200) {
          reset();
          toast.success(response?.message);
          await closePopup();
        } else {
          toast.error(response?.message || trans("An error occurred"));
        }
      } catch (error: any) {
        toast.error(error?.message || trans("An error occurred"));
      }
    });
  };

  useEffect(() => {
    if (action === "add") {
      setPreview(null);
      setFile(null);
    }
    if (action === "edit") {
      setFile(null);
    }
  }, [action]);

  const handleModalClose = async () => {
    reset();
    await closePopup();
  };
  return (
    <Dialog open={modalName === "brand" && isOpen}>
      <DialogContent size="lg" handleModalClose={handleModalClose}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="h-[350px]">
              <BrandForm
                trans={trans}
                isPending={isPending}
                register={register}
                control={control}
                errors={errors}
                file={file}
                setFile={setFile}
                preview={preview}
                setPreview={setPreview}
              />
            </div>
            <div className=" flex justify-end gap-3 mt-6">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleModalClose}
                >
                  {trans("Cancel")}
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending
                  ? trans("Loading") + "..."
                  : action === "add"
                    ? trans("Save")
                    : trans("Update")}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateBrandModal;
