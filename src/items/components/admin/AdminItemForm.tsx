"use client"
import { z } from "zod"
import { Form, FormProps, FORM_ERROR } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { ItemFull } from "types"
import LabeledSelectField from "src/core/components/form/LabeledSelectField"
import { AccessTypeEnum, ItemStatusEnum } from "@prisma/client"
import { useTranslation } from "react-i18next"
import { ItemAccess } from "src/core/enums/ItemEnums"
import LabeledTextareaField from "src/core/components/form/LabeledTextareaField"

export interface AdminItemFormProps<S> extends FormProps<any> {
  item: ItemFull | null
}
export function AdminItemForm<S extends z.ZodType<any, any>>(props: AdminItemFormProps<S>) {
  const { item } = props
  const { t, i18n } = useTranslation(["item"])
  let _itemStatuses = [] as { value: string; label: string }[]
  for (let key in ItemStatusEnum) {
    _itemStatuses.push({ value: key, label: t("statuses." + ItemStatusEnum[key]) })
  }
  const itemStatuses = _itemStatuses

  let _itemAccess = [] as { value: string; label: string }[]
  for (let key in AccessTypeEnum) {
    _itemAccess.push({ value: key, label: ItemAccess[key] })
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

              {/* <LabeledTextField
                name="amount"
                type="text"
                label="Цена"
                placeholder={(item.amount.amount / 100).toString()}
              /> */}
              <LabeledTextareaField
                name="description"
                type="text"
                label="Описание"
                placeholder={item.description}
              />
              <LabeledTextField name="qty" type="number" label="Остаток" />
              <LabeledTextField name="width" type="number" label="Ширина (см)" />
              <LabeledTextField name="height" type="number" label="Высота (см)" />
              <LabeledTextField name="length" type="number" label="Длина (см)" />
              <LabeledTextField name="weight" type="number" label="Вес (грамм)" />

              <LabeledSelectField options={itemStatuses} name={"status"} label={"Статус"} />
              <LabeledSelectField options={itemAccess} name={"access"} label={"Доступ"} />
            </div>
            <div className="sm:col-span-4 lg:col-span-5">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.images[0]?.image.url}
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
