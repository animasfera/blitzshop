"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { CreateCategorySchema } from "src/categories/schemas"
import createCategory from "src/categories/mutations/createCategory"
import { CategoryForm, FORM_ERROR } from "src/categories/components/CategoryForm"

const NewCategoryPage = () => {
  const router = useRouter()
  const [createCategoryMutation] = useMutation(createCategory)

  return (
    <Layout title={"Create New Category"}>
      <h1>Create New Category</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryForm
          submitText="Create Category"
          schema={CreateCategorySchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const category = await createCategoryMutation(values)
              await router.push("/categories/" + category.id)
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
        <Link href={"/categories"}>Categories</Link>
      </p>
    </Layout>
  )
}

NewCategoryPage.authenticate = true

export default NewCategoryPage
