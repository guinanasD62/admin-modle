import { z } from "zod";

const socialMediaSchema = z.object({
  title: z.string().min(1, { message: "Please enter title" }),
  link: z
    .string()
    .min(1, { message: "Please enter link" })
    .refine(
      (url) => {
        const urlRegex =
          /^(http:\/\/|https:\/\/|www\.)[\w-]+(\.[a-z]{2,})(\.[a-z]{2,})*(\:[0-9]+)?(\/[^\s]*)?(\?[^\s]*)?$/i;
        return urlRegex.test(url);
      },
      { message: "Invalid URL format" }
    ),
});

export default socialMediaSchema;
