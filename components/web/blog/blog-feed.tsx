import { BlogWithRelationsType } from "@/lib/type"
import BlogCard from "./blog-card"
import { checkCookie } from "@/lib/cookie"
import { redirect } from "next/navigation"
import { Pagination } from "./blog-pagination"


export const BlogFeed = async ({ blogs, page, totalPages }:
  { blogs: BlogWithRelationsType[], page: number, totalPages: number }) => {

  const session = await checkCookie()
  if (!session) redirect("/auth/sign-in")

  if (!blogs.length) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "var(--color-text-secondary)", fontFamily: "var(--font-sans)" }}>
        No blogs yet. Be the first to post!
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-8 px-2 py-10 max-w-150 w-full m-auto">
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} currentUserId={session.userId} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} />
    </div >
  )
}
