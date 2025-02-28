import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});

export default loginSchema;
