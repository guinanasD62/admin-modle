import { z } from "zod";

const categorySchema = z.object({
    industry_id: z.string()
        .min(1, { message: "Please select industry" }),
    category_type: z.string()
        .min(1, { message: "Please select category type" }),
    category_name: z.string()
        .min(1, { message: "Please enter category name" }),
    category_description: z.string()
        .min(1, { message: "Please enter category description" })
        .max(500, { message: "Category description must be less than 500 characters" }),
    meta_title: z.string()
        .optional(),
    meta_keywords: z.string()
        .optional(),
    meta_description: z.string()
        .max(500, { message: "Meta description must be less than 500 characters" })
        .optional(),
});

export default categorySchema;
