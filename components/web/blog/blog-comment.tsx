"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import Avatar from "../avatar"
import { getComments, createComment } from "@/actions/comment"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Comment } from "@/lib/type"

type CommentWithUser = Comment & {
    user: { id: number; name: string }
    replies: (Comment & { user: { id: number; name: string } })[]
}

function timeAgo(date: Date | string) {
    const diff = (Date.now() - new Date(date).getTime()) / 1000
    if (diff < 60) return "just now"
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
}

// Single comment row (used for both main and sub)
const CommentRow = ({
    name,
    message,
    createdAt,
}: {
    name: string
    message: string
    createdAt: Date | string
}) => (
    <div className="flex gap-3 items-start">
        <Avatar name={name} />
        <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{name}</span>
                <span className="text-xs text-muted-foreground">{timeAgo(createdAt)}</span>
            </div>
            <p className="text-sm">{message}</p>
        </div>
    </div>
)

// Reply input box
const ReplyInput = ({
    onSubmit,
    onCancel,
}: {
    onSubmit: (text: string) => Promise<void>
    onCancel: () => void
}) => {
    const [text, setText] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async () => {
        const trimmed = text.trim()
        if (!trimmed || submitting) return
        setSubmitting(true)
        try {
            await onSubmit(trimmed)
            setText("")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="flex gap-2 mt-2">
            <Textarea
                placeholder="Write a reply... (Enter to send)"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit()
                    }
                }}
                rows={2}
                className="resize-none text-sm"
                autoFocus
            />
            <div className="flex flex-col gap-1 self-end">
                <Button size="sm" onClick={handleSubmit} disabled={!text.trim() || submitting}>
                    {submitting ? "..." : "Send"}
                </Button>
                <Button size="sm" variant="ghost" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}

// Main comment with its replies
const MainComment = ({
    comment,
    currentUserId,
    blogId,
    onReplyAdded,
}: {
    comment: CommentWithUser
    currentUserId: number
    blogId: number
    onReplyAdded: (parentId: number, reply: Comment & { user: { id: number; name: string } }) => void
}) => {
    const [showReplies, setShowReplies] = useState(false)
    const [showReplyInput, setShowReplyInput] = useState(false)

    const handleReply = async (text: string) => {
        const reply = await createComment({
            blogId,
            userId: currentUserId,
            message: text,
            parentId: comment.id,
        })
        onReplyAdded(comment.id, reply as Comment & { user: { id: number; name: string } })
        setShowReplies(true)
        setShowReplyInput(false)
    }

    return (
        <div className="flex flex-col gap-1">
            <CommentRow
                name={comment.user.name}
                message={comment.message}
                createdAt={comment.createdAt}
            />

            {/* Reply button */}
            <button
                className="self-start ml-11 text-xs text-muted-foreground hover:text-foreground transition"
                onClick={() => setShowReplyInput((v) => !v)}
            >
                Reply
            </button>

            {/* Reply input */}
            {showReplyInput && (
                <div className="ml-11">
                    <ReplyInput
                        onSubmit={handleReply}
                        onCancel={() => setShowReplyInput(false)}
                    />
                </div>
            )}

            {/* Toggle replies */}
            {comment.replies.length > 0 && (
                <button
                    className="flex items-center gap-1 ml-11 text-xs text-primary font-medium hover:underline w-fit"
                    onClick={() => setShowReplies((v) => !v)}
                >
                    {showReplies ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                </button>
            )}

            {/* Sub replies — 1 tab indent via ml-11 */}
            {showReplies && (
                <div className="ml-11 flex flex-col gap-3 mt-1 border-l-2 border-border pl-3">
                    {comment.replies.map((reply) => (
                        <CommentRow
                            key={reply.id}
                            name={reply.user.name}
                            message={reply.message}
                            createdAt={reply.createdAt}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

// Root component
const BlogComment = ({
    blogId,
    currentUserId,
    onCommentAdded,
}: {
    blogId: number
    currentUserId: number
    onCommentAdded?: () => void
}) => {
    const [comments, setComments] = useState<CommentWithUser[]>([])
    const [loading, setLoading] = useState(true)
    const [text, setText] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        getComments(blogId).then((data) => {
            setComments(data as CommentWithUser[])
            setLoading(false)
        })
    }, [blogId])

    useEffect(() => {
        if (!loading) bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [loading])

    const handleSubmit = async () => {
        const trimmed = text.trim()
        if (!trimmed || submitting) return
        setSubmitting(true)
        try {
            const newComment = await createComment({ blogId, userId: currentUserId, message: trimmed })
            setComments((prev) => [...prev, { ...newComment, replies: [] } as CommentWithUser])
            onCommentAdded?.()
            setText("")
            setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50)
        } finally {
            setSubmitting(false)
        }
    }

    const handleReplyAdded = (
        parentId: number,
        reply: Comment & { user: { id: number; name: string } }
    ) => {
        setComments((prev) =>
            prev.map((c) =>
                c.id === parentId
                    ? { ...c, replies: [...c.replies, reply] }
                    : c
            )
        )
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Comments</DialogTitle>
            </DialogHeader>

            {/* Comment list */}
            <div className="flex flex-col gap-5 overflow-y-auto max-h-[50vh] py-2 pr-1">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex gap-3 items-start">
                            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                            <div className="flex flex-col gap-1 flex-1">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>
                    ))
                ) : comments.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">
                        No comments yet. Be the first!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <MainComment
                            key={comment.id}
                            comment={comment}
                            currentUserId={currentUserId}
                            blogId={blogId}
                            onReplyAdded={handleReplyAdded}
                        />
                    ))
                )}
                <div ref={bottomRef} />
            </div>

            {/* Main comment input */}
            <div className="flex gap-2 pt-2 border-t">
                <Textarea
                    placeholder="Write a comment... (Enter to send)"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSubmit()
                        }
                    }}
                    rows={2}
                    className="resize-none"
                />
                <Button
                    onClick={handleSubmit}
                    disabled={!text.trim() || submitting}
                    className="self-end"
                >
                    {submitting ? "..." : "Send"}
                </Button>
            </div>
        </>
    )
}

export default BlogComment