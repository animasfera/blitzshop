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
import Button from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { ItemFull } from "types"

export interface IAdminItemsItem {
  onItemClick?: (item: Item) => void
  onEditClick?: (item: IAdminItemsItem["item"]) => void
  item: ItemFull | null
}

const AdminItemsItem = (props: IAdminItemsItem) => {
  const { item, onItemClick, onEditClick } = props
  return (
    <>
      {item && (
        <tr className="">
          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.id}</td>
          <td className="hidden  w-40 px-3 py-2 text-sm text-gray-500 lg:table-cell">
            <img
              className="h-20 w-20 rounded-md object-cover object-center  cursor-pointer"
              src={item.coverImage?.image.url}
              alt=""
              onClick={() => onItemClick && onItemClick(item)}
            />
          </td>
          <td className="px-3 py-1 text-sm text-gray-500 sm:table-cell">
            <dl className="font-normal lg:hidden">
              <dt className="sr-only sm:hidden">Картинка</dt>
              <dd className="mt-1 truncate text-gray-500 ">
                <img
                  className="h-20 w-20 rounded-md object-cover object-center  cursor-pointer"
                  src={item.coverImage?.image.url}
                  alt=""
                />
              </dd>
            </dl>
            {item.title}
          </td>
          <td className=" py-4 text-sm text-gray-500">{item.category?.titleRu}</td>
          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.status}</td>
          <td className="px-3 py-4 text-sm text-gray-500">{item.qty}</td>
          <td className="py-4 pl-3 pr-4 align-center text-sm font-medium sm:pr-0">
            <Button buttonText="Edit" handleClick={() => onEditClick && onEditClick(item)} />
          </td>
        </tr>
      )}
    </>
  )
}

export default AdminItemsItem
