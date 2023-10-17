import Head from "next/head"
<<<<<<< HEAD
import React, { useEffect, FC } from "react"
import { BlitzLayout } from "@blitzjs/next"

import { Container } from "src/core/tailwind-ui/application-ui/Container"
import i18n from "../i18n"

interface LayoutProps {
  title?: string
  styles?: string
  children?: React.ReactNode
}

export const AdminLayout: BlitzLayout<LayoutProps> = (props) => {
  const { title, styles, children } = props

  useEffect(() => {
    // @ts-ignore
    document.documentElement.lang = i18n.resolvedLanguage?.toUpperCase()
  }, [])

  return (
    <div>
      <Head>
        <title>{title || "shop"}</title>
        <link rel="icon" href="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" />
      </Head>

      <main>
        {
          // TODO: add AdminSidebar
        }
        <Container styles={styles}>{children}</Container>
      </main>
    </div>
  )
}

AdminLayout.authenticate = true
=======
import { BlitzLayout } from "@blitzjs/next"
import { useSession } from "@blitzjs/auth"
import AdminSidebar from "../tailwind-ui/application-ui/admin/AdminSidebar"
import { HomeIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
interface AdminLayoutProps {
  title?: string
  children?: JSX.Element
}

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
]

export const AdminLayout: BlitzLayout<AdminLayoutProps> = (props) => {
  const router = useRouter()
  const routerPathname = router.pathname
  const { title, children } = props
  const session = useSession({ suspense: false })

  const navigation = [
    {
      name: "Dashboard",
      href: Routes.AdminPage().href,
      icon: HomeIcon,
      current: routerPathname === Routes.AdminPage().href,
    },
  ]

  return (
    <>
      <Head>
        <title>{title || "Administration"}</title>
        <link rel="icon" href="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" />
      </Head>
      {session.user && session.role === "ADMIN" ? (
        <AdminSidebar userNavigation={userNavigation} navigation={navigation}>
          {children}
        </AdminSidebar>
      ) : (
        <p>Admin only</p>
      )}
    </>
  )
}

>>>>>>> b844bff2fa7542b70c27be0cbd7fc67fc3908587
export default AdminLayout
