import { z } from "zod";

const citySchema = z.object({
    country_uuid: z.string()
        .min(1, { message: "Please select country" }),
    state_uuid: z.string()
        .min(1, { message: "Please select state" }),
    city_name: z
        .string()
        .min(1, { message: "Please enter city name" })
        .regex(/^[A-Za-z\s]+$/, {
            message: "Name must contain only alphabetic characters",
        })
});

export default citySchema;