import { z } from "zod";
import { emailString } from "./utility-schema";

export const signInSchema = z.object({
  emailAddress: emailString,
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().default(false),
});

export type SignInFormValues = z.input<typeof signInSchema>;

export const emailSchema = z.object({
  emailAddress: emailString,
});

export const forgotPasswordSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  code: z.string().min(6, { message: "Please enter the verification code" }),
});

export type EmailFormValues = z.infer<typeof emailSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
