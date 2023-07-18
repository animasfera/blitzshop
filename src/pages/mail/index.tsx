import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getMails from "src/mail/queries/getMails"

const ITEMS_PER_PAGE = 100

export const MailList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ mails, hasMore }] = usePaginatedQuery(getMails, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {mails.map((mail) => (
          <li key={mail.id}>
            <Link href={Routes.ShowMailPage({ mailId: mail.id })}>{mail.subjectRu}</Link>
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

const MailPage = () => {
  return (
    <Layout>
      <Head>
        <title>Mail</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewMailPage()}>Create Mail</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <MailList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default MailPage
