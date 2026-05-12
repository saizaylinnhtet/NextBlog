"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const Lightbox = ({
  images,
  startIndex,
  onClose,
}: {
  images: string[]
  startIndex: number
  onClose: () => void
}) => {
  const [current, setCurrent] = useState(startIndex)
  const [loaded, setLoaded] = useState(false)

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % images.length)
  }, [images.length])

  const prevRef = useRef(prev)
  const nextRef = useRef(next)
  const onCloseRef = useRef(onClose)

  useEffect(() => { prevRef.current = prev }, [prev])
  useEffect(() => { nextRef.current = next }, [next])
  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current()
      if (e.key === "ArrowLeft") prevRef.current()
      if (e.key === "ArrowRight") nextRef.current()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  // Preload adjacent images
  useEffect(() => {
    const toPreload = [
      images[(current + 1) % images.length],
      images[(current - 1 + images.length) % images.length],
    ]
    toPreload.forEach((src) => {
      const img = new window.Image()
      img.src = src
    })
  }, [current, images])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          className="absolute left-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition"
          onClick={(e) => { e.stopPropagation(); prev() }}
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-h-[90vh] max-w-[90vw] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="w-[80vw] h-[80vh] rounded-lg" />
          </div>
        )}
        <img
          src={images[current]}
          alt=""
          onLoad={() => setLoaded(true)}
          className={`max-h-[90vh] max-w-[90vw] object-contain transition-opacity duration-150 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          className="absolute right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition"
          onClick={(e) => { e.stopPropagation(); next() }}
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
              className={`h-2 w-2 rounded-full transition ${
                i === current ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Lightbox