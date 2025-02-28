import { z } from "zod";

const taxSchema = z.object({
  tax_name: z.string().min(1, { message: "Please enter tax name" }),
  description: z.string().min(1, { message: "Please enter tax description" }),
  tax_type: z.string().min(1, { message: "Please select tax type" }),
  value_type: z.string().min(1, { message: "Please select value type" }),
  tax_value: z.string().min(1, { message: "Please enter tax value" }).regex(/^\d+(\.\d{1,2})?$/, { message: "Tax value must be a valid number" })
  .transform((val) => parseFloat(val)),
}).refine(
  (data) => data.value_type !== "PERCENT" || (data.tax_value >= 0 && data.tax_value <= 100),
  {
    message: "Tax value must be between 0 and 100 when value type is percent",
    path: ["tax_value"],
  }
);;

export default taxSchema;
