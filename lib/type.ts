import { z } from "zod";
import { signInSchema, signUpSchema } from '@/lib/schema'
import { Session, User } from "@/generated/prisma/client"


export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;

export type SignUpResult = {
    success: boolean
    message: string
    userId: string | null
}

export type SignInResult = SignUpResult

export type checkCookieType = Session & { user: Pick<User, "id" | "name" | "email"> } | null