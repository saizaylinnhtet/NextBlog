import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from "next/server"


export async function DELETE(req: NextRequest) {
    const { urls }: { urls: string[] } = await req.json()

    // extract public_id from url and delete
    await Promise.all(
        urls.map((url: string) => {
            const publicId = url.split("/").pop()?.split(".")[0]  // extract filename without extension
            return cloudinary.uploader.destroy(`nextblog/blogs/${publicId}`)
        })
    )

    return NextResponse.json({ success: true })
}