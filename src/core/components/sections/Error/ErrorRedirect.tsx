import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"

interface ErrorRedirectProps {
  link?: { href: string; text: string }
}

export const ErrorRedirect = (props: ErrorRedirectProps) => {
  const { link } = props

  const { t } = useTranslation(["pages.errors"])

  // TODO: add link to contact
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
      <Link href={Routes.Home().href}>
        <Button variant={"soft"} buttonText={t("main.links.home")} />
      </Link>
      <Link href={link ? link.href : Routes.ProductsPage().href}>
        <Button buttonText={link ? link.text : t("main.links.products")} />
      </Link>
    </div>
  )
}

export default ErrorRedirect
