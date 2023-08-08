import { Box } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Form, FormProps } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import LabeledTextareaField from "src/core/components/form/LabeledTextareaField"
import LabeledGeocodingField from "src/core/components/form/LabeledGeocodingField"
import { LabeledCheckboxField } from "src/core/components/form/LabeledCheckboxField"

export { FORM_ERROR } from "src/core/components/form/Form"

export function UserForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { t } = useTranslation(["user"])

  return (
    <>
      <Form<S> {...props}>
        <LabeledTextField
          name="firstName"
          label={t("form.fields.firstName.label")}
          helperText={t("form.fields.firstName.help")}
        />
        <LabeledTextField name="lastName" label={t("form.fields.lastName.label")} />
        <LabeledTextField
          name="username"
          label={t("form.fields.username.label")}
          placeholder={t("form.fields.username.placeholder")}
        />

        {props.initialValues?.isGuide && (
          <Box color={"gray"} py={6}>
            {t("form.texts.shareContacts")}
          </Box>
        )}

        <LabeledTextField name="email" label={t("form.fields.email.label")} type="email" />

        {props.initialValues?.isGuide && (
          <>
            <LabeledCheckboxField name={"share_email"} label={t("form.fields.share_email.label")} />
            <LabeledTextField
              name="phone"
              label={t("form.fields.phone.label")}
              placeholder={"+7 912 000 0000"}
            />
            <LabeledCheckboxField name={"share_phone"} label={t("form.fields.share_phone.label")} />
            <LabeledTextField
              name="telegram"
              label={t("form.fields.telegram.label")}
              placeholder={"john"}
            />

            <LabeledCheckboxField
              name={"share_telegram"}
              label={t("form.fields.share_telegram.label")}
            />

            <Box mb={12}></Box>
            <LabeledGeocodingField
              name={"location"}
              label={t("form.fields.location.label")}
              help={t("form.fields.location.help")}
            />
          </>
        )}

        <LabeledTextareaField name={"about"} label={t("form.fields.about.label")} />
      </Form>
    </>
  )
}
