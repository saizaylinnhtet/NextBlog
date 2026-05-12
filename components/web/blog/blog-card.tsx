"use client"

import { useState } from "react"
import { MessageCircle, Share2, ThumbsUp } from "lucide-react"
import { BlogWithRelationsType, BlogReaction, ReactionType } from "@/lib/type"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Avatar from "../avatar"
import ImageGrid from "./image-grid"
import ReactionSummary from "./reaction-summary"
import ReactionPicker from "./reaction-picker"
import { REACTIONS } from "@/data/reaction-data"
import { upsertReaction } from "@/actions/reaction"
import ReactionDetailModal from "./reaction-detail-modal"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import BlogComment from "./blog-comment"

function timeAgo(date: Date | string) {
    const diff = (Date.now() - new Date(date).getTime()) / 1000
    if (diff < 60) return "just now"
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
}

const BlogCard = ({ blog, currentUserId }: { blog: BlogWithRelationsType, currentUserId: number }) => {
    const [reaction, setReaction] = useState<ReactionType | null>(
        blog.reactions.find(r => r.userId === currentUserId)?.type ?? null
    )
    const [commentCount, setCommentCount] = useState(blog.comments.length)
    const [reactions, setReactions] = useState<BlogReaction[]>(blog.reactions)
    const [showPicker, setShowPicker] = useState(false)

    let hoverTimer: ReturnType<typeof setTimeout>

    const currentReactionData = reaction ? REACTIONS.find(r => r.type === reaction) : null

    const handleReact = async (type: ReactionType) => {
        const previousReactions = reactions
        const previousReaction = reaction
        setReactions(prev => {
            const without = prev.filter(r => r.userId !== currentUserId)
            if (reaction === type) { setReaction(null); return without }
            setReaction(type)
            return [...without, { id: -1, type, userId: currentUserId, blogId: blog.id }]
        })
        setShowPicker(false)
        try {
            await upsertReaction({ blogId: blog.id, userId: currentUserId, type: reaction === type ? null : type })
        } catch {
            // revert on failure
            setReactions(previousReactions)
            setReaction(previousReaction)
        }
    }

    return (
        <article className="rounded-sm shadow-sm overflow-hidden w-full">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 pt-4">
                <Avatar name={blog.user.name} />
                <div>
                    <p className="font-semibold text-sm text-foreground">{blog.user.name}</p>
                    <p className="text-xs text-muted-foreground">{timeAgo(blog.createdAt)}</p>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pt-4 ">
                <h2 className="text-base font-bold tracking-[0.05rem]">
                    {blog.title}
                </h2>
                <p className="text-sm">
                    {blog.content}
                </p>
            </div>

            {/* Images */}
            <div className="px-4 pt-2">
                <ImageGrid images={blog.images} />
            </div>

            {/* Reaction summary + comment count */}
            {(reactions.length > 0 || blog.comments.length > 0) && (
                <>
                    <div className="flex justify-between items-center mx-4 py-2">

                        <Dialog>
                            <DialogTrigger><ReactionSummary reactions={reactions} /></DialogTrigger>
                            <DialogContent>
                                <ReactionDetailModal blogId={blog.id} reactions={reactions} />
                            </DialogContent>
                        </Dialog>
                        {commentCount > 0 && 
                        (<Dialog>
                            <DialogTrigger asChild>
                                <span className="text-xs text-muted-foreground cursor-pointer">
                                    {commentCount} comment{commentCount !== 1 ? "s" : ""}
                                </span>
                            </DialogTrigger>
                            <DialogContent>
                                <BlogComment blogId={blog.id} currentUserId={currentUserId} onCommentAdded={() => setCommentCount(c => c + 1)} />
                            </DialogContent>
                        </Dialog>)
                        }
                    </div>
                    <Separator className="mx-4" />
                </>
            )}

            {/* Action buttons */}
            <div className="flex items-center px-2 py-1 gap-1">

                {/* React button */}
                <div
                    className="relative flex-1"
                    onMouseEnter={() => { clearTimeout(hoverTimer); setShowPicker(true) }}
                    onMouseLeave={() => { hoverTimer = setTimeout(() => setShowPicker(false), 300) }}
                >
                    {showPicker && (
                        <ReactionPicker onReact={handleReact} currentReaction={reaction} />
                    )}
                    <Button
                        variant="ghost"
                        className="w-full gap-2 rounded-sm text-muted-foreground"
                        onClick={() => handleReact(reaction ?? "LIKE")}
                    >
                        {currentReactionData ? (
                            <>
                                {currentReactionData.icon}
                                <span style={{ color: currentReactionData.color }} className="font-semibold">
                                    {currentReactionData.label}
                                </span>
                            </>
                        ) : (
                            <>
                                <ThumbsUp size={18} />
                                <span>Like</span>
                            </>
                        )}
                    </Button>

                </div>

                {/* Comment button */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="flex-1 gap-2 text-muted-foreground rounded-sm">
                            <MessageCircle size={18} />
                            <span>Comment</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <BlogComment blogId={blog.id} currentUserId={currentUserId} onCommentAdded={() => setCommentCount(c => c + 1)} />
                    </DialogContent>
                </Dialog>

                {/* Share button */}
                <Button variant="ghost" className="flex-1 gap-2 text-muted-foreground rounded-sm">
                    <Share2 size={18} />
                    <span>Share</span>
                </Button>

            </div>
        </article>
    )
}

export default BlogCard