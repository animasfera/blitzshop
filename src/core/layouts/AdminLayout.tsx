/*
import Head from "next/head"
import { useRouter } from "next/router"
import { useSession } from "@blitzjs/auth"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { Box } from "@chakra-ui/react"
import { UserRoleEnum } from "@prisma/client"

import AdminSidebar from "src/core/components/sections/AdminSidebar"
import { Loading } from "src/core/components/Loading"

const AdminLayout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const session = useSession()
  const router = useRouter()


  if (session.role !== UserRoleEnum.ADMIN) {
    // void router.push(Routes.Home())
  }

  return (
    <>
      <Head>
        <title>{title || "shop"}</title>
      </Head>

     <AdminSidebar>
      <Box maxW={"container.xl"} pt={4} pb={12} pl={6} pr={4}>
        <Loading>{children}</Loading>
      </Box>
      </AdminSidebar>
    </>
  )
}
*/

import Head from "next/head"
import React, { useEffect, FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Box, Container } from "@chakra-ui/react"

import { Loading } from "src/core/components/Loading"
import i18n from "../i18n"

const AdminLayout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <Box>
      <Head>
        <title>{title || "shop"}</title>
        {
          // <link rel="icon" href="/favicon.ico" />
        }
      </Head>

      <Loading>{children}</Loading>
    </Box>
  )
}

// AdminLayout.authenticate = true
export default AdminLayout
