import React, { useEffect } from "react"
import Head from "next/head"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { useSession } from "@blitzjs/auth"
import AdminSidebar from "../tailwind-ui/application-ui/admin/AdminSidebar"
import { HomeIcon, CircleStackIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"

import { HomeIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import { UserRoleEnum } from "db"

import i18n from "src/core/i18n"
import AdminSidebar from "src/core/tailwind-ui/application-ui/admin/AdminSidebar"
import { Loading } from "src/core/components/Loading"

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
  const { t } = useTranslation(["pages.errors", "pages.admin.orders", "translation"])

  const navigation = [
    {
      name: "Dashboard",
      href: Routes.AdminPage().href,
      icon: HomeIcon,
      current: routerPathname === Routes.AdminPage().href,
    },
  ]

  useEffect(() => {
    // @ts-ignore
    document.documentElement.lang = i18n.resolvedLanguage?.toUpperCase()
  }, [])

  useEffect(() => {
    console.log("session", session)

    if (!session.isLoading && (!session.user || session.role !== UserRoleEnum.ADMIN)) {
      router.push(Routes.Page401().href)
    }
  }, [session])

  return (
    <Loading>
      <Head>
        <title>{title || "Administration"}</title>
        <link rel="icon" href="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" />
      </Head>

      {session.isLoading || session.role !== UserRoleEnum.ADMIN ? (
        <Loading>{t("translation:loading")}</Loading>
      ) : (
        <AdminSidebar userNavigation={userNavigation} navigation={navigation}>
          {children}
        </AdminSidebar>
      )}
    </Loading>
  )
}

export default AdminLayout
