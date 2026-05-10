"use client"

import Image from "next/image"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function GridImage({ src, sizes }: { src: string; sizes: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Skeleton className="absolute inset-0" />}
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  )
}

const ImageGrid = ({ images }: { images: string[] }) => {
  if (!images.length) return null

  if (images.length === 1) {
    return (
      <div className="relative w-full h-[380px] rounded-md overflow-hidden my-3">
        <GridImage src={images[0]} sizes="100vw" />
      </div>
    )
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-[3px] rounded-md overflow-hidden my-3 h-[300px]">
        {images.map((img, i) => (
          <div key={i} className="relative overflow-hidden">
            <GridImage src={img} sizes="50vw" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-[3px] rounded-md overflow-hidden my-3 h-[300px]">
      <div className="relative col-span-2">
        <GridImage src={images[0]} sizes="66vw" />
      </div>
      <div className="grid grid-rows-2 gap-[3px]">
        {images.slice(1, 3).map((img, i) => (
          <div key={i} className="relative overflow-hidden">
            <GridImage src={img} sizes="33vw" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageGrid