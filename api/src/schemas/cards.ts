import { z } from "zod";

export const updateCardSchema = z.object({
  name: z.string().min(1).optional(),
});
export type updateCardSchemaType = z.infer<typeof updateCardSchema>;
