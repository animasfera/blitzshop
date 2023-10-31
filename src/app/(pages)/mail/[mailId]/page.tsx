"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import getMail from "src/mail/queries/getMail"
import deleteMail from "src/mail/mutations/deleteMail"

const Mail = () => {
  const router = useRouter()
  const mailId: number = parseInt((useParams()?.mailId as any) || "-1")
  const [deleteMailMutation] = useMutation(deleteMail)
  const [mail] = useQuery(getMail, { id: mailId })

  return (
    <>
      <title>Mail {mail.id}</title>

      <div>
        <h1>Mail {mail.id}</h1>
        <pre>{JSON.stringify(mail, null, 2)}</pre>

        <Link href={`/mail/${mail.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteMailMutation({ id: mail.id })
              await router.push(`/mail`)
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
        <Link href={`/mail`}>Mail</Link>
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
