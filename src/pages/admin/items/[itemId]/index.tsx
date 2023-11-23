"use client"
import { Suspense } from "react"
import Head from "next/head"
import { useQuery } from "@blitzjs/rpc"
import { Routes, useParam } from "@blitzjs/next"

import getItem from "src/items/queries/getItem"
import AdminItemCard from "src/items/components/admin/AdminItemCard"
import { IAdminItem } from "src/items/components/admin/AdminItem"
import { UserRoleEnum } from "@prisma/client"
import Link from "next/link"
import AdminLayout from "src/core/layouts/AdminLayout"

const AdminItem = () => {
  const itemId = useParam("itemId", "number")

  let [item] = useQuery(getItem, { id: itemId }) as any
  item = item as IAdminItem["item"]
  return (
    <>
      <Head>
        <title>Item {item.title}</title>
      </Head>
      <div className="mb-4 font-medium underline flex justify-between	">
        <Link href={Routes.AdminItemsPage()}>Список товаров</Link>
        <Link href={Routes.ProductPage({ itemId: item.id })}> Посмотреть товар в магазине</Link>
      </div>
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
ShowAdminItemPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default ShowAdminItemPage
