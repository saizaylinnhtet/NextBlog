"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Lightbox from "./image-lightbox"

const GridImage = ({
  src,
  sizes,
  onClick,
}: {
  src: string
  sizes: string
  onClick?: () => void
}) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`absolute inset-0 ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {!loaded && <Skeleton className="absolute inset-0" />}
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

const ImageGrid = ({ images }: { images: string[] }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!images.length) return null

  const open = (i: number) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)

  return (
    <>
      {images.length === 1 && (
        <div className="relative w-full h-[380px] rounded-md overflow-hidden my-3">
          <GridImage src={images[0]} sizes="100vw" onClick={() => open(0)} />
        </div>
      )}

      {images.length === 2 && (
        <div className="grid grid-cols-2 gap-[3px] rounded-md overflow-hidden my-3 h-[300px]">
          {images.map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <GridImage src={img} sizes="50vw" onClick={() => open(i)} />
            </div>
          ))}
        </div>
      )}

      {images.length >= 3 && (
        <div className="grid grid-cols-3 gap-[3px] rounded-md overflow-hidden my-3 h-[300px]">
          <div className="relative col-span-2">
            <GridImage src={images[0]} sizes="66vw" onClick={() => open(0)} />
          </div>
          <div className="grid grid-rows-2 gap-[3px]">
            {images.slice(1, 3).map((img, i) => (
              <div key={i} className="relative overflow-hidden">
                <GridImage src={img} sizes="33vw" onClick={() => open(i + 1)} />
                {i === 1 && images.length > 3 && (
                  <div
                    className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer"
                    onClick={() => open(i + 1)}
                  >
                    <span className="text-white text-2xl font-bold">
                      +{images.length - 3}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox images={images} startIndex={lightboxIndex} onClose={close} />
      )}
    </>
  )
}

export default ImageGrid