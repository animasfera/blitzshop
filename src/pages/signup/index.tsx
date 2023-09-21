"use client"
import { BlitzPage } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { Routes } from "@blitzjs/next"

import { Layout } from "src/core/layouts/Layout"
import { AuthContainer } from "src/auth/components/AuthContainer"
import { SignupForm } from "src/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  const { t } = useTranslation(["pages.signup"])

  return (
    <Layout title={t("title")} styles={"bg-gray-50 pb-0 xs:p-0"}>
      <AuthContainer
        title={t("title")}
        link={{
          message: t("signupForm.texts.haveAccount"),
          href: Routes.LoginPage().href,
          text: t("signupForm.links.enter"),
        }}
      >
        <SignupForm
          onSuccess={(_user) => {
            const next = router.query.next
              ? decodeURIComponent(router.query.next as string)
              : Routes.LoginPage().pathname

            void router.push(next)
          }}
        />
      </AuthContainer>
    </Layout>
  )
}

export default SignupPage
