"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { UpdateCategorySchema } from "src/categories/schemas"
import getCategory from "src/categories/queries/getCategory"
import updateCategory from "src/categories/mutations/updateCategory"
import { CategoryForm, FORM_ERROR } from "src/categories/components/CategoryForm"

const EditCategory = () => {
  const router = useRouter()
  const categoryId: number = parseInt((useParams()?.categoryId as any) || "-1")
  const [category, { setQueryData }] = useQuery(
    getCategory,
    { id: categoryId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCategoryMutation] = useMutation(updateCategory)

  return (
    <>
      <title>Edit Category {category.id}</title>

      <div>
        <h1>Edit Category {category.id}</h1>
        <pre>{JSON.stringify(category, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryForm
            submitText="Update Category"
            schema={UpdateCategorySchema}
            initialValues={category}
            onSubmit={async (values) => {
              try {
                const updated = await updateCategoryMutation({
                  id: category.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(`/categories/${updated.id}`)
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

const EditCategoryPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCategory />
      </Suspense>

      <p>
        <Link href={`/categories`}>Categories</Link>
      </p>
    </div>
  )
}

EditCategoryPage.authenticate = true
EditCategoryPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCategoryPage
