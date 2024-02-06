import React from "react"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import Layout from "src/core/layouts/Layout"
import Container from "src/core/tailwind-ui/application-ui/Container"
import HeadingPage from "src/core/tailwind-ui/headings/HeadingPage"
import HeadingSection from "src/core/tailwind-ui/headings/HeadingSection"
import HeadingBlock from "src/core/tailwind-ui/headings/HeadingBlock"

import { nl2br } from "src/core/helpers/Helpers"

export const ContactsPage: BlitzPage = () => {
  const { t, i18n } = useTranslation(["pages.contacts"])

  return (
    <Layout title={t("index.headers.main")}>
      <Container size={"sm"}>
        <div className="flex flex-col gap-4">
          <HeadingPage title={t("index.headers.main")} />

          <p className="m-0 mb-2">
            {`${t("index.texts.contactUsByEmail")}: `}
            <span>
              <a href={"mailto:" + process.env.NEXT_PUBLIC_SITE_EMAIL}>
                {process.env.NEXT_PUBLIC_SITE_EMAIL}
              </a>
            </span>
          </p>

          <HeadingSection title={t("index.headers.businessDetails")} />

          {/* <div>
            <HeadingBlock title={t("index.headers.netherlands")} />
            <div>{nl2br(t("index.texts.businessDetailsEu"), false)}</div>
          </div> */}

          <div>
            <HeadingBlock title={t("index.headers.russia")} />
            <div>{nl2br(t("index.texts.businessDetailsRu"), false)}</div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default ContactsPage

/*
TODO:
<>
  {i18n.resolvedLanguage === "ru" && (
    <div>
        <HeadingBlock title={t("index.headers.russia")} />
        <div>{nl2br(t("index.texts.businessDetailsRu"), false)}</div>
      </div>
  )}
</>
*/
