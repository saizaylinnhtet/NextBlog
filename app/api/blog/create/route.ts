import { prisma } from "@/lib/prisma"
import { uploadBlogType } from "@/lib/type"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    const { title, content, images, userId } : uploadBlogType & { userId: number } = await req.json()
    try {
        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                images,
                userId
            }
        })
        return NextResponse.json({ success: true, data: blog })
    } catch (error) {
        return (error as Error).message
    }
}