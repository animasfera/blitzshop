import React from "react"
import AdminItemsItem, { IAdminItemsItem } from "./AdminItemsItem"

export interface IAdminItemsList {
  items: IAdminItemsItem["item"][]
  onItemClick: (item: IAdminItemsItem["item"]) => void
  onEditClick?: (item: IAdminItemsItem["item"]) => void
}
const AdminItemsList = (props: IAdminItemsList) => {
  const { items, onItemClick, onEditClick } = props
  return (
    <div className="px-4 sm:px-4 lg:px-4">
      <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                id
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Картинка
              </th>
              <th
                scope="col"
                className="py-3.5 px-3 pr-1 text-left text-sm font-semibold text-gray-900 "
              >
                Название
              </th>
              <th
                scope="col"
                className="hidden py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Категория
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Статус
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Количество
              </th>

              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <button>
                  <span className="sr-only">Edit</span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {items.map((item) => (
              <AdminItemsItem
                key={item?.id}
                item={item}
                onItemClick={() => onItemClick(item)}
                onEditClick={onEditClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminItemsList
