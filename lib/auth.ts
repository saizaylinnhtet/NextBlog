"use server"

import generateHashPassword from "./password-helper";
import { SignUpFormData } from "./type";
import { prisma } from "@/lib/prisma"

export async function signup(formData: SignUpFormData) {
    console.log(formData)
    const existingUser = await prisma.user.findUnique({
        where: {
            email: formData.email
        }
    })
    if (existingUser) return { userId: null, success: false, message: 'User with this email already exist.' }
    try {
        const hash = await generateHashPassword(formData.password)
        const user = await prisma.user.create({
            data: {
                name: formData.name,
                email: formData.email,
                password: hash
            },
        });
        return {
            userId: user.id,
            success: true,
            message: 'User created successfully.'
        }
    } catch {
        console.log('Error')
    }
    
}