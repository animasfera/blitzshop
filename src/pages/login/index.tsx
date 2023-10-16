"use client"
import { BlitzPage } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { Routes } from "@blitzjs/next"

import { Layout } from "src/core/layouts/Layout"
import { AuthContainer } from "src/auth/components/AuthContainer"
import { LoginForm } from "src/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  const { t } = useTranslation(["pages.login"])

  return (
    <Layout title={t("title")} styles={"bg-gray-50 pb-0 xs:p-0"}>
      <AuthContainer
        title={t("title")}
        link={{
          message: t("loginForm.texts.noAccount"),
          href: Routes.SignupPage().href,
          text: t("loginForm.links.register"),
        }}
      >
        <LoginForm
          onSuccess={(_user) => {
            const next = router.query.next
              ? decodeURIComponent(router.query.next as string)
              : Routes.ProductsPage().href

            void router.push(next)
          }}
        />
      </AuthContainer>
    </Layout>
  )
}

export default LoginPage
