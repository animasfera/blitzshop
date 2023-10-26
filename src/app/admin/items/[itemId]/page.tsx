"use client"
import { Suspense } from "react"
import { useQuery } from "@blitzjs/rpc"
import getItem from "src/items/queries/getItem"
import AdminItemCard from "src/items/components/admin/AdminItemCard"
import { IAdminItem } from "src/items/components/admin/AdminItem"
import { useParams } from "next/navigation"

const AdminItem = () => {
  const itemId: any = useParams()

  let [item] = useQuery(getItem, { id: parseInt(itemId.itemId) }) as any
  item = item as IAdminItem["item"]
  return (
    <>
      <title>{item.title}</title>
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

export default ShowAdminItemPage
