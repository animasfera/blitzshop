/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import Button from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { ItemFull } from "types"
export interface IAdminItem {
  item: ItemFull | null
  onItemClick: (item: IAdminItem["item"]) => void
}

const AdminItem = (props: IAdminItem) => {
  const router = useRouter()
  const { item, onItemClick } = props

  return (
    <>
      {item && (
        <tr>
          <td className="max-w-fit px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.id}</td>
          <td className="px-3 py-2 text-sm text-gray-500 lg:table-cell">
            <button onClick={() => onItemClick(item)}>
              <img
                className="h-20 w-20 rounded-md object-cover object-center"
                src={item.coverImage.image.url}
                alt=""
              />
            </button>
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
            <Link href={router.pathname + "/" + item.id + "/edit"}>
              <Button buttonText={"Редактировать"} />
            </Link>
          </td>
        </tr>
      )}
    </>
  )
}

export default AdminItem
