import { ReactElement, Suspense } from "react"
import { useTranslation } from "react-i18next"

export const Loading = (props: { fallback?: ReactElement; children: any }) => {
  const { fallback, children } = props

  const { t } = useTranslation(["translation"])

  return <Suspense fallback={fallback ?? <>{t("loading")}</>}>{children}</Suspense>
}
