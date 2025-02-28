import { z } from "zod";

const manageShippingSchema = z.object({
  provider_name: z.string().min(1, { message: "Please enter provider name" }),
  rates: z.number().min(1, { message: "Please enter rates" }),
  service_area:  z.string().min(1, { message: "Please select service area" }),
  shipping_method: z.string().min(1, { message: "Please enter shipping methods" }),
  api_key: z.string().min(1, { message: "Please enter api key" }),
});

export default manageShippingSchema;

