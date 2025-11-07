import { z } from "zod";


export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const emailString = z
  .string()
  .regex(emailRegex, "Please enter a valid email address");
