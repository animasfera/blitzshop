import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getMessages from "src/messages/queries/getMessages"

const ITEMS_PER_PAGE = 100

export const MessagesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ messages, hasMore }] = usePaginatedQuery(getMessages, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <Link href={Routes.ShowMessagePage({ messageId: message.id })}>{message.message}</Link>
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
      <Head>
        <title>Messages</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewMessagePage()}>Create Message</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <MessagesList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default MessagesPage
