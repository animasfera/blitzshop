"use client"
import { Suspense } from "react"
import Head from "next/head"
import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import getItem from "src/items/queries/getItem"
import AdminItemCard from "src/items/components/admin/AdminItemCard"
import { IAdminItem } from "src/items/components/admin/AdminItem"
import { UserRoleEnum } from "@prisma/client"

const AdminItem = () => {
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

ShowAdminItemPage.authenticate = { role: UserRoleEnum.ADMIN, redirectTo: "/" }
ShowAdminItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowAdminItemPage
