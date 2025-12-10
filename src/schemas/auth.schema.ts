import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 아닙니다" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
