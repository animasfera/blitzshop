"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { UpdateUserSchema } from "src/users/schemas"
import getUser from "src/users/queries/getUser"
import updateUser from "src/users/mutations/updateUser"
import { UserForm, FORM_ERROR } from "src/users/components/UserForm"

const EditUser = () => {
  const router = useRouter()
  const userId: number = parseInt((useParams()?.userId as any) || "-1")
  const [user, { setQueryData }] = useQuery(
    getUser,
    { id: userId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateUserMutation] = useMutation(updateUser)

  return (
    <>
      <title>Edit User {user.id}</title>

      <div>
        <h1>Edit User {user.id}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <UserForm
            submitText="Update User"
            schema={UpdateUserSchema}
            initialValues={user}
            onSubmit={async (values) => {
              try {
                const updated = await updateUserMutation({
                  id: user.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(`/users/${updated.id}`)
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

const EditUserPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditUser />
      </Suspense>

      <p>
        <Link href={`/users`}>Users</Link>
      </p>
    </div>
  )
}

EditUserPage.authenticate = true
EditUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditUserPage
