import { classNames } from "src/core/helpers/classNames"
import React, { HTMLAttributes } from "react"
import { HomeIcon } from "@heroicons/react/24/outline"

export interface IAdminSidebarMenuItem {
  item: {
    name: string
    href: string
    icon?: any
    current?: boolean
  }
}

const AdminSidebarMenuItem = (props: IAdminSidebarMenuItem) => {
  const { item } = props

  return (
    <>
      <a
        href={item.href}
        className={classNames(
          item.current
            ? "bg-gray-50 text-indigo-600"
            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
        )}
      >
        <item.icon
          className={classNames(
            item.current ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600",
            "h-6 w-6 shrink-0"
          )}
          aria-hidden="true"
        />
        {item.name}
      </a>
    </>
  )
}

export default AdminSidebarMenuItem
