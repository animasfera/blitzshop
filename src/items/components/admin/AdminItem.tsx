/* eslint-disable @next/next/no-img-element */
import React from "react"
import { ItemFull } from "types"
export interface IAdminItem {
  item: ItemFull | null
}

const AdminItem = (props: IAdminItem) => {
  const { item } = props
  return (
    <>
      {item && (
        <tr>
          <td className="max-w-fit px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.id}</td>
          <td className="px-3 py-2 text-sm text-gray-500 lg:table-cell">
            <img
              className="h-20 w-20 rounded-md object-cover object-center"
              src={item.coverImage.image.url}
              alt=""
            />
          </td>
          <td className="px-3 py-1 text-sm text-black-600 lg:font-normal sm:table-cell sm:font-semibold">
            {item.title}
            <dl className="font-normal lg:hidden">
              <dt className="sr-only sm:hidden">Картинка</dt>
              <dd className="mt-1 truncate text-gray-500 ">{item.category?.titleRu}</dd>
            </dl>
          </td>
          <td className="hidden py-4 text-sm text-gray-500 ">{item.category?.titleRu}</td>
          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.status}</td>
          <td className="px-3 py-4 text-sm text-gray-500 sm:text-center lg:text-left">
            {item.qty}
          </td>
          <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
              Edit<span className="sr-only">, {item.title}</span>
            </a>
          </td>
        </tr>
      )}
    </>
  )
}

export default AdminItem
