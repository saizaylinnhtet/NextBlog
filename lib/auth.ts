"use server"

import { redirect } from "next/navigation";
import { createCookie } from "./cookie";
import { comparePassword, generateHashPassword, generateSessionToken } from "./password-helper";
import { SignInFormData, SignInResult, SignUpFormData } from "./type";
import { prisma } from "@/lib/prisma"
import { SignUpResult } from "./type";
import { cookies } from "next/headers";

export async function signup(formData: SignUpFormData): Promise<SignUpResult | undefined> {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: formData.email
        }
    })
    if (existingUser) return { userId: null, success: false, message: 'User with this email already exist.' }
    try {
        const [user, session] = await prisma.$transaction(async (tx) => {
            const hash = await generateHashPassword(formData.password)
            const user = await tx.user.create({
                data: {
                    name: formData.name,
                    email: formData.email,
                    password: hash
                },
            });
            const token = generateSessionToken()
            const session = await tx.session.create({
                data: {
                    token: token,
                    userId: user.id,
                    expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
                }
            })
            return [user, session]
        })
        await createCookie(session.token)
    } catch(error) {
        if (error instanceof Error) {
            console.error(error.message)
            return {
                success: false,
                message: error.message,
                userId: null
            }
        }
        console.error('Unknown error')
        return {
            success: false,
            message: 'Something went wrong.',
            userId: null
        }
    }
    redirect('/')
}

export async function signin(formData: SignInFormData): Promise<SignInResult | undefined> {
    const user = await prisma.user.findUnique({
        where: {
            email: formData.email
        }
    })
    if (!user) return { userId: null, success: false, message: 'User not found.' }
    const passwordMatch = await comparePassword(formData.password, user.password)
    if (!passwordMatch) return { userId: null, success: false, message: 'Wrong password.' }
    const token = generateSessionToken()
    try{
        const session = await prisma.session.create({
            data: {
                token: token,
                userId: user.id,
                expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            }
        })
        await createCookie(session.token)
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
            return {
                success: false,
                message: error.message,
                userId: null
            }
        }
        console.error('Unknown error')
        return {
            success: false,
            message: 'Something went wrong.',
            userId: null
        }
    }
    redirect('/')
    
}

export async function logout() {
    const cookieStore = await cookies()
    const token = cookieStore.get("session_token")?.value
    if (token) {
        await prisma.session.delete({ where: { token } })
        cookieStore.delete("session_token")
    }
    redirect("/auth/sign-in")
}