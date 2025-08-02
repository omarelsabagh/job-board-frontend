import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type FormFields = z.infer<typeof registerSchema>;
