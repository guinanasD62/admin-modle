import { z } from "zod";

const uomSchema = z.object({
    uom_code: z
        .string()
        .min(1, { message: "Please enter uom code" })
        .regex(/^[A-Za-z\s]+$/, {
            message: "UOM Code must contain only alphabetic characters",
        }),
    category_ids: z.coerce
        .string()
        .min(1, { message: "Please select at least one category" }),
    rounding_rule: z
        .string()
        .min(1, { message: "Please select rounding rule" }),
    rounding_value: z
        .string()
        .optional(),
    decimal_scale: z.coerce.string()
        .optional(),
    description: z.string().optional()
}).refine(data => {
    if (data.rounding_rule === "DECIMAL") {
        return data.rounding_value && data.rounding_value.length > 0;
    }
    return true;
}, {
    message: "Please select rounding value",
    path: ["rounding_value"],
}).refine(data => {
    if (data.rounding_rule === "DECIMAL") {
        if (!data.decimal_scale || data.decimal_scale.length === 0) {
            return false;
        }

        if (!/^\d+$/.test(data.decimal_scale)) {
            return false;
        }

        // Check if decimal_scale is between 0 and 9
        const numValue = parseInt(data.decimal_scale, 10);
        return numValue >= 0 && numValue <= 9;
    }
    return true;
}, {
    message: "Please enter a valid decimal scale between 0 and 9",
    path: ["decimal_scale"],
});

export default uomSchema;