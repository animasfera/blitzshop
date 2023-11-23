import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Form, FormProps } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import LabeledTextareaField from "src/core/components/form/LabeledTextareaField"
export { FORM_ERROR } from "src/core/components/form/Form"

export function UserForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { t } = useTranslation(["user"])

  return (
    <>
      <Form<S> {...props}>
        <LabeledTextField name="firstName" label={t("form.fields.firstName.label")} />
        <LabeledTextField name="lastName" label={t("form.fields.lastName.label")} />
        <LabeledTextField name="email" label={t("form.fields.email.label")} type="email" />
      </Form>
    </>
  )
}
