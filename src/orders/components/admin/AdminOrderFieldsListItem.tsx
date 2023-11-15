import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useTranslation } from "react-i18next"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { SelectSubmit } from "src/core/tailwind-ui/application-ui/forms/SelectSubmit"
import { AdminOrderFieldForm } from "src/orders/components/admin/AdminOrderFieldForm"
import { LocaleEnum, OrderStatusEnum } from "../../../../db"
import { OrderStatusesArray, OrderStatusesEnum } from "../../../core/enums/OrderStatusEnum"
import { OrderFull } from "../../schemas"
import { EditableFieldButton } from "./AdminOrder"

interface AdminOrderFieldsListItemItemProps {
  label: string
  value: string | null | undefined | boolean | number
  button?: EditableFieldButton
  isLoading: boolean
  order: OrderFull
  handleUpdateOrder: (values: any) => Promise<void>
}

export const AdminOrderFieldsListItem = (props: AdminOrderFieldsListItemItemProps) => {
  const { label, order, value, button, isLoading, handleUpdateOrder } = props

  const { t, i18n } = useTranslation(["pages.admin.orderId"])
  const [isChange, setChange] = useState(false)
  const isFullScreen = useMediaQuery({ query: "(min-width: 900px)" })

  return (
    <li
      className={`pt-2 flex gap-1 xs:flex-col xs:pb-2 md:flex-row
      ${
        button?.type === "select"
          ? `gap-2 sm:justify-between sm:items-center md:justify-end`
          : `sm:flex-col xl:flex-col ${isFullScreen ? "lg:flex-row" : "lg:flex-col"}`
      }`}
    >
      <dt
        className={`grow font-medium text-gray-900 xs:self-start sm:w-full md:self-center ${
          isFullScreen ? "lg:self-center" : "lg:self-start"
        } xl:self-start`}
      >
        {label}
      </dt>
      <dd
        className={`
        flex justify-between items-center gap-1 xs:flex-col xs:items-start sm:h-[44px] sm:flex-row
        ${isChange ? "" : ""}
        ${
          button?.type === "select" && button?.id && !!value
            ? "md:justify-end"
            : "md:justify-between"
        }`}
      >
        {button?.type !== "select" && (
          <div
            className={`text-gray-900 ${
              isChange ? "w-full" : "px-2 xs:flex xs:h-[44px] xs:items-center"
            }`}
          >
            {isChange && button?.id ? (
              <AdminOrderFieldForm
                name={button.id}
                value={value}
                type={button.type || "string"}
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

        {button?.type !== "select" && !!button?.id && !isChange && (
          <Button
            variant={"link"}
            size={"sm"}
            buttonText={t("translation:edit")}
            onClick={() => {
              setChange(!isChange)
            }}
          />
        )}

        {button?.type === "select" && (
          <div className="px-2">
            <SelectSubmit
              name={button.id ?? `select-${value}`}
              options={button.options || []}
              selected={button.options?.find((item) => item.value === value)}
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

export default AdminOrderFieldsListItem
