"use client"

import { useRouter } from "next/navigation"

export const Pagination = ({
  page,
  totalPages,
}: {
  page: number
  totalPages: number
}) => {
  const router = useRouter()
  const goTo = (p: number) => router.push(`/blog?page=${p}`)

  return (
    <div className="flex items-center justify-center gap-2 mt-8 pb-6">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 rounded-md border disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className="px-4 py-2 rounded-md border disabled:opacity-40"
      >
        Next
      </button>
    </div>
  )
}