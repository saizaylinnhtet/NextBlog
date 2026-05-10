import { z } from "zod";
import { createBlogSchema, signInSchema, signUpSchema } from '@/lib/schema'
import { Session, User, Blog, BlogReaction, Comment } from "@/generated/prisma/client"


export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type CreateBlogFormData = z.infer<typeof createBlogSchema>;

export type SignUpResult = {
    success: boolean
    message: string
    userId: string | null
}

export type SignInResult = SignUpResult

export type checkCookieType = Session & { user: Pick<User, "id" | "name" | "email"> } | null

export type uploadBlogType = Pick<Blog, "title" | "content" | "images">

export type BlogWithRelationsType = Blog & {
    user: Pick<User, "id" | "name" | "email">
    reactions: BlogReaction[]
    comments: Pick<Comment, "id">[]
  }

export type { BlogReaction, ReactionType } from "@/generated/prisma/client"
