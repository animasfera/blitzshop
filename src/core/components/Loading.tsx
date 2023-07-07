import { ReactElement, Suspense } from "react"
// import { Box, Container } from "@chakra-ui/react"
// import { useTranslation } from "react-i18next"

export const Loading = (props: {
  fallback?: ReactElement
  children: any
  // withContainer?: boolean
  // size?: string
}) => {
  const { fallback, children } = props
  // const { t } = useTranslation(["translation"])

  // t("loading")
  return <Suspense fallback={fallback ?? <>Loading...</>}>{props.children}</Suspense>
}
