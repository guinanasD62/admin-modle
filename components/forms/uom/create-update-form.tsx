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
import { default as MultiSelect } from "react-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import toast from "react-hot-toast";
import { fetchCategoryDropdown } from "@/service/category.service";
import { fetchRoundingRule, fetchRoundingValue } from "@/service/uom.service";

interface IFormProps {
    trans: any;
    isPending: boolean;
    register?: any;
    control?: any;
    errors?: any;
    roundingRule?: string;
}

interface Category {
    uuid: string;
    category_name: string;
}

const UomForm: React.FC<IFormProps> = ({
    trans,
    isPending,
    register,
    control,
    errors,
    roundingRule,
}) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [roundingRules, setRoudningRules] = useState<[]>([]);
    const [roundingValues, setRoudningValues] = useState<[]>([]);
    const [selectedRoundingRule, setSelectedRoundingRule] = useState<string>("");

    useEffect(() => {
        fetchCategory();
        fetchRoundingRuleData();
        fetchRoundingValueData();
    }, []);

    useEffect(() => {
        // Fetch rounding values only if the selected rounding rule is "Decimal"
        if (selectedRoundingRule === "DECIMAL") {
            fetchRoundingValueData();
        }
    }, [selectedRoundingRule]);

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

    //Function to fetch rounding rule
    const fetchRoundingRuleData = async () => {
        try {
            const response = await fetchRoundingRule();
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
            }
            setRoudningRules(response?.data);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    //Function to fetch rounding value
    const fetchRoundingValueData = async () => {
        try {
            const response = await fetchRoundingValue();
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
            }
            setRoudningValues(response?.data);
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
                                className={`${true ? "border-red-500" : "border-gray-300"}`}
                                isMulti
                                options={categories.map((category) => ({
                                    value: category.uuid,
                                    label: category.category_name,
                                }))}
                                value={categories
                                    .filter((category) => value?.includes(category.uuid))
                                    .map((category) => ({
                                        value: category.uuid,
                                        label: category.category_name,
                                    }))}
                                onChange={(selected: any) => {
                                    onChange(
                                        selected ? selected.map((item: any) => item.value) : []
                                    );
                                }}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: errors?.category_ids
                                            ? "#EF4444"
                                            : baseStyles.borderColor,
                                        '&:hover': {
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
                        {trans("UOM Code")} <span className=" text-destructive">*</span>
                    </Label>
                    <Input
                        type="text"
                        size="lg"
                        placeholder={trans("Enter UOM code")}
                        disabled={isPending}
                        {...register("uom_code")}
                        className={cn("", {
                            "border-destructive": errors?.uom_code,
                        })}
                    />
                    {errors.uom_code && (
                        <div className=" text-destructive">
                            {trans(errors.uom_code.message)}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Label>
                        {trans("Rounding rule")}{" "}
                        <span className=" text-destructive">*</span>
                    </Label>
                    <Controller
                        control={control}
                        name="rounding_rule"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select
                                onValueChange={(val) => {
                                    onChange(val);
                                    setSelectedRoundingRule(val); // Update selected rounding rule
                                }}
                                value={value ? value : undefined}
                            >
                                <SelectTrigger color={errors?.rounding_rule && "destructive"}>
                                    <SelectValue
                                        placeholder={trans("Select rounding rule")}
                                        className="whitespace-nowrap"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {roundingRules.map(
                                        (roundingRule: any, roundingRuleIndex: number) => {
                                            return (
                                                <SelectItem
                                                    key={roundingRuleIndex}
                                                    value={roundingRule.toUpperCase()}
                                                >
                                                    {roundingRule}
                                                </SelectItem>
                                            );
                                        }
                                    )}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.rounding_rule && (
                        <div className=" text-destructive">
                            {trans(errors.rounding_rule.message)}
                        </div>
                    )}
                </div>
                {(selectedRoundingRule === "DECIMAL" ||
                    (roundingRule === "DECIMAL" &&
                        selectedRoundingRule !== "INTEGER")) && (
                        <>
                            <div className="flex flex-col gap-2">
                                <Label>
                                    {trans("Rounding value")}{" "}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Controller
                                    control={control}
                                    name="rounding_value"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <Select
                                            onValueChange={onChange}
                                            value={value ? value : undefined}
                                        >
                                            <SelectTrigger
                                                color={errors?.rounding_value && "destructive"}
                                            >
                                                <SelectValue
                                                    placeholder={trans("Select rounding value")}
                                                    className="whitespace-nowrap"
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roundingValues.map(
                                                    (roundingValue: any, roundingValueIndex: number) => (
                                                        <SelectItem
                                                            key={roundingValueIndex}
                                                            value={roundingValue.toUpperCase()}
                                                        >
                                                            {roundingValue}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.rounding_value && (
                                    <div className="text-destructive">
                                        {trans(errors.rounding_value.message)}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>
                                    {trans("Decimal scale")}{" "}
                                    <span className=" text-destructive">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    size="lg"
                                    placeholder={trans("Enter decimal scale")}
                                    disabled={isPending}
                                    {...register("decimal_scale")}
                                    className={cn("", {
                                        "border-destructive": errors?.decimal_scale,
                                    })}
                                />
                                {errors.decimal_scale && (
                                    <div className=" text-destructive">
                                        {trans(errors.decimal_scale.message)}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                <div className="flex flex-col gap-2">
                    <Label>{trans("Description")}</Label>
                    <Input
                        type="text"
                        size="lg"
                        placeholder={trans("Enter description")}
                        disabled={isPending}
                        {...register("description")}
                        className={cn("", {
                            "border-destructive": errors?.description,
                        })}
                    />
                    {errors.description && (
                        <div className=" text-destructive">
                            {trans(errors.description.message)}
                        </div>
                    )}
                </div>
            </div>
        </ScrollArea>
    );
};

export default UomForm;