import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"

interface HeaderAuthProps {
  path: string
  isMenu?: boolean
}

export const HeaderAuth = (props: HeaderAuthProps) => {
  const { path, isMenu = false } = props

  const { t } = useTranslation(["translation"])

  const loginHref = Routes.LoginPage().href
  const signupHref = Routes.SignupPage().href

  return (
    <div
      className={`${
        isMenu
          ? "flex flex-row space-x-4 items-center self-center md:hidden"
          : "hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-4"
      }`}
    >
      {path !== loginHref && (
        <Link href={loginHref}>
          <Button
            variant={"secondary"}
            buttonText={t("translation:menu.login")}
            styles={"ring-transparent shadow-none"}
          />
        </Link>
      )}
      {!(path === loginHref || path === signupHref) && (
        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
      )}
      {path !== signupHref && (
        <Link href={signupHref}>
          <Button
            variant={"soft"}
            buttonText={t("translation:menu.signup")}
            styles={"bg-transparent shadow-none"}
          />
        </Link>
      )}
    </div>
  )
}

export default HeaderAuth
