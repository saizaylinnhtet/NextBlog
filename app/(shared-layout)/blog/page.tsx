import { prisma } from "@/lib/prisma"
import BlogFeed from "@/components/web/blog/blog-feed"

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      reactions: true,
      comments: {
        select: { id: true },
      },
    },
  })

  return <BlogFeed blogs={blogs} />
}
