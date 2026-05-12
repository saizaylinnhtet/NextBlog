"use client"

import { getReactionDetails } from "@/actions/reaction"
import { Card, CardContent } from "@/components/ui/card"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { REACTIONS } from "@/data/reaction-data"
import { BlogReaction } from "@/lib/type"
import { Fragment, useEffect, useState } from "react"
import Avatar from "../avatar"
import { DivideSquare } from "lucide-react"

type ReactionWithUser = BlogReaction & { user: { id: number; name: string } }

const ReactionDetailModal = ({ blogId, reactions }: { blogId: number, reactions: BlogReaction[] }) => {
    const reactionTypes = [...new Set(reactions.map(r => r.type))]
    const [reactionDetails, setReactionDetails] = useState<ReactionWithUser[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReaction = async () => {
            const data = await getReactionDetails(blogId)
            setReactionDetails(data)
            setLoading(false)
        }
        fetchReaction()
    }, [blogId])

    return (
        <>
            <DialogHeader>
                <DialogTitle>Reactions</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue={reactionTypes[0]}>
                <TabsList className="flex flex-wrap justify-evenly w-full">
                    {reactionTypes.map((type) => (
                        <span key={type} className="scale-150">
                            <TabsTrigger value={type}>
                                {REACTIONS.find((r) => r.type === type)?.icon}
                            </TabsTrigger>
                        </span>
                    ))}
                </TabsList>

                {reactionTypes.map((type) => (
                    <TabsContent key={type + '-tabContent'} value={type}>
                        <Card>
                            <CardContent className="flex flex-col">
                                {loading ? (
                                    <p className="text-sm text-muted-foreground">Loading...</p>
                                ) : (
                                    reactionDetails
                                        .filter(r => r.type === type)
                                        .map((r, index, arr) => (
                                            <div key={r.id}>
                                                {index === 0 && <div className="mt-4"/>}
                                                <div className="flex items-center gap-3">
                                                    <Avatar name={r.user.name} size={30} />
                                                    <span className="text-sm">{r.user.name}</span>
                                                </div>
                                                {index !== arr.length - 1 && <hr className="my-2"/>}
                                            </div>
                                        ))
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </>
    )
}

export default ReactionDetailModal