import Link from "next/link"
import { useTranslation } from "react-i18next"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"

interface HeaderAuthProps {
  path: string
  isMenu?: boolean
}

export const HeaderAuth = (props: HeaderAuthProps) => {
  const { path, isMenu = false } = props

  const { t } = useTranslation(["translation"])

  return (
    <div
      className={`${
        isMenu
          ? "flex flex-row space-x-4 items-center self-center lg:hidden"
          : "hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-4"
      }`}
    >
      {path !== "/login" && (
        <Link href={"/login"}>
          <Button
            variant={"secondary"}
            buttonText={t("translation:menu.login")}
            className={"ring-transparent"}
          />
        </Link>
      )}

      {!(path === "/login" || path === "/signup") && (
        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
      )}

      {path !== "/signup" && (
        <Link href={"/signup"}>
          <Button
            variant={"soft"}
            buttonText={t("translation:menu.signup")}
            className={"bg-transparent shadow-none"}
          />
        </Link>
      )}
    </div>
  )
}

export default HeaderAuth
