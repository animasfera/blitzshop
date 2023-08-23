import { Form, FormProps } from "src/core/components/form/Form"
import { z } from "zod"
export { FORM_ERROR } from "src/core/components/form/Form"
import { LabeledSelectField } from "src/core/components/form/LabeledSelectField"
import RadioButtonsField from "src/core/components/form/RadioButtonsField"
import { useTranslation } from "react-i18next"
import { Box, Button } from "@chakra-ui/react"
import LabeledTextField from "src/core/components/form/LabeledTextField"
import { Timezones } from "src/core/enums/TimezonesEnum"

export function UserSettingsForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { t } = useTranslation(["user", "translation", "pages.settings"])

  return (
    <>
      <Form<S> {...props}>
        <RadioButtonsField
          name={"locale"}
          label={t("settingsForm.fields.locale.label")}
          options={[
            { label: "En", value: "en" },
            { label: "Ru", value: "ru" },
          ]}
        />

        <LabeledSelectField
          name="timezone"
          label={t("settingsForm.fields.timezone.label")}
          helperText={t("settingsForm.fields.timezone.help")}
          options={Timezones}
        />
        {props.initialValues?.isGuide && (
          <LabeledTextField
            name="emailLeelaCertificate"
            label={t("form.fields.emailLeelaCertificate.label")}
            helperText={t("form.fields.emailLeelaCertificate.help")}
            type="email"
            placeholder={props.initialValues.email}
          />
        )}
        <Box pt={6} pb={6}>
          <Button type={"submit"}>{t("translation:save")}</Button>
        </Box>
      </Form>
    </>
  )
}
