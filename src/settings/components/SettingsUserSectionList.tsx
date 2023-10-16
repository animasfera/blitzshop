import React from "react"

import { SettingsUserSectionListItem } from "src/settings/components/SettingsUserSectionListItem"

interface SettingsUserSectionListProps {
  list: {
    label?: string
    value?: string
    type?: "button" | "toogle"
  }[]
}

export const SettingsUserSectionList = (props: SettingsUserSectionListProps) => {
  const { list } = props

  return (
    <dl>
      <ul className="my-6 flex flex-col gap-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
        {list.map(({ label, value, type }) => (
          <SettingsUserSectionListItem
            key={label ?? value}
            label={label}
            value={value}
            type={type}
          />
        ))}
      </ul>
    </dl>
  )
}

export default SettingsUserSectionList
