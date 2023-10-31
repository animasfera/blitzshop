"use client"
import { Suspense } from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"
import Layout from "src/core/layouts/Layout"
import getMails from "src/mail/queries/getMails"

const ITEMS_PER_PAGE = 100

const MailList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ mails, hasMore }] = usePaginatedQuery(getMails, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const goToPreviousPage = () => router.push(`/mail?page=${page - 1}`)
  const goToNextPage = () => router.push(`/mail?page=${page + 1}`)

  return (
    <div>
      <ul>
        {mails.map((mail) => (
          <li key={mail.id}>
            <Link href={`/mail/${mail.id}`}>{mail.subjectRu}</Link>
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
      <title>Mail</title>

      <div>
        <p>
          <Link href={`/mail/new`}>Create Mail</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <MailList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default MailPage
