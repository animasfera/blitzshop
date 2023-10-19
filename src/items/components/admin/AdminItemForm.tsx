"use client"
import React, { Suspense } from "react"
import { z } from "zod"

import { Form, FormProps, FORM_ERROR } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { ItemFull } from "types"
import Button from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import LabeledSelectField from "src/core/components/form/LabeledSelectField"
import { AccessTypeEnum, ItemStatusEnum } from "@prisma/client"

export interface IAdminItemForm<S> extends FormProps<any> {
  item: ItemFull | null
}
export function AdminItemForm<S extends z.ZodType<any, any>>(props: IAdminItemForm<S>) {
  const { item } = props

  let _itemStatuses = [] as { value: string; label: string }[]
  for (let key in ItemStatusEnum) {
    _itemStatuses.push({ value: key, label: ItemStatusEnum[key] })
  }
  const itemStatuses = _itemStatuses

  let _itemAccess = [] as { value: string; label: string }[]
  for (let key in AccessTypeEnum) {
    _itemAccess.push({ value: key, label: AccessTypeEnum[key] })
  }
  const itemAccess = _itemAccess

  return (
    <>
      {item && (
        <Form<S> {...props}>
          <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-2 sm:grid-cols-12 lg:gap-x-8">
            <div className="sm:col-span-8 lg:col-span-7">
              <LabeledTextField
                name="title"
                type="text"
                label="Название"
                placeholder={item.title}
              />
              {/* <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{item.title}</h2> */}

              <LabeledTextField
                name="amount"
                type="text"
                label="Цена"
                placeholder={(item.amount.amount / 100).toString()}
              />
              <LabeledTextField
                name="description"
                type="text"
                label="Описание"
                placeholder={item.description}
              />
              <LabeledTextField
                name="qty"
                type="text"
                label="Остаток"
                placeholder={item.qty.toString()}
              />
              <LabeledTextField
                name="qty"
                type="text"
                label="Вес (грамм)"
                placeholder={item.weight.toString()}
              />

              <LabeledSelectField
                options={itemStatuses}
                name={"status"}
                placeholder={item.status ? item.status : ""}
                label={"Статус"}
              />
              <LabeledSelectField
                options={itemAccess}
                name={"access"}
                placeholder={item.access ? item.access : ""}
                label={"Доступ"}
              />
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
          </div>
        </Form>
      )}
    </>
  )
}
