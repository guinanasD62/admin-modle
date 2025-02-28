import { z } from "zod";

const attributeValueSchema = z.object({
    attribute_id: z.string()
        .min(1, { message: "Please select attribute" }),
    attribute_value_name: z.coerce.string()
        .min(1, { message: "Please enter attribute value name" })

});

export default attributeValueSchema;