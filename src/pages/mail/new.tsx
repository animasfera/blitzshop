"use client"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateMailSchema } from "src/mail/schemas"
import createMail from "src/mail/mutations/createMail"
import { MailForm, FORM_ERROR } from "src/mail/components/MailForm"
import { Suspense } from "react"

const NewMailPage = () => {
  const router = useRouter()
  const [createMailMutation] = useMutation(createMail)

  return (
    <Layout title={"Create New Mail"}>
      <h1>Create New Mail</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <MailForm
          submitText="Create Mail"
          schema={CreateMailSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const mail = await createMailMutation(values)
              await router.push(Routes.ShowMailPage({ mailId: mail.id }))
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
        <Link href={Routes.MailPage()}>Mail</Link>
      </p>
    </Layout>
  )
}

NewMailPage.authenticate = true

export default NewMailPage
