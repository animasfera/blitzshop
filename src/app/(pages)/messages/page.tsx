"use client"
import { Suspense } from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"
import Layout from "src/core/layouts/Layout"
import getMessages from "src/messages/queries/getMessages"

const ITEMS_PER_PAGE = 100

const MessagesList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ messages, hasMore }] = usePaginatedQuery(getMessages, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/messages?page=${page - 1}`)
  const goToNextPage = () => router.push(`/messages?page=${page + 1}`)

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <Link href={"#"}>{message.message}</Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const MessagesPage = () => {
  return (
    <Layout>
      <title>Messages</title>

      <Suspense fallback={<div>Loading...</div>}>
        <MessagesList />
      </Suspense>
    </Layout>
  )
}

export default MessagesPage
