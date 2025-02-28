import { z } from "zod";

const PaymentModeSchema = z
  .object({
    payment_methods:  z.string().min(1, { message: "Please select payment type" }),
    payment_providers: z.array(z.string()),
  })
  .refine(
    (data) => {
      if (!data.payment_methods ) {
        return false;
      }
      return true;
    },
    {
      message: "Please select payment provider",
    }
  );
 
export default PaymentModeSchema;
