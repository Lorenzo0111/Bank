import { z } from "zod";

export const externalSchema = z.object({
  number: z.string().length(16),
  cvc: z.string().length(3),
  expiry: z
    .string()
    .length(7)
    .regex(/^\d{2}\/\d{4}$/), // MM/YYYY
  ownerName: z.string().min(1),
  description: z.string().min(1),
  amount: z.number().positive(),
  target: z.string().min(1),
});
export type authorizeSchemaType = z.infer<typeof externalSchema>;
