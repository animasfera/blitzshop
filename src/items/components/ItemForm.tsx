"use client"
import { z } from "zod"
import { Form, FormProps, FORM_ERROR } from "src/core/components/form/Form"
import { ItemFull } from "types"
export interface IItemForm<S> extends FormProps<any> {
  item: ItemFull | null
}
export function ItemForm<S extends z.ZodType<any, any>>(props: IItemForm<S>) {
  return (
    <Form<S> {...props}>
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  )
}
