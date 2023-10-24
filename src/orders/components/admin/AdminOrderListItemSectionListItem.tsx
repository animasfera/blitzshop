import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { SelectSubmit } from "src/core/tailwind-ui/application-ui/forms/SelectSubmit"

interface AdminOrderListItemSectionListItemProps {
  label: string
  value: string | null
  button?: {
    id?: string
    select?: boolean
    text: string
  }
  statusOrder: OptionSelectField
  shippingOptions: OptionSelectField[]
}

export const AdminOrderListItemSectionListItem = (
  props: AdminOrderListItemSectionListItemProps
) => {
  const { label, value, button, statusOrder, shippingOptions } = props

  return (
    <li
      className={`pt-2 flex gap-1 xs:flex-col xs:pb-2  md:flex-row lg:flex-row
      ${
        button?.select ? `gap-2 sm:justify-between sm:items-center md:justify-end` : `sm:flex-col`
      }`}
    >
      <dt className={`max-w-[40%] font-medium text-gray-900 xs:self-start sm:w-full`}>{label}</dt>
      <dd
        className={`flex justify-between items-center gap-1 xs:flex-col xs:items-start
        sm:flex-row md:justify-between md:w-full`}
      >
        {!button?.select && !!value && <div className="text-gray-900">{value}</div>}

        {!button?.select && button?.text && !!value && (
          <Button variant={"link"} size={"sm"} buttonText={button.text} styles={"px-0"} />
        )}

        {button?.select && button?.text && !!value && (
          <SelectSubmit
            name={button.id ?? `select-${value}`}
            options={shippingOptions}
            selected={statusOrder}
            // handleChange={(value) => setSelected(value)}
            outerProps={{ className: "m-0" }}
          />
        )}
      </dd>
    </li>
  )
}

export default AdminOrderListItemSectionListItem
