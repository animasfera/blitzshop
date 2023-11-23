import Link from "next/link"
import { useSession } from "@blitzjs/auth"
import { useRouter } from "next/router"
import React, { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import Sidebar from "src/core/tailwind-ui/application-ui/application-shells/sidebar/Sidebar"
import { Routes } from "@blitzjs/next"
import { AdjustmentsHorizontalIcon, UserCircleIcon } from "@heroicons/react/20/solid"

type SettingsMenuProps = {
  children: ReactElement | ReactElement[]
}
export const SettingsMenu = (props: SettingsMenuProps) => {
  const router = useRouter()
  const routerPathname = router.pathname
  const user = useSession().user
  const { t } = useTranslation(["pages.settings"])

  if (!user) {
    router.push("/")
  }
  const navigation = [
    {
      name: t("navigation.general"),
      href: Routes.SettingsPage().href,
      icon: AdjustmentsHorizontalIcon,
      current: routerPathname === Routes.SettingsPage().href,
    },
    {
      name: t("navigation.profile"),
      href: Routes.SettingsProfilePage().href,
      icon: UserCircleIcon,
      current: routerPathname === Routes.SettingsProfilePage().href,
    },
  ]
  const { children } = props

  return (
    <>
      <Sidebar navigation={navigation}>{children}</Sidebar>
    </>
  )
}
