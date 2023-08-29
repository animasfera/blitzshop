import React, { ReactElement } from "react"

import { SidebarList } from "src/core/tailwind-ui/application-ui/application-shells/sidebar/SidebarList"

interface SidebarProps {
  // TODO: убрать current когда будет настройка навигации
  navigation: {
    name: string
    href: string
    icon: React.ForwardRefExoticComponent<
      Pick<React.SVGProps<SVGSVGElement>, any> & any & React.RefAttributes<any>
    >
    current?: boolean
  }[]
  children: ReactElement | ReactElement[]
}

// TODO: сделать стили для темной темы
export const Sidebar = (props: SidebarProps) => {
  const { navigation, children } = props

  return (
    <div className="lg:flex lg:gap-x-6">
      <aside className="flex overflow-x-auto border-b border-gray-900/5 py-2 mb-6 lg:mb-0 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-8 lg:border-r lg:border-gray-900/5 pr-4">
        <nav className="flex-none">
          <SidebarList list={navigation} />
        </nav>
      </aside>

      {children}
    </div>
  )
}

export default Sidebar
