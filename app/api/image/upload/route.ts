import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
  
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "nextblog/blogs" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })
  
    return NextResponse.json(result)
  }