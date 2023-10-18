import Link from "next/link"

import AdminSidebarMenuItem, { IAdminSidebarMenuItem } from "./AdminSidebarMenuItem"

export interface INavigationAdminSidebar {
  navigation: IAdminSidebarMenuItem["item"][]
}

const AdminSidebarMenu = (props: INavigationAdminSidebar) => {
  const { navigation } = props
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Link href="/">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Sfera"
          />
        </Link>
        <div className="text-lg ml-2">Администрирование</div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item, i) => (
                <AdminSidebarMenuItem key={item.name} item={item} />
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminSidebarMenu
