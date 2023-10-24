"use client"
import { Suspense } from "react"
import { BlitzPage } from "@blitzjs/auth"
import { UserRoleEnum } from "@prisma/client"
import { useParam } from "@blitzjs/next"

import AdminEditItemController from "src/items/components/admin/AdminEditItemController"
import AdminLayout from "src/core/layouts/AdminLayout"

const AdminEditItem = (props) => {
  const itemId = useParam("itemId", "number")

  return (
    <>
      <AdminEditItemController id={itemId} />
    </>
  )
}

const AdminEditItemPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminEditItem />
    </Suspense>
  )
}

AdminEditItemPage.authenticate = { role: UserRoleEnum.ADMIN, redirectTo: "/" }
AdminEditItemPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export { getServerSideProps } from "src/core/getServerSideProps"
export default AdminEditItemPage
