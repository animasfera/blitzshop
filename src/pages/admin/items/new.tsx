"use client"
import { Suspense, useEffect, useState } from "react"
import { BlitzPage } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { UserRoleEnum } from "@prisma/client"

import AdminLayout from "src/core/layouts/AdminLayout"
import AdminEditItemController from "src/items/components/admin/AdminEditItemController"
import createDraftItem from "src/items/mutations/createDraftItem"
import { ItemFull } from "types"

const AdminNewItem = (props) => {
  let item: ItemFull | null
  const [draftItemMutation] = useMutation(createDraftItem)
  const [draftItem, setDraftItem] = useState<ItemFull | null>(null)

  useEffect(() => {
    const getDraftItem = async () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      item = await draftItemMutation()
      await setDraftItem(item)
    }
    getDraftItem()
  }, [])

  return <>{draftItem && <AdminEditItemController id={draftItem.id} />}</>
}

const AdminNewItemPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminNewItem />
    </Suspense>
  )
}

AdminNewItemPage.authenticate = { role: UserRoleEnum.ADMIN, redirectTo: "/" }
AdminNewItemPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export { getServerSideProps } from "src/core/getServerSideProps"
export default AdminNewItemPage
