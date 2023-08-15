"use client"
import React, { Suspense } from "react"
import { Form, FormProps } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"

import { z } from "zod"
export { FORM_ERROR } from "src/core/components/form/Form"

export function LocationForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="lat" label="Lat" placeholder="Lat" type="text" />
      <LabeledTextField name="lat" label="Lat" placeholder="Lat" type="text" />
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  )
}
