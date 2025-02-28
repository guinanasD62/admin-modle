import { z } from "zod";

const attributeSchema = z.object({
    category_id: z.string()
        .min(1, { message: "Please select category" }),
    attribute_name: z
        .string()
        .min(1, { message: "Please enter attribute name" })
        .regex(/^[A-Za-z\s]+$/, {
            message: "Name must contain only alphabetic characters",
        }),
    is_required: z.coerce.boolean().optional()
});

export default attributeSchema;
