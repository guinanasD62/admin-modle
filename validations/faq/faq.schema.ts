import { z } from "zod";

const faqSchema = z.object({
    question: z
        .string()
        .min(1, { message: "Please enter question" }),
    answer: z
        .string()
        .min(1, { message: "Please enter answer" }),
    faq_category_id: z.coerce
        .string()
        .min(1, { message: "Please select category" }),
    faq_type: z.coerce
        .string()
        .min(1, { message: "Please select faq type" }),

});

export default faqSchema;
