import * as z from "zod";

export const signUpSchema = z.object({
  name: z.string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters"),
});

export const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string(),
});

export const createBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().max(500, "Content should not exceed 100 characters"),
  images: z.array(z.instanceof(File)).optional(),
});