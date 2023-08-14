"use client"
import React, { Suspense } from "react"
import { z } from "zod"

import { Form, FormProps, FORM_ERROR } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"

export function ItemForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  )
}
