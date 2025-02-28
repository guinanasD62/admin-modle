import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
});

export default forgotPasswordSchema;
