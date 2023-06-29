import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getNotification from "src/notifications/queries/getNotification"
import deleteNotification from "src/notifications/mutations/deleteNotification"

export const Notification = () => {
  const router = useRouter()
  const notificationId = useParam("notificationId", "number")
  const [deleteNotificationMutation] = useMutation(deleteNotification)
  const [notification] = useQuery(getNotification, { id: notificationId })

  return (
    <>
      <Head>
        <title>Notification {notification.id}</title>
      </Head>

      <div>
        <h1>Notification {notification.id}</h1>
        <pre>{JSON.stringify(notification, null, 2)}</pre>

        <Link
          href={Routes.EditNotificationPage({
            notificationId: notification.id,
          })}
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteNotificationMutation({ id: notification.id })
              await router.push(Routes.NotificationsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowNotificationPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.NotificationsPage()}>Notifications</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Notification />
      </Suspense>
    </div>
  )
}

ShowNotificationPage.authenticate = true
ShowNotificationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowNotificationPage
