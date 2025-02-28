import { z } from "zod";

const adminUserSchema = z.object({
    first_name: z.string().min(1, { message: "Please enter first name" }),
    last_name: z.coerce
        .string()
        .min(1, { message: "Please enter last name" }),
    email: z
        .string()
        .min(1, { message: "Please enter email name" }),
    mobile_number: z.string().min(10, { message: "Mobile number must be at least 10 characters" }),
    password: z.string().min(1, { message: "Please enter password" }),
    confirm_password: z.string().min(1, { message: "Please enter confirm password" }),
    meta_title: z.string().optional(),
    meta_keywords: z.string().optional(),
    meta_description: z
        .string()
        .max(100, { message: "Meta description must be less than 100 characters" })
        .optional(),
});

export default adminUserSchema;
