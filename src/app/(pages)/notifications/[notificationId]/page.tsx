"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import getNotification from "src/notifications/queries/getNotification"
import deleteNotification from "src/notifications/mutations/deleteNotification"

const Notification = () => {
  const router = useRouter()
  const notificationId: number = parseInt((useParams()?.notificationId as any) || "-1")
  const [deleteNotificationMutation] = useMutation(deleteNotification)
  const [notification] = useQuery(getNotification, { id: notificationId })

  return (
    <>
      <title>Notification {notification.id}</title>

      <div>
        <h1>Notification {notification.id}</h1>
        <pre>{JSON.stringify(notification, null, 2)}</pre>

        <Link href={`/notifications/${notification.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteNotificationMutation({ id: notification.id })
              await router.push(`/notifications`)
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
        <Link href={`/notifications`}>Notifications</Link>
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
