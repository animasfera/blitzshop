"use client"
import { Suspense } from "react"
import { useParam } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import AdminEditItemController from "src/items/components/admin/AdminEditItemController"
import { BlitzPage } from "@blitzjs/auth"
import { UserRoleEnum } from "@prisma/client"

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
AdminEditItemPage.getLayout = (page) => <Layout>{page}</Layout>

export { getServerSideProps } from "src/core/getServerSideProps"
export default AdminEditItemPage
