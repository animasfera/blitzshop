import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getNotifications from "src/notifications/queries/getNotifications"

const ITEMS_PER_PAGE = 100

export const NotificationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ notifications, hasMore }] = usePaginatedQuery(getNotifications, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <Link
              href={Routes.ShowNotificationPage({
                notificationId: notification.id,
              })}
            >
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
      <Head>
        <title>Notifications</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewNotificationPage()}>Create Notification</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <NotificationsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default NotificationsPage
