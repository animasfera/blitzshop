"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import getUser from "src/users/queries/getUser"
import deleteUser from "src/users/mutations/deleteUser"

const User = () => {
  const router = useRouter()
  const userId: number = parseInt((useParams()?.userId as any) || "-1")
  const [deleteUserMutation] = useMutation(deleteUser)
  const [user] = useQuery(getUser, { id: userId })

  return (
    <>
      <title>User {user.id}</title>

      <div>
        <h1>User {user.id}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        <Link href={`/users/${user.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteUserMutation({ id: user.id })
              await router.push(`/users`)
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

const ShowUserPage = () => {
  return (
    <div>
      <p>
        <Link href={`/users`}>Users</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <User />
      </Suspense>
    </div>
  )
}

ShowUserPage.authenticate = true
ShowUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowUserPage
