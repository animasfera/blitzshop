"use client"
import { Suspense } from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"
import Layout from "src/core/layouts/Layout"
import getCategories from "src/categories/queries/getCategories"

const ITEMS_PER_PAGE = 20

const CategoriesList = () => {
  const router = useRouter()
  //const page = Number(router.query.page) || 0
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ categories, hasMore }] = usePaginatedQuery(getCategories, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/categories?page=${page - 1}`)
  const goToNextPage = () => router.push(`/categories?page=${page + 1}`)

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/categories/${category.id}`}>{category.titleRu}</Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const CategoriesPage = () => {
  return (
    <Layout>
      <title>Categories</title>

      <div>
        <p>
          <Link href={`/categories/new`}>Create Category</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default CategoriesPage
