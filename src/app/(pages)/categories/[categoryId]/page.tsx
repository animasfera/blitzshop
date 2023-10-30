"use client"
import { Suspense } from "react"
import Head from "next/head"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getCategory from "src/categories/queries/getCategory"
import deleteCategory from "src/categories/mutations/deleteCategory"

const Category = () => {
  const router = useRouter()
  const categoryId: number = parseInt((useParams()?.categoryId as any) || "-1")
  const [deleteCategoryMutation] = useMutation(deleteCategory)
  const [category] = useQuery(getCategory, { id: categoryId })

  return (
    <>
      <Head>
        <title>Category {category.id}</title>
      </Head>

      <div>
        <h1>Category {category.id}</h1>
        <pre>{JSON.stringify(category, null, 2)}</pre>

        <Link href={`/categories/${category.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCategoryMutation({ id: category.id })
              await router.push(`/categories`)
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

const ShowCategoryPage = () => {
  return (
    <div>
      <p>
        <Link href={`/categories`}>Categories</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Category />
      </Suspense>
    </div>
  )
}

ShowCategoryPage.authenticate = true
ShowCategoryPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCategoryPage
