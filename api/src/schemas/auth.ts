import { z } from "zod";

export const passwordItem = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
    "auth.invalid_password",
  );

export const registerSchema = z
  .object({
    name: z.string().min(1).max(255),
    surname: z.string().min(1).max(255),
    birthdate: z.string().date(),
    email: z.string().email(),
    password: passwordItem,
    confirm_password: passwordItem,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
  });
export type registerSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: passwordItem,
});
export type loginSchemaType = z.infer<typeof loginSchema>;
