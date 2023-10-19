import React, { Suspense } from "react"
import { z } from "zod"
import { Form, FormProps } from "src/core/components/form/Form"
import { LabeledCheckboxField } from "src/core/components/form/LabeledCheckboxField"

export interface IAdminSettings<S> extends FormProps<any> {}
export function AdminSettingsForm<S extends z.ZodType<any, any>>(props: IAdminSettings<S>) {
  return (
    <Form<S> {...props}>
      <h3 className="mb-4">Разрешить:</h3>
      <LabeledCheckboxField name="allowSales" label="Разрешить продажи" />
    </Form>
  )
}
