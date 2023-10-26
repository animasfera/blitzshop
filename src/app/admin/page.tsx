import { BlitzPage } from "@blitzjs/next"
import { Metadata } from "next"
import { Loading } from "src/core/components/Loading"

export const metadata: Metadata = {
  title: "Дэшборд | Администрирование",
}

const AdminPage: BlitzPage = () => {
  return <Loading>Dashboard</Loading>
}

export { getServerSideProps } from "src/core/getServerSideProps"
export default AdminPage
