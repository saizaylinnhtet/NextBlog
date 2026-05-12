"use server"

import { prisma } from "@/lib/prisma"

export const getComments = async (blogId: number) => {
  return prisma.comment.findMany({
    where: { blogId, commentLvl: "MAIN" },
    orderBy: { createdAt: "asc" },
    include: {
      user: { select: { id: true, name: true } },
      replies: {
        orderBy: { createdAt: "asc" },
        include: {
          user: { select: { id: true, name: true } }
        }
      }
    }
  })
}

export const createComment = async ({
  blogId,
  userId,
  message,
  parentId,
}: {
  blogId: number
  userId: number
  message: string
  parentId?: number
}) => {
  return prisma.comment.create({
    data: {
      blogId,
      userId,
      message: message,
      commentLvl: parentId ? "SUB" : "MAIN",
      parentId: parentId ?? null,
    },
    include: {
      user: { select: { id: true, name: true } },
      replies: {
        include: {
          user: { select: { id: true, name: true } }
        }
      }
    }
  })
}