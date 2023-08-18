"use client"
import React from "react"
import { BlitzPage } from "@blitzjs/next"
import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import Head from "next/head"
import { Box, Heading } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import { Loading } from "src/core/components/Loading"

import { SettingsMenu } from "src/settings/components/SettingsMenu"
import Layout from "src/core/layouts/Layout"
import { UserSettingsForm } from "src/users/components/UserSettingsForm"
import { UserSettingsGuideForm } from "src/users/components/UserSettingsGuideForm"
import getCurrentUser from "src/users/queries/getCurrentUser"
import updateUser from "src/users/mutations/updateUser"
import { UpdateUserSchema } from "src/users/schemas"
import { useCurrentUser } from "src/core/hooks/useCurrentUser"

const SettingsPage: BlitzPage = () => {
  return <>SettingsPage</>
  /*
  const { t } = useTranslation(["pages.settings"])
  const currentUser = useCurrentUser()
  const [updateUserMutation] = useMutation(updateUser)

  return (
    <>
      <Head>
        <title>{t("index.headers.main")}</title>
      </Head>
      <SettingsMenu>
        <Heading size={"md"}>{t("index.headers.main")}</Heading>
        <Box maxW={"600px"}>
          <Loading>
            <UserSettingsForm
              schema={UpdateUserSchema}
              initialValues={currentUser!}
              onSubmit={async (values) => {
                await updateUserMutation(values)
                void invalidateQuery(getCurrentUser)

                // if (values.locale && values.locale !== i18n.resolvedLanguage) {
                //   void i18n.changeLanguage(values.locale)
                // }

              }}
            />
            <UserSettingsGuideForm
              schema={UpdateUserSchema}
              initialValues={currentUser!}
              onSubmit={async (values) => {
                if (confirm(t("pages.settings:profile.headers.confirm"))) {
                  await updateUserMutation(values)
                  void invalidateQuery(getCurrentUser)
                }
              }}
            />
          </Loading>
        </Box>
      </SettingsMenu>
    </>
  )
  */
}

// SettingsPage.authenticate = true
// SettingsPage.getLayout = (page) => <Layout>{page}</Layout>

export default SettingsPage
