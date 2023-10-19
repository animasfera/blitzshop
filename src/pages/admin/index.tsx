import { BlitzPage } from "@blitzjs/next"

import { AdminLayout } from "src/core/layouts/AdminLayout"
import { Loading } from "src/core/components/Loading"

const AdminPage: BlitzPage = () => {
  return (
    <AdminLayout title={"Admin Dashboard"}>
      <Loading>Dashboard</Loading>
    </AdminLayout>
  )
}

export { getServerSideProps } from "src/core/getServerSideProps"
export default AdminPage
