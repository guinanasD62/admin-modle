import { z } from "zod";

const isContentEmpty = (content: string) => {
  const strippedContent = content.replace(/<[^>]*>/g, "").trim();
  return strippedContent.length === 0;
};

const cmsSchema = z.object({
  title: z.string().min(1, { message: "Please enter title" }),
  type: z.string().min(1, { message: "Please select type" }),
  content: z
    .string()
    .min(1, { message: "Please enter content" })
    .refine((value) => !isContentEmpty(value), {
      message: "Please enter content",
    }),
});

export default cmsSchema;
