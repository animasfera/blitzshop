"use client"
import { AuthenticationError, AuthorizationError } from "blitz"
import { useTranslation } from "react-i18next"
import { Loading } from "src/core/components/Loading"
import ErrorSection from "src/core/components/sections/Error/ErrorSection"
import Layout from "src/core/layouts/Layout"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useTranslation(["pages.errors"])

  console.error("Error", error)
  if (error instanceof AuthenticationError) {
    return (
      <Layout title={`${error.statusCode}: ${t("authentication.header.title")}`}>
        <Loading>
          <ErrorSection
            header={{
              statusCode: error.statusCode,
              title: t("authentication.header.title"),
              message: t("authentication.header.message"),
            }}
            link={{ href: "/login", text: t("main.links.signin") }}
          />
        </Loading>
      </Layout>
    )
  } else if (error instanceof AuthorizationError) {
    return (
      <Layout title={`${error.statusCode}: ${t("authorized.header.title")}`}>
        <Loading>
          <ErrorSection
            header={{
              statusCode: error.statusCode,
              title: t("authorized.header.title"),
              message: t("authorized.header.message"),
            }}
            link={{ href: "/login", text: t("main.links.signin") }}
          />
        </Loading>
      </Layout>
    )
  } else {
    const statusCode = (error as any)?.statusCode || 400
    return (
      <Layout title={`${statusCode}: ${error.name}`}>
        <Loading>
          <ErrorSection
            header={{
              statusCode,
              title: error.name,
              message: error.message,
            }}
          />
        </Loading>
      </Layout>
    )
  }
}
