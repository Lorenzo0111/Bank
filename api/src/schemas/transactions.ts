import { z } from "zod";

export const transactionSchema = z.object({
  target: z.string().cuid(),
  amount: z.number().min(0),
  description: z.string().max(255).optional(),
});
export type transactionSchemaType = z.infer<typeof transactionSchema>;
