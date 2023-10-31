import Link from "next/link"
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
      <Link href={`/`}>
        <Button variant={"soft"} buttonText={t("main.links.home")} />
      </Link>
      <Link href={link ? link.href : `/products`}>
        <Button buttonText={link ? link.text : t("main.links.products")} />
      </Link>
    </div>
  )
}

export default ErrorRedirect
