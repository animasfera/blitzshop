"use client"
import { Suspense } from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"

import Layout from "src/core/layouts/Layout"
import getNotifications from "src/notifications/queries/getNotifications"

const ITEMS_PER_PAGE = 100

const NotificationsList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ notifications, hasMore }] = usePaginatedQuery(getNotifications, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/notifications?page=${page - 1}`)
  const goToNextPage = () => router.push(`/notifications?page=${page + 1}`)

  return (
    <div>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <Link href={`/notifications/${notification.id}`}>
              {notification.title || notification.message}
            </Link>
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

const NotificationsPage = () => {
  return (
    <Layout>
      <title>Notifications</title>

      <div>
        <p>
          <Link href={`/notifications/new`}>Create Notification</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <NotificationsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default NotificationsPage
