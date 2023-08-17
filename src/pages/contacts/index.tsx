import React from "react"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import Layout from "src/core/layouts/Layout"
import Container from "src/core/tailwind-ui/application-ui/Container"
import HeadingPage from "src/core/tailwind-ui/headings/HeadingPage"
import { nl2br } from "src/core/helpers/Helpers"

interface ContactsPageProps {}

export const ContactsPage: BlitzPage = (props: ContactsPageProps) => {
  const {} = props

  const { t, i18n } = useTranslation(["pages.contacts"])

  return (
    <Layout title={t("index.headers.main")}>
      <Container size={"sm"}>
        <HeadingPage title={t("index.headers.main")} />
      </Container>
    </Layout>
  )
}

export default ContactsPage

/*
    <>
      <Heading mb={6}>{t("index.headers.main")}</Heading>

      <Stack spacing={5} mb={10}>
        <HStack spacing={2}>
          <Box textAlign={"right"}>{t("index.texts.contactUsByEmail")}:</Box>
          <Box textAlign={"left"}>
            <a href={"mailto:" + process.env.NEXT_PUBLIC_SITE_EMAIL}>
              {process.env.NEXT_PUBLIC_SITE_EMAIL}
            </a>
          </Box>
        </HStack>
      </Stack>

      <Heading size={"md"}>{t("index.headers.businessDetails")}</Heading>

      <Heading size={"sm"} mb={1}>
        {t("index.headers.netherlands")}
      </Heading>
      <Box>{nl2br(t("index.texts.businessDetailsEu"), false)}</Box>

      {i18n.resolvedLanguage === "ru" && (
        <>
          <Heading size={"sm"} mt={6} mb={1}>
            {t("index.headers.russia")}
          </Heading>
          <Box>{nl2br(t("index.texts.businessDetailsRu"), false)}</Box>
        </>
      )}
    </>
    */

/*
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

*/
