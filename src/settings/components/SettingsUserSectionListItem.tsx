import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Switch } from "@headlessui/react"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { Toogle } from "src/core/tailwind-ui/application-ui/forms/toogles/Toogle"

import { classNames } from "src/core/helpers/classNames"

interface SettingsUserSectionListItemProps {
  label?: string
  value?: string
  type?: "button" | "toogle"
}

export const SettingsUserSectionListItem = (props: SettingsUserSectionListItemProps) => {
  const { label, value, type = "button" } = props

  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)

  const { t } = useTranslation(["translation"])

  return (
    <li className={`pt-6 ${!label ? "flex justify-between gap-x-3" : "sm:flex"}`}>
      <dt
        className={`font-medium text-gray-900 self-center ${
          !!label ? "sm:flex-auto sm:pr-6 max-w-[40%] sm:w-full" : ""
        }`}
      >
        {label ?? value}
      </dt>
      <dd
        className={`mt-1 flex justify-between items-center gap-x-3 sm:mt-0 ${
          !label ? "" : "sm:flex-auto"
        }`}
      >
        {!!label && <div className="text-gray-900">{value}</div>}

        {type === "button" && <Button variant={"link"} buttonText={t("update")} />}

        {type === "toogle" && (
          <Toogle
            name={"timezone"}
            checked={automaticTimezoneEnabled}
            onChange={setAutomaticTimezoneEnabled}
          />
        )}
      </dd>
    </li>
  )
}

export default SettingsUserSectionListItem
