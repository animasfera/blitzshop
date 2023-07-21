import Head from "next/head"
import { useRouter } from "next/router"
import { useSession } from "@blitzjs/auth"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { Box } from "@chakra-ui/react"
import { UserRoleEnum } from "@prisma/client"

import AdminSidebar from "src/core/components/sections/AdminSidebar"
import { Loading } from "src/core/components/Loading"

const AdminLayout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  const session = useSession()
  const router = useRouter()

  if (session.role !== UserRoleEnum.ADMIN) {
    void router.push(Routes.Home())
  }

  return (
    <>
      <Head>
        <title>{title || "leela"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AdminSidebar>
        <Box maxW={"container.xl"} pt={4} pb={12} pl={6} pr={4}>
          <Loading>{children}</Loading>
        </Box>
      </AdminSidebar>
    </>
  )
}

AdminLayout.authenticate = true
export default AdminLayout
