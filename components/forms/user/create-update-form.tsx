import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { default as MultiSelect } from "react-select";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import FileUploaderSingle from "@/components/ui/file-uploader-single";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

const AdminUserForm: React.FC<IFormProps> = ({
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

    return (
        <ScrollArea className="h-full w-full overflow-auto">
            <div className="space-y-8 mb-6 flex">
                {/* Left Column: File Upload */}
                <div className="w-[300px] md:w-[350px] h-[400px] md:h-[500px] pr-4 flex-[0.3]">
                    <div className="flex flex-col gap-4">
                        {preview ? (
                            <div className="w-full relative">
                                <Button
                                    type="button"
                                    className="absolute top-4 right-4 h-12 w-12 rounded-full bg-gray-900 text-white hover:bg-gray-700 z-20"
                                    onClick={() => setPreview("")}
                                >
                                    <span className="text-sm">
                                        <Icon icon="fa6-solid:xmark" />
                                    </span>
                                </Button>
                                <Image
                                    key="profileImage"
                                    alt="profileImage"
                                    width={50}
                                    height={50}
                                    className="w-full h-full object-cover rounded-md"
                                    src={preview}
                                />
                            </div>
                        ) : (
                            <div>
                                <Label className="text-lg">{trans("Upload Image")}</Label>
                                <div className="mt-4">
                                    <FileUploaderSingle file={file} setFile={handleSetFile} />
                                    {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Right Column: Form Inputs */}
                <div className="w-full md:w-1/2 pl-4 flex-[0.7]">
                    <div className="space-y-6">
                        <div className="flex gap-8">
                            {/* First Name */}
                            <div className="flex flex-col gap-3">
                                <Label>
                                    {trans("First Name")} <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    disabled={isPending}
                                    type="text"
                                    size="lg"
                                    placeholder={trans("Enter First Name")}
                                    {...register("first_name")}
                                    className={cn("", {
                                        "border-red-500": errors?.first_name,
                                    })}
                                />
                                {errors.first_name && (
                                    <div className="text-red-500 text-sm">{trans(errors.first_name.message)}</div>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className="flex flex-col gap-3">
                                <Label>
                                    {trans("Last Name")} <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    disabled={isPending}
                                    type="text"
                                    size="lg"
                                    placeholder={trans("Enter Last Name")}
                                    {...register("last_name")}
                                    className={cn("", {
                                        "border-red-500": errors?.last_name,
                                    })}
                                />
                                {errors.last_name && (
                                    <div className="text-red-500 text-sm">{trans(errors.last_name.message)}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-8">
                            {/* Email */}
                            <div className="flex flex-col gap-3">
                                <Label>
                                    {trans("Email")} <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    disabled={isPending}
                                    type="email"
                                    size="lg"
                                    placeholder={trans("Enter Email")}
                                    {...register("email")}
                                    className={cn("", {
                                        "border-red-500": errors?.email,
                                    })}
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-sm">{trans(errors.email.message)}</div>
                                )}
                            </div>

                            {/* Mobile */}
                            <div className="flex flex-col gap-3">
                                <Label>
                                    {trans("Mobile")} <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    disabled={isPending}
                                    type="text"
                                    size="lg"
                                    placeholder={trans("+91 0000 0000")}
                                    {...register("mobile_number")}
                                    className={cn("", {
                                        "border-red-500": errors?.mobile_number,
                                    })}
                                />
                                {errors.mobile_number && (
                                    <div className="text-red-500 text-sm">{trans(errors.mobile_number.message)}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-8">
                            {/* Password */}
                            <div className="flex flex-col gap-3">
                                <Label>
                                    {trans("Password")} <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    disabled={isPending}
                                    type="password"
                                    size="lg"
                                    placeholder={trans("Passw***")}
                                    {...register("password")}
                                    className={cn("", {
                                        "border-red-500": errors?.password,
                                    })}
                                />
                                {errors.password && (
                                    <div className="text-red-500 text-sm">{trans(errors.password.message)}</div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col gap-3">
                                <Label>
                                    {trans("Confirm Password")} <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    disabled={isPending}
                                    type="password"
                                    size="lg"
                                    placeholder={trans("Confirm Password")}
                                    {...register("confirm_password")}
                                    className={cn("", {
                                        "border-red-500": errors?.confirm_password,
                                    })}
                                />
                                {errors.confirm_password && (
                                    <div className="text-red-500 text-sm">{trans(errors.confirm_password.message)}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>

    );
};

export default AdminUserForm;
