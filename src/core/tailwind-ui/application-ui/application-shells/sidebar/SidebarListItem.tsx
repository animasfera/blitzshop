import React from "react"

import { classNames } from "src/core/helpers/classNames"

interface SidebarListItemProps {
  // TODO: убрать current когда будет настройка навигации
  link: {
    name: string
    href: string
    icon: React.ForwardRefExoticComponent<
      Pick<React.SVGProps<SVGSVGElement>, any> & any & React.RefAttributes<any>
    >
    current?: boolean
  }
}

export const SidebarListItem = (props: SidebarListItemProps) => {
  const { link } = props

  return (
    <li key={link.name}>
      <a
        href={link.href}
        className={classNames(
          link.current
            ? "bg-gray-50 text-indigo-600"
            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
          "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
        )}
      >
        <link.icon
          className={classNames(
            link.current ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600",
            "h-6 w-6 shrink-0"
          )}
          aria-hidden="true"
        />
        {link.name}
      </a>
    </li>
  )
}

export default SidebarListItem
