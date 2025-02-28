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
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import toast from "react-hot-toast";
import { fetchFaqTypes } from "@/service/faq.service";
import { fetchFaqCategoryForDropdown } from "@/service/faq-category.service";

interface IFormProps {
    trans: any;
    isPending: boolean;
    register?: any;
    control?: any;
    errors?: any;
}

interface FaqCategory {
    uuid: string;
    category_name: string;
}

const FaqForm: React.FC<IFormProps> = ({
    trans,
    isPending,
    register,
    control,
    errors,
}) => {
    const [faqCategories, setFaqCategories] = useState<FaqCategory[]>([]);
    const [faqTypes, setFaqTypes] = useState<[]>([]);

    useEffect(() => {
        fetchFaqCategory();
        fetchFaqType();
    }, []);

    //Function to fetch categories
    const fetchFaqCategory = async () => {
        try {
            const response = await fetchFaqCategoryForDropdown();
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
            }
            setFaqCategories(response?.data);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    //Function to fetch faq types
    const fetchFaqType = async () => {
        try {
            const response = await fetchFaqTypes();
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
            }
            setFaqTypes(response?.data);
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
                        name="faq_category_id"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                onValueChange={onChange}
                                value={value ? value : undefined}
                            >
                                <SelectTrigger color={errors?.faq_category_id && "destructive"}>
                                    <SelectValue
                                        placeholder={trans("Select category")}
                                        className="whitespace-nowrap"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {faqCategories?.map((category: any, categoryIndex: number) => {
                                        return (
                                            <SelectItem key={categoryIndex} value={category.uuid}>
                                                {category.category_name}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.faq_category_id && (
                        <div className=" text-destructive">
                            {trans(errors.faq_category_id.message)}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Label>
                        {trans("FAQ Type")} <span className="text-destructive">*</span>
                    </Label>
                    <Controller
                        control={control}
                        name="faq_type"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select
                                onValueChange={onChange}
                                value={value ? value : undefined}
                            >
                                <SelectTrigger color={errors?.faq_type && "destructive"}>
                                    <SelectValue
                                        placeholder={trans("Select faq type")}
                                        className="whitespace-nowrap"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {faqTypes?.map((faqType: any, faqTypeIndex: number) => (
                                        <SelectItem key={faqTypeIndex} value={faqType.toUpperCase()}>
                                            {faqType}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.faq_type && (
                        <div className="text-destructive">
                            {trans(errors.faq_type.message)}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Label>
                        {trans("Question")} <span className=" text-destructive">*</span>
                    </Label>
                    <Input
                        type="text"
                        size="lg"
                        placeholder={trans("Enter question")}
                        disabled={isPending}
                        {...register("question")}
                        className={cn("", {
                            "border-destructive": errors?.question,
                        })}
                    />
                    {errors.question && (
                        <div className=" text-destructive">
                            {trans(errors.question.message)}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Label>
                        {trans("Answer")} <span className=" text-destructive">*</span>
                    </Label>
                    <Textarea
                        placeholder={trans("Enter answer")}
                        rows={4}
                        disabled={isPending}
                        {...register("answer")}
                        className={cn("", {
                            "border-destructive": errors?.answer,
                        })}
                    />
                    {errors.answer && (
                        <div className=" text-destructive">
                            {trans(errors.answer.message)}
                        </div>
                    )}
                </div>
            </div>
        </ScrollArea>
    );
};

export default FaqForm;