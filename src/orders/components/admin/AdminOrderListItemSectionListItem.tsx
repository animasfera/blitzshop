import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useTranslation } from "react-i18next"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { SelectSubmit } from "src/core/tailwind-ui/application-ui/forms/SelectSubmit"
import { AdminOrderListItemSectionListItemForm } from "src/orders/components/admin/AdminOrderListItemSectionListItemForm"
import { LocaleEnum, OrderStatusEnum } from "../../../../db"
import { OrderStatusesArray, OrderStatusesEnum } from "../../../core/enums/OrderStatusEnum"
import { OrderFull } from "../../schemas"

interface AdminOrderListItemSectionListItemProps {
  label: string
  value: string | null | undefined
  button?: {
    id: string
    select?: boolean
  }
  isLoading: boolean
  order: OrderFull
  handleUpdateOrder: (values: any) => Promise<void>
}

export const AdminOrderListItemSectionListItem = (
  props: AdminOrderListItemSectionListItemProps
) => {
  const { label, order, value, button, isLoading, handleUpdateOrder } = props

  const { t, i18n } = useTranslation(["pages.admin.orderId"])
  const [isChange, setChange] = useState(false)
  const isFullScreen = useMediaQuery({ query: "(min-width: 900px)" })
  const shippingOptions: OptionSelectField[] = Object.values(OrderStatusesArray).map(
    ({ value, nameEn, nameRu }) => ({
      label: i18n.resolvedLanguage === LocaleEnum.ru ? nameRu : nameEn,
      value: value,
    })
  )

  const getStatusOrder = (status: OrderStatusEnum): OptionSelectField => {
    return (
      shippingOptions.find((el) => status === el.value) ?? {
        value: OrderStatusesEnum[status].value,
        label:
          i18n.resolvedLanguage === LocaleEnum.ru
            ? OrderStatusesEnum[status].nameRu
            : OrderStatusesEnum[status].nameEn,
      }
    )
  }

  return (
    <li
      className={`pt-2 flex gap-1 xs:flex-col xs:pb-2 md:flex-row
      ${
        button?.select
          ? `gap-2 sm:justify-between sm:items-center md:justify-end`
          : `sm:flex-col xl:flex-col ${isFullScreen ? "lg:flex-row" : "lg:flex-col"}`
      }`}
    >
      <dt
        className={`max-w-[40%] font-medium text-gray-900 xs:self-start sm:w-full md:self-center ${
          isFullScreen ? "lg:self-center" : "lg:self-start"
        } xl:self-start`}
      >
        {label}
      </dt>
      <dd
        className={`
        flex justify-between items-center gap-1 xs:flex-col xs:items-start sm:h-[44px] sm:flex-row md:w-full
        ${isChange ? "" : ""}
        ${button?.select && button?.id && !!value ? "md:justify-end" : "md:justify-between"}`}
      >
        {!button?.select && (
          <div
            className={`text-gray-900 ${
              isChange ? "w-full" : "px-2 xs:flex xs:h-[44px] xs:items-center"
            }`}
          >
            {isChange && button?.id ? (
              <AdminOrderListItemSectionListItemForm
                name={button.id}
                value={value ?? undefined}
                isLoading={isLoading}
                onSuccess={async (values) => {
                  await handleUpdateOrder(values)
                  setChange(false)
                }}
              />
            ) : (
              value ?? "-"
            )}
          </div>
        )}

        {!button?.select && !!button?.id && !isChange && (
          <Button
            variant={"link"}
            size={"sm"}
            buttonText={!value ? t("translation:create") : t("translation:edit")}
            onClick={() => {
              setChange(!isChange)
            }}
          />
        )}

        {button?.select && button?.id && !!value && (
          <div className="px-2">
            <SelectSubmit
              name={button.id ?? `select-${value}`}
              options={shippingOptions}
              selected={getStatusOrder(order.status)}
              handleChange={async (values) => {
                let obj = {}
                obj[button.id] = values.value

                await handleUpdateOrder(obj)
              }}
              disabled={isLoading}
              outerProps={{ className: "m-0" }}
            />
          </div>
        )}
      </dd>
    </li>
  )
}

export default AdminOrderListItemSectionListItem
