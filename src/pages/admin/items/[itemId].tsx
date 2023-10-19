"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getItem from "src/items/queries/getItem"
import deleteItem from "src/items/mutations/deleteItem"
import AdminItemCard from "src/items/components/admin/AdminItemCard"
import { IAdminItem } from "src/items/components/admin/AdminItem"

export const AdminItem = () => {
  const router = useRouter()
  const itemId = useParam("itemId", "number")

  let [item] = useQuery(getItem, { id: itemId }) as any
  item = item as IAdminItem["item"]
  return (
    <>
      <Head>
        <title>Item {item.title}</title>
      </Head>
      <AdminItemCard item={item} />
    </>
  )
}

const ShowAdminItemPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminItem />
    </Suspense>
  )
}

ShowAdminItemPage.authenticate = true
ShowAdminItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowAdminItemPage
