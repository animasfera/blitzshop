import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"

interface HeaderAuthProps {
  isMenu?: boolean
}

export const HeaderAuth = (props: HeaderAuthProps) => {
  const { isMenu = false } = props

  const router = useRouter()

  const { t } = useTranslation(["translation"])

  return (
    <div
      className={`${
        isMenu
          ? "flex flex-row space-x-4 items-center self-center lg:hidden"
          : "hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-4"
      }`}
    >
      {router.pathname !== "/login" && (
        <Link href={"/login"}>
          <Button
            variant={"secondary"}
            buttonText={t("translation:menu.login")}
            className={"ring-transparent"}
          />
        </Link>
      )}

      {!(router.pathname === "/login" || router.pathname === "/signup") && (
        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
      )}

      {router.pathname !== "/signup" && (
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
