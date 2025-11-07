import { z } from "zod";
import { emailString } from "./utility-schema";

export const bookSessionSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: emailString,
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  topic: z.string().min(1, "Please select a topic"),
});

export type BookSessionValues = z.infer<typeof bookSessionSchema>;
