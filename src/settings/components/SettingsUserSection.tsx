import React from "react"
import { PlusSmallIcon } from "@heroicons/react/24/outline"

import { SettingsUserSectionList } from "src/settings/components/SettingsUserSectionList"
import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"

export interface SettingsUserSectionProps {
  title: string
  description?: string
  list?: {
    label?: string
    value?: string
    type?: "button" | "toogle"
  }[]
  button?: {
    buttonText: string
  }
}

export const SettingsUserSection = (props: SettingsUserSectionProps) => {
  const { title, description, list, button } = props

  return (
    <section>
      <h2 className="text-base font-semibold leading-7 text-gray-900">{title}</h2>
      {description && <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p>}

      {list && list.length > 0 && <SettingsUserSectionList list={list} />}

      {button && (
        <div className="flex border-t border-gray-100 pt-6">
          <Button
            variant={"link"}
            startIcon={<PlusSmallIcon className="h-5 w-5" aria-hidden="true" />}
            buttonText={button.buttonText}
          />
        </div>
      )}
    </section>
  )
}

export default SettingsUserSection
