import React from "react"
import { useSession } from "@blitzjs/auth"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { SettingsMenu } from "src/settings/components/SettingsMenu"
import { FORM_ERROR, UserForm } from "src/users/components/UserForm"
import { UpdateUserSchema } from "src/users/schemas"
import updateUser from "src/users/mutations/updateUser"
import getUser from "src/users/queries/getUser"

const ProfileSettings = () => {
  const { t } = useTranslation(["pages.settings", "translation"])
  const session = useSession()
  const [user, { setQueryData }] = useQuery(
    getUser,
    { id: session.user?.id },
    {
      staleTime: Infinity,
    }
  )
  const [updateUserMutation] = useMutation(updateUser)

  return (
    <Layout title={t("index.title")}>
      <SettingsMenu>
        <UserForm
          submitText={t("translation:save")}
          schema={UpdateUserSchema}
          initialValues={user}
          onSubmit={async (values) => {
            try {
              const updated = await updateUserMutation({
                ...values,
              })
              await setQueryData(updated)
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </SettingsMenu>
    </Layout>
  )
}

export const SettingsProfilePage: BlitzPage = () => {
  return (
    <Loading>
      <ProfileSettings />
    </Loading>
  )
}

export { getServerSideProps } from "src/core/getServerSideProps"
SettingsProfilePage.authenticate = true

export default SettingsProfilePage
