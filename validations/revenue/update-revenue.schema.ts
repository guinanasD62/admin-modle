import { z } from "zod";

const percentageRegex = /^[0-9]*\.?[0-9]+$/;

const updateRevenuePercentageSchema = z.object({
  revenue_percentage: z
    .string()
    .min(1, { message: "Revenue percentage should not be empty" })
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Revenue percentage must be a valid number with up to 2 decimal places" })
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0 && val <= 100, { message: "Revenue percentage must be between 0 and 100" }),
});
export default updateRevenuePercentageSchema;
