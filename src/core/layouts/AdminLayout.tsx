import Head from "next/head"
import React, { useEffect } from "react"
import { BlitzLayout } from "@blitzjs/next"

import i18n from "src/core/i18n"
import { Container } from "src/core/tailwind-ui/application-ui/Container"
import { useSession } from "@blitzjs/auth"
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"
import AdminSidebar from "../tailwind-ui/application-ui/admin/AdminSidebar"
interface AdminLayoutProps {
  title?: string
  styles?: string
  children?: React.ReactNode
}
const navigation = [{ name: "Dashboard", href: "#", icon: UserCircleIcon, current: true }]

export const AdminLayout: BlitzLayout<AdminLayoutProps> = (props) => {
  const { title, styles, children } = props
  const session = useSession({ suspense: false })
  useEffect(() => {
    // @ts-ignore
    document.documentElement.lang = i18n.resolvedLanguage?.toUpperCase()
  }, [])

  return (
    <>
      <Head>
        <title>{title || "Administration"}</title>
        <link rel="icon" href="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" />
      </Head>
      {session.role === "ADMIN" ? <AdminSidebar>{children}</AdminSidebar> : <p>Admin only</p>}
    </>
  )
}

export default AdminLayout
