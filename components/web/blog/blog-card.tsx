"use client"

import { useState } from "react"
import { MessageCircle, Share2 } from "lucide-react"
import { BlogWithRelationsType, BlogReaction, ReactionType } from "@/lib/type"
import Avatar from "../avatar"
import ImageGrid from "./image-grid"
import ReactionSummary from "./reaction-summary"
import ReactionPicker from "./reaction-picker"
import { REACTIONS } from "@/data/reaction-data"

function timeAgo(date: Date | string) {
    const diff = (Date.now() - new Date(date).getTime()) / 1000
    if (diff < 60) return "just now"
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
}

const BlogCard = ({ blog }: { blog: BlogWithRelationsType }) => {
    const [reaction, setReaction] = useState<ReactionType | null>(null)
    const [reactions, setReactions] = useState<BlogReaction[]>(blog.reactions)
    const [showPicker, setShowPicker] = useState(false)
    let hoverTimer: ReturnType<typeof setTimeout>

    const currentReactionData = reaction ? REACTIONS.find(r => r.type === reaction) : null

    const handleReact = (type: ReactionType) => {
        setReactions(prev => {
            const without = prev.filter(r => (r as any)._user !== "me")
            if (reaction === type) { setReaction(null); return without }
            setReaction(type)
            return [...without, { type, _user: "me" } as any]
        })
        setShowPicker(false)
    }

    return (
        <article style={{
            background: "var(--color-background-primary)",
            border: "1px solid var(--color-border-tertiary)",
            borderRadius: 16, overflow: "visible",
            fontFamily: "var(--font-sans)",
        }}>
            {/* Header */}
            <div style={{ padding: "16px 16px 0", display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar name={blog.user.name} />
                <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--color-text-primary)" }}>
                        {blog.user.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
                        {timeAgo(blog.createdAt)}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: "12px 16px 0" }}>
                <h2 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.4 }}>
                    {blog.title}
                </h2>
                <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                    {blog.content}
                </p>
            </div>

            {/* Images */}
            <div style={{ padding: "0 16px" }}>
                <ImageGrid images={blog.images} />
            </div>

            {/* Reaction summary + comment count */}
            {(reactions.length > 0 || blog.comments.length > 0) && (
                <div style={{
                    margin: "0 16px",
                    padding: "8px 0",
                    borderBottom: "1px solid var(--color-border-tertiary)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                    <ReactionSummary reactions={reactions} />
                    {blog.comments.length > 0 && (
                        <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                            {blog.comments.length} comment{blog.comments.length !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>
            )}

            {/* Action buttons */}
            <div style={{ display: "flex", padding: "4px 8px" }}>
                {/* React button */}
                <div style={{ position: "relative", flex: 1 }}>
                    {showPicker && (
                        <ReactionPicker onReact={handleReact} currentReaction={reaction} />
                    )}
                    <button
                        onMouseEnter={() => { hoverTimer = setTimeout(() => setShowPicker(true), 500) }}
                        onMouseLeave={() => { clearTimeout(hoverTimer); setTimeout(() => setShowPicker(false), 300) }}
                        onClick={() => handleReact(reaction ?? "LIKE")}
                        style={{
                            width: "100%", background: "none", border: "none",
                            padding: "10px 4px", borderRadius: 10, cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                            color: currentReactionData ? currentReactionData.color : "var(--color-text-secondary)",
                            fontWeight: reaction ? 600 : 400, fontSize: 14, transition: "background 0.15s",
                        }}
                    // onMouseEnter={e => (e.currentTarget.style.background = "var(--color-background-secondary)")}
                    // onMouseLeave={e => (e.currentTarget.style.background = "none")}
                    >
                        <span style={{ fontSize: 18 }}>{currentReactionData ? currentReactionData.icon : "👍"}</span>
                        <span>{currentReactionData ? currentReactionData.label : "Like"}</span>
                    </button>
                </div>

                {/* Comment button */}
                <button style={{
                    flex: 1, background: "none", border: "none",
                    padding: "10px 4px", borderRadius: 10, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    color: "var(--color-text-secondary)", fontSize: 14, transition: "background 0.15s",
                }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--color-background-secondary)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                    <MessageCircle size={18} />
                    <span>Comment</span>
                </button>

                {/* Share button */}
                <button style={{
                    flex: 1, background: "none", border: "none",
                    padding: "10px 4px", borderRadius: 10, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    color: "var(--color-text-secondary)", fontSize: 14, transition: "background 0.15s",
                }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--color-background-secondary)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                    <Share2 size={18} />
                    <span>Share</span>
                </button>
            </div>
        </article>
    )
}

export default BlogCard