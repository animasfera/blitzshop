import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getMail from "src/mail/queries/getMail"
import deleteMail from "src/mail/mutations/deleteMail"

export const Mail = () => {
  const router = useRouter()
  const mailId = useParam("mailId", "number")
  const [deleteMailMutation] = useMutation(deleteMail)
  const [mail] = useQuery(getMail, { id: mailId })

  return (
    <>
      <Head>
        <title>Mail {mail.id}</title>
      </Head>

      <div>
        <h1>Mail {mail.id}</h1>
        <pre>{JSON.stringify(mail, null, 2)}</pre>

        <Link href={Routes.EditMailPage({ mailId: mail.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteMailMutation({ id: mail.id })
              await router.push(Routes.MailPage())
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

const ShowMailPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.MailPage()}>Mail</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Mail />
      </Suspense>
    </div>
  )
}

ShowMailPage.authenticate = true
ShowMailPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowMailPage
