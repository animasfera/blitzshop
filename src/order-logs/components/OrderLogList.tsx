import { OrderStatusEnum } from "@prisma/client"
import { useTranslation } from "react-i18next"
import { OrderFull } from "../../orders/schemas"
import { classNames } from "src/core/helpers/classNames"

interface OrderLogProps {
  order: OrderFull
}
export interface OrderLogListActivityItem {
  id: number
  dateTime: Date
  person?: {
    email: string
    id: number
    username: string
    firstName: string | null
    lastName: string | null
    phone: string | null
    avatarUrl: string | null
  } | null
  type: OrderStatusEnum | null
}

export const OrderLogList = (props: OrderLogProps) => {
  const { order } = props
  const activity: OrderLogListActivityItem[] = order.log.map((orderLog) => ({
    id: orderLog.id,
    dateTime: orderLog.createdAt,
    type: orderLog.status,
  }))
  const { t } = useTranslation(["pages.orderId"])

  return (
    <>
      <div className="mt-8">
        <ul role="list" className="space-y-6">
          {activity.map((activityItem, activityItemIdx) => (
            <li key={activityItem.id} className="relative flex gap-x-4">
              <div
                className={classNames(
                  activityItemIdx === activity.length - 1 ? "h-6" : "-bottom-6",
                  "absolute left-0 top-0 flex w-6 justify-center"
                )}
              >
                <div className="w-px bg-gray-200" />
              </div>

              <>
                <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                  {activityItemIdx === 0 ? (
                    activityItem.type === OrderStatusEnum.COMPLETED ? (
                      <div
                        className={"h-1.5 w-1.5 rounded-full bg-green-100 ring-1 ring-green-300"}
                      />
                    ) : activityItem.type !== OrderStatusEnum.CANCELLED ? (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                      </span>
                    ) : (
                      <div
                        className={"h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"}
                      />
                    )
                  ) : (
                    <div className={"h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"} />
                  )}
                </div>
              </>

              <p
                className={classNames(
                  "flex-auto py-0.5 leading-5 text-xs",
                  activityItemIdx === 0 && activityItem.type !== OrderStatusEnum.CANCELLED
                    ? activityItem.type !== OrderStatusEnum.COMPLETED
                      ? "font-bold text-indigo-500"
                      : "font-medium text-green-500"
                    : "font-medium text-gray-500"
                )}
              >
                <span className="text-xs leading-5">
                  {activityItem.type ? t("head.status." + activityItem.type) : ""}
                </span>
              </p>
              <time className="flex-none text-xs leading-5 text-gray-500">
                {activityItem.dateTime.toLocaleDateString("ru-RU", { timeZone: "UTC" })}
              </time>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default OrderLogList
