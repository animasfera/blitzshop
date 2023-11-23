import React from "react"
import { TrashIcon } from "@heroicons/react/24/outline"
import { classNames } from "src/core/helpers/classNames"
import { OrderStatusEnum } from "@prisma/client"
import { UserPublicInfoType } from "src/users/schemas"
import { useTranslation } from "react-i18next"

interface OrderLogStatusProps {
  status: string | null
  person?: UserPublicInfoType | null
  createDateTime: string | null
  textStatusColor?: string
  textPersonColor?: string
  textDateColor?: string
}

const OrderLogStatus = (props: OrderLogStatusProps) => {
  const { status, person, createDateTime, textStatusColor, textPersonColor, textDateColor } = props

  return (
    <>
      <p
        className={classNames(
          "flex-auto py-0.5 leading-5 text-xs font-medium",
          textStatusColor ? textStatusColor : "text-gray-500"
        )}
      >
        <span
          className={classNames("font-medium", textPersonColor ? textPersonColor : "text-gray-500")}
        >
          {person?.username}
        </span>{" "}
        {status ? status : ""}
      </p>
      <time
        className={classNames(
          "flex-none text-xs leading-5",
          textDateColor ? textDateColor : "text-gray-500"
        )}
      >
        {createDateTime}
      </time>
    </>
  )
}

export default OrderLogStatus
