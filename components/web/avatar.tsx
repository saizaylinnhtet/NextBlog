import React from 'react'

const Avatar = ({ name, size = 40 }: { name: string; size?: number }) => {
    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase()
    const colors = ["#4F86F7", "#F7426F", "#A78BFA", "#34D399", "#F7A542", "#60A5FA"]
    const color = colors[name.charCodeAt(0) % colors.length]
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: color, display: "flex", alignItems: "center",
        justifyContent: "center", fontWeight: 600,
        fontSize: size * 0.38, color: "#fff", flexShrink: 0,
        boxShadow: `0 0 0 2px #fff, 0 0 0 3px ${color}33`,
      }}>
        {initials}
      </div>
    )
}

export default Avatar