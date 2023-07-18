import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateMailSchema } from "src/mail/schemas"
import getMail from "src/mail/queries/getMail"
import updateMail from "src/mail/mutations/updateMail"
import { MailForm, FORM_ERROR } from "src/mail/components/MailForm"

export const EditMail = () => {
  const router = useRouter()
  const mailId = useParam("mailId", "number")
  const [mail, { setQueryData }] = useQuery(
    getMail,
    { id: mailId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateMailMutation] = useMutation(updateMail)

  return (
    <>
      <Head>
        <title>Edit Mail {mail.id}</title>
      </Head>

      <div>
        <h1>Edit Mail {mail.id}</h1>
        <pre>{JSON.stringify(mail, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <MailForm
            submitText="Update Mail"
            schema={UpdateMailSchema}
            initialValues={mail}
            onSubmit={async (values) => {
              try {
                const updated = await updateMailMutation({
                  id: mail.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowMailPage({ mailId: updated.id }))
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

const EditMailPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMail />
      </Suspense>

      <p>
        <Link href={Routes.MailPage()}>Mail</Link>
      </p>
    </div>
  )
}

EditMailPage.authenticate = true
EditMailPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditMailPage
