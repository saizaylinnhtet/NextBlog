"use server"

import { prisma } from "@/lib/prisma"
import { BlogReaction, ReactionType } from "@/lib/type"


const upsertReaction = async ({ blogId, userId, type }
    : Pick<BlogReaction, "blogId" | "userId"> & { type: ReactionType | null }) => {
        if (type === null) {
            return prisma.blogReaction.deleteMany({ where: { blogId, userId }})
        }
        return prisma.blogReaction.upsert({
            where: { blogId_userId: {blogId, userId}},
            update: { type },
            create: { blogId, userId, type}
        })
}

const getReactionDetails = async (blogId: number) => {
    return prisma.blogReaction.findMany({
        where: { blogId },
        include: { user: { select: { id: true, name: true } } }
    })
}

export { upsertReaction, getReactionDetails }