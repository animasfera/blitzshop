"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { CreateUserSchema } from "src/users/schemas"
import createUser from "src/users/mutations/createUser"
import { UserForm, FORM_ERROR } from "src/users/components/UserForm"

const NewUserPage = () => {
  const router = useRouter()
  const [createUserMutation] = useMutation(createUser)

  return (
    <Layout title={"Create New User"}>
      <h1>Create New User</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UserForm
          submitText="Create User"
          schema={CreateUserSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              // @ts-ignore
              const user = await createUserMutation(values)
              // @ts-ignore
              await router.push(`/users/${user.id}`)
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
        <Link href={`/users`}>Users</Link>
      </p>
    </Layout>
  )
}

NewUserPage.authenticate = true

export default NewUserPage
