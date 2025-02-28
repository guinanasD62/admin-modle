import { z } from "zod";

const isContentEmpty = (content: string) => {
  const strippedContent = content.replace(/<[^>]*>/g, "").trim();
  return strippedContent.length === 0;
};

const emailTemplateSchema = z.object({
  template_name: z.string().min(1, { message: "Please enter template name" }),
  subject: z.string().min(1, { message: "Please enter subject" }),
  html_content: z
    .string()
    .min(1, { message: "Please enter content" })
    .refine((value) => !isContentEmpty(value), {
      message: "Please enter content",
    }),
});

export default emailTemplateSchema;
