/* eslint-disable @next/next/no-img-element */
import { Routes } from "@blitzjs/next"
import React from "react"
import Link from "next/link"

import Button from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
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
            <Link href={Routes.ShowAdminItemPage({ itemId: item.id })}>
              <img
                className="h-20 w-20 rounded-md object-cover object-center"
                src={item.images[0]?.image.url}
                alt=""
              />
            </Link>
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
            <Link href={Routes.AdminEditItemPage({ itemId: item.id }).href}>
              <Button buttonText={"Редактировать"} />
            </Link>
          </td>
        </tr>
      )}
    </>
  )
}

export default AdminItem
