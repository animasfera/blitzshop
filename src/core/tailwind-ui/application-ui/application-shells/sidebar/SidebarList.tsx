import React from "react"

import { SidebarListItem } from "src/core/tailwind-ui/application-ui/application-shells/sidebar/SidebarListItem"

interface SidebarListProps {
  // TODO: убрать current когда будет настройка навигации
  list: {
    name: string
    href: string
    icon: React.ForwardRefExoticComponent<
      Pick<React.SVGProps<SVGSVGElement>, any> & any & React.RefAttributes<any>
    >
    current?: boolean
  }[]
  sidebarOpen?: boolean
}

export const SidebarList = (props: SidebarListProps) => {
  const { list } = props

  return (
    <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
      {list.map((item) => (
        <SidebarListItem key={item.name} link={item} />
      ))}
    </ul>
  )
}

export default SidebarList
