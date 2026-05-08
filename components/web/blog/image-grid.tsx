import React from 'react'

const ImageGrid = ({ images }: { images: string[] }) => {
    if (!images.length) return null

    if (images.length === 1) {
      return (
        <div style={{ borderRadius: 12, overflow: "hidden", margin: "12px 0" }}>
          <img src={images[0]} alt="" style={{ width: "100%", maxHeight: 380, objectFit: "cover", display: "block" }} />
        </div>
      )
    }
  
    return (
      <div style={{ display: "flex", gap: 3, borderRadius: 12, overflow: "hidden", margin: "12px 0", height: 300 }}>
        {/* Main image — 50% */}
        <div style={{ flex: 2 }}>
          <img src={images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        {/* Sub images — 25% each */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          {images.slice(1, 3).map((img, i) => (
            <div key={i} style={{ flex: 1, overflow: "hidden" }}>
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </div>
    )
}

export default ImageGrid