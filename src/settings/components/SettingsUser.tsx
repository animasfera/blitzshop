import React from "react"

import { Sidebar } from "src/core/tailwind-ui/application-ui/application-shells/sidebar/Sidebar"
import {
  SettingsUserSection,
  SettingsUserSectionProps,
} from "src/settings/components/SettingsUserSection"

interface SettingsUserProps {
  // TODO: убрать current когда будет настройка навигации
  navigation: {
    name: string
    href: string
    icon: React.ForwardRefExoticComponent<
      Pick<React.SVGProps<SVGSVGElement>, any> & any & React.RefAttributes<any>
    >
    current?: boolean
  }[]
  settings: SettingsUserSectionProps[]
}

export const SettingsUser = (props: SettingsUserProps) => {
  const { navigation, settings } = props

  return (
    <Sidebar navigation={navigation}>
      <ul className="flex-auto mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        {settings.map(({ title, description, list, button }) => (
          <li key={title}>
            <SettingsUserSection
              title={title}
              description={description}
              list={list}
              button={button}
            />
          </li>
        ))}
      </ul>
    </Sidebar>
  )
}

export default SettingsUser
