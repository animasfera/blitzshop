"use client"
import React, { Suspense } from "react"
import { z } from "zod"

import { Form, FormProps, FORM_ERROR } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { ItemFull } from "types"

export interface IItemForm<S> extends FormProps<any> {
  item: ItemFull | null
}
export function ItemForm<S extends z.ZodType<any, any>>(props: IItemForm<S>) {
  const { item } = props

  return (
    <>
      {item && (
        <Form<S> {...props}>
          <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <div className="sm:col-span-8 lg:col-span-7">
              <LabeledTextField
                name="title"
                type="text"
                label="Название"
                placeholder={item.title}
              />
              {/* <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{item.title}</h2> */}

              <section aria-labelledby="information-heading" className="mt-3">
                <h3 id="information-heading" className="sr-only">
                  Информация
                </h3>

                <p className="text-2xl text-gray-900">
                  <LabeledTextField
                    name="amount"
                    type="text"
                    label="Цена"
                    placeholder={(item.amount.amount / 100).toString()}
                  />
                </p>
              </section>
            </div>
            <div className="sm:col-span-4 lg:col-span-5">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.coverImage.image.url}
                  alt={item.title}
                  className="object-cover object-center"
                />
              </div>
            </div>
            {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
          </div>
        </Form>
      )}
    </>
  )
}
