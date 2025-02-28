import { z } from "zod";

const countrySchema = z.object({
  country_name: z
    .string()
    .min(1, { message: "Please enter country name" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Name must contain only alphabetic characters",
    }),
  iso_code: z
    .string()
    .min(1, { message: "Please enter ISO code" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "ISO code must contain only alphabetic characters",
    }),
  mobile_code: z
    .string()
    .min(1, { message: "Please enter mobile code" })
    .regex(/^\d+$/, { message: "Mobile code must be a number" }),
  currency_code: z
    .string()
    .min(1, { message: "Please enter currency code" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Currency code must contain only alphabetic characters",
    }),
});

export default countrySchema;
