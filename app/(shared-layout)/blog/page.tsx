import { prisma } from "@/lib/prisma"
import { BlogFeed } from "@/components/web/blog/blog-feed"


const PAGE_SIZE = 10

const BlogsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string }
}) => {
  const { page } = await Promise.resolve(searchParams) 
  const currentPage = Math.max(1, Number(page) || 1)

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
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
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.blog.count(),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return <BlogFeed blogs={blogs} page={currentPage} totalPages={totalPages} />
}

export default BlogsPage