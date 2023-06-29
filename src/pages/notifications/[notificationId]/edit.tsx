import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateNotificationSchema } from "src/notifications/schemas"
import getNotification from "src/notifications/queries/getNotification"
import updateNotification from "src/notifications/mutations/updateNotification"
import { NotificationForm, FORM_ERROR } from "src/notifications/components/NotificationForm"

export const EditNotification = () => {
  const router = useRouter()
  const notificationId = useParam("notificationId", "number")
  const [notification, { setQueryData }] = useQuery(
    getNotification,
    { id: notificationId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateNotificationMutation] = useMutation(updateNotification)

  return (
    <>
      <Head>
        <title>Edit Notification {notification.id}</title>
      </Head>

      <div>
        <h1>Edit Notification {notification.id}</h1>
        <pre>{JSON.stringify(notification, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <NotificationForm
            submitText="Update Notification"
            schema={UpdateNotificationSchema}
            initialValues={notification}
            onSubmit={async (values) => {
              try {
                const updated = await updateNotificationMutation({
                  id: notification.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowNotificationPage({ notificationId: updated.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}

const EditNotificationPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditNotification />
      </Suspense>

      <p>
        <Link href={Routes.NotificationsPage()}>Notifications</Link>
      </p>
    </div>
  )
}

EditNotificationPage.authenticate = true
EditNotificationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditNotificationPage
