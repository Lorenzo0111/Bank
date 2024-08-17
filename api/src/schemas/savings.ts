import { z } from "zod";

export const createSavingSchema = z.object({
  name: z.string().min(1),
});
export type createSavingSchemaType = z.infer<typeof createSavingSchema>;
