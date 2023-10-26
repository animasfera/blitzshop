"use client"
import React, { useEffect } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { useSession } from "@blitzjs/auth"
import AdminSidebar from "src/core/tailwind-ui/application-ui/admin/AdminSidebar"
import {
  HomeIcon,
  CircleStackIcon,
  ShoppingCartIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline"
import { usePathname, useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { UserRoleEnum } from "db"
import i18n from "src/core/i18n"
import { Loading } from "src/core/components/Loading"
import { AuthenticationError } from "blitz"

interface AdminLayoutProps {
  title?: string
  children?: JSX.Element
}

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
]

const AdminLayout: BlitzLayout<AdminLayoutProps> = (props) => {
  const router = useRouter()
  const routerPathname = usePathname()
  const { title, children } = props
  const session = useSession({ suspense: false })
  const { t } = useTranslation(["pages.errors", "pages.admin.orders", "translation"])

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: HomeIcon,
      current: routerPathname === "/admin",
    },
    {
      name: "Товары",
      href: "/admin/items",
      icon: CircleStackIcon,
      current: routerPathname === "/admin/items",
    },
    {
      name: t("pages.admin.orders:title"),
      href: "/admin/orders",
      icon: ShoppingCartIcon,
      current: routerPathname === "/admin/orders",
    },
    {
      name: "Настройки",
      href: "/admin/settings",
      icon: AdjustmentsHorizontalIcon,
      current: routerPathname === "/admin/settings",
    },
  ]

  useEffect(() => {
    // @ts-ignore
    document.documentElement.lang = i18n.resolvedLanguage?.toUpperCase()
  }, [])

  useEffect(() => {
    if (!session.isLoading && (!session.user || session.role !== UserRoleEnum.ADMIN)) {
      throw new AuthenticationError()
    }
  }, [session])

  return (
    <Loading>
      {/* <Head>
        <title>{title || "Administration"}</title>
        <link rel="icon" href="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" />
      </Head> */}

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
