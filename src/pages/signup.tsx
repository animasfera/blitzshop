import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import { SignupForm } from "src/auth/components/SignupForm"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { Loading } from "src/core/components/Loading"
import Container from "../core/tailwind-ui/application-ui/Container"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  const { t } = useTranslation(["pages.signup"])

  return (
    <Layout title={t("title")}>
      <Container size={"sm"}>
        <SignupForm onSuccess={() => router.push(Routes.Home())} />
      </Container>
    </Layout>
  )
}

export default SignupPage
