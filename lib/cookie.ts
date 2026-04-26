'use server'

import { cookies } from "next/headers"

export async function checkCookie(cookie: string): Promise<boolean> {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has(cookie)
    return hasCookie
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