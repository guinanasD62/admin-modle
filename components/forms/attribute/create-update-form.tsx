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
import { ScrollArea } from "@/components/ui/scroll-area";
import toast from "react-hot-toast";
import { fetchCategoryDropdown } from "@/service/category.service";
import { Checkbox } from "@/components/ui/checkbox";

interface IFormProps {
    trans: any;
    isPending: boolean;
    register?: any;
    control?: any;
    errors?: any;
}

interface Category {
    uuid: string;
    category_name: string;
}

const AttributeForm: React.FC<IFormProps> = ({
    trans,
    isPending,
    register,
    control,
    errors,
}) => {
    const [categories, setCategories] = useState<Category[]>([]);

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
                        {trans('Category')} <span className=" text-destructive">*</span>
                    </Label>
                    <Controller
                        control={control}
                        name="category_id"
                        render={({ field: { onChange, value, } }) => (
                            <Select onValueChange={onChange} value={(value) ? value : undefined}>
                                <SelectTrigger color={errors?.category_id && "destructive"}>
                                    <SelectValue placeholder={trans('Select category')} className="whitespace-nowrap" />
                                </SelectTrigger>
                                <SelectContent>
                                    <ScrollArea>
                                        <div className="max-h-[300px] overflow-y-scroll">
                                        {
                                            categories.map((category: any, categoryIndex: number) => {
                                                return (
                                                    <SelectItem key={categoryIndex} value={category.uuid}>{category.category_name}</SelectItem>
                                                )
                                            })
                                        }
                                        </div>
                                    </ScrollArea>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.category_id && (
                        <div className=" text-destructive">
                            {trans(errors.category_id.message)}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Label>
                        {trans("Attribute Name")} <span className=" text-destructive">*</span>
                    </Label>
                    <Input
                        type="text"
                        size="lg"
                        placeholder={trans("Enter attribute name")}
                        disabled={isPending}
                        {...register("attribute_name")}
                        className={cn("", {
                            "border-destructive": errors?.attribute_name,
                        })}
                    />
                    {errors.attribute_name && (
                        <div className=" text-destructive">
                            {trans(errors.attribute_name.message)}
                        </div>
                    )}
                </div>
                <div className="mt-5 mb-8 flex flex-wrap gap-2">
                    <div className="flex-1 flex items-center gap-1.5">
                        <Controller
                            name="is_required"
                            control={control}
                            defaultValue={false}
                            render={({ field: { value, onChange } }) => (
                                <Checkbox
                                    id="is_required"
                                    checked={value}
                                    onCheckedChange={(checked) => {
                                        onChange(checked);
                                    }}
                                >
                                    {trans("Is required?")}
                                </Checkbox>
                            )}
                        />
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
};

export default AttributeForm;