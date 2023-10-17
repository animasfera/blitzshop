import React from "react"
import AdminItemsItem, { IAdminItemsItem } from "./AdminItemsItem"

export interface IAdminItemsList {
  items: IAdminItemsItem["item"][]
}

const AdminItemsList = (props: IAdminItemsList) => {
  const { items } = props
  return (
    <div className="sm:px-0 lg:px-4">
      <div className="lg:mt-8 sm:mt-0 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="max-w-fit px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                #
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 lg:text-left sm:text-center text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Картинка
              </th>
              <th
                scope="col"
                className="py-3.5 px-3 pr-1 text-left text-sm font-semibold text-gray-900 "
              ></th>
              <th
                scope="col"
                className="hidden py-3.5 text-left text-sm font-semibold text-gray-900 "
              >
                Категория
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Статус
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 lg:text-left sm:text-center text-sm font-semibold text-gray-900 w-fit"
              >
                Кол-во
              </th>

              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {items.map((item) => (
              <AdminItemsItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminItemsList
