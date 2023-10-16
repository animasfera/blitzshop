/* eslint-disable @next/next/no-img-element */
import {
  Category,
  ChatRoom,
  Image,
  ImageToItem,
  Item,
  Location,
  Price,
  Prisma,
  User,
} from "@prisma/client"

import React from "react"
export interface IAdminItemsItem {
  item: Item & {
    location: Location | null
    user: User | null
    amount: Price
    category: Category | null
    _count: Prisma.ItemCountOutputType
    chatRoom: ChatRoom | null
    images: ImageToItem[]
    coverImage: ImageToItem & {
      image: Image
    }
  }
}

const AdminItemsItem = (props: IAdminItemsItem) => {
  const { item } = props
  return (
    <tr>
      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.id}</td>
      <td className="hidden  w-40 px-3 py-2 text-sm text-gray-500 lg:table-cell">
        <img
          className="h-20 w-20 rounded-md object-cover object-center"
          src={item.coverImage.image.url}
          alt=""
        />
      </td>
      <td className="px-3 py-1 text-sm text-gray-500 sm:table-cell">
        <dl className="font-normal lg:hidden">
          <dt className="sr-only sm:hidden">Картинка</dt>
          <dd className="mt-1 truncate text-gray-500 ">
            <img
              className="h-20 w-20 rounded-md object-cover object-center"
              src={item.coverImage.image.url}
              alt=""
            />
          </dd>
        </dl>
        {item.title}
      </td>
      <td className=" py-4 text-sm text-gray-500">{item.category?.titleRu}</td>
      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.status}</td>
      <td className="px-3 py-4 text-sm text-gray-500">{item.qty}</td>
      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit<span className="sr-only">, {item.title}</span>
        </a>
      </td>
    </tr>
  )
}

export default AdminItemsItem
