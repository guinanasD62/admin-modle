import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { fetchAttributeForDropdown } from "@/service/attribute.service";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IFormProps {
    trans: any;
    isPending: boolean;
    register?: any;
    control?: any;
    errors?: any;
}

interface Attribute {
    uuid: string;
    attribute_name: string;
}

const AttributeValueForm: React.FC<IFormProps> = ({
    trans,
    isPending,
    register,
    control,
    errors,
}) => {
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    useEffect(() => {
        fetchAttributes();
    }, []);

    //Function to fetch attributes
    const fetchAttributes = async () => {
        try {
            const response = await fetchAttributeForDropdown();
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
            }
            setAttributes(response?.data);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    return (
        <div className=" space-y-5 mb-2">
            <div className="flex flex-col gap-2">
                <Label>
                    {trans('Attribute')} <span className=" text-destructive">*</span>
                </Label>
                <Controller
                    control={control}
                    name="attribute_id"
                    render={({ field: { onChange, value, } }) => (
                        <Select onValueChange={onChange} value={(value) ? value : undefined}>
                            <SelectTrigger color={errors?.attribute_id && "destructive"}>
                                <SelectValue placeholder={trans('Select attribute')} className="whitespace-nowrap" />
                            </SelectTrigger>
                            <SelectContent>
                                <ScrollArea className="h-[350px]">
                                    {
                                        attributes.map((attribute: any, attributeIndex: number) => {
                                            return (
                                                <SelectItem key={attributeIndex} value={attribute.uuid}>{attribute.attribute_name}</SelectItem>
                                            )
                                        })
                                    }
                                </ScrollArea>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.attribute_id && (
                    <div className=" text-destructive">
                        {trans(errors.attribute_id.message)}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <Label>{trans('Attribute Value Name')} <span className="text-destructive">*</span></Label>
                <Input
                    disabled={isPending}
                    type="text"
                    size="lg"
                    placeholder={trans("Enter attribute value name")}
                    {...register("attribute_value_name")}
                    className={cn("", {
                        "border-destructive": errors?.attribute_value_name,
                    })}
                />
                {errors.attribute_value_name && (
                    <div className=" text-destructive">
                        {trans(errors?.attribute_value_name?.message)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttributeValueForm;
