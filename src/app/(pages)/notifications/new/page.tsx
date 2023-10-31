"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { CreateNotificationSchema } from "src/notifications/schemas"
import createNotification from "src/notifications/mutations/createNotification"
import { NotificationForm, FORM_ERROR } from "src/notifications/components/NotificationForm"

const NewNotificationPage = () => {
  const router = useRouter()
  const [createNotificationMutation] = useMutation(createNotification)

  return (
    <Layout title={"Create New Notification"}>
      <h1>Create New Notification</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <NotificationForm
          submitText="Create Notification"
          schema={CreateNotificationSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const notification = await createNotificationMutation(values)
              await router.push(`/notifications/${notification.id}`)
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={`/notifications`}>Notifications</Link>
      </p>
    </Layout>
  )
}

NewNotificationPage.authenticate = true

export default NewNotificationPage
