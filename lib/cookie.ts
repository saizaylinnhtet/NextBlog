'use server'

import { cookies } from "next/headers"
import { prisma } from "./prisma"
import { checkCookieType } from "./type";


export async function checkCookie(): Promise<checkCookieType> {
    const cookieStore = await cookies()
    const token = cookieStore.get('session_token')?.value;
    if (!token) return null
    const session  = await prisma.session.findUnique({
      where: { token },
      include: { user: {select: { id: true, name: true, email: true } } }
    })
    if (!session || session.expiredAt < new Date()) return null
    return session
}

export async function createCookie(token: string) {
    const cookieStore = await cookies()
    cookieStore.set({
      name: "session_token",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7
    })
}