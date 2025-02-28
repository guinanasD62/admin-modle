import { z } from "zod";

const ratingRegex = /^[+-]?(\d+(\.\d{1})?|[0-5])$/;
const testimonialSchema = z.object({
  customer_name: z
    .string()
    .min(1, { message: "Please enter customer name" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Name must contain only alphabetic characters",
    }),
  designation: z.string().min(1, { message: "Please enter designation" }),
  rating: z
    .string()
    .min(1, { message: "Please enter rating" })
    .regex(ratingRegex, "Rating must be a valid number with at most one decimal place")
    .transform((value) => parseFloat(value))
    .refine((value) => value >= 0 && value <= 5, {
      message: "Rating must be between 0 and 5",
    }),
  review: z.string().min(1, { message: "Please enter review" }),
  source_name: z
    .string()
    .min(1, { message: "Please enter source name" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Name must contain only alphabetic characters",
    }),
  company_name: z.string().min(1, { message: "Please enter company name" }),
  location_city: z.string().min(1, { message: "Please enter location city" }),
  title: z.string().min(1, { message: "Please enter title" }),
  is_active: z
    .string()
    .optional()
    .refine((val) =>val === ""|| val === "true" || val === "false", {
      message: "is_active must be 'true', 'false"
    }),
});

export default testimonialSchema;
