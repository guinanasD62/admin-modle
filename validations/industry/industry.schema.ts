import { z } from "zod";

const industrySchema = z.object({
    industry_name: z.string().min(1, { message: "Please enter industry name" })
});

export default industrySchema;
