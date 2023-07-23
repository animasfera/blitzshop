import React, { Suspense } from "react"
import { z } from "zod"

import { Form, FormProps } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
export { FORM_ERROR } from "src/core/components/form/Form"

export function MailForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  )
}