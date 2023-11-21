import { useTranslation } from "react-i18next"

import { classNames } from "src/core/helpers/classNames"
import { OrderLog, OrderStatusEnum } from "@prisma/client"
import { useSession } from "@blitzjs/auth"

import { DateTime } from "luxon"

import OrderLogStatus from "src/order-logs/components/OrderLogStatus"
import OrderLogCirclePulse from "src/order-logs/components/OrderLogCirclePulse"
import OrderLogCircleStatic from "src/order-logs/components/OrderLogCircleStatic"

interface OrderLogListProps {
  orderLogs: OrderLog[]
}

export interface OrderLogActivityItem {
  id: number
  createDateTime: string | null
  status: OrderStatusEnum | null
}

export const OrderLogList = (props: OrderLogListProps) => {
  const { orderLogs } = props
  const session = useSession()

  const activity: OrderLogActivityItem[] = orderLogs.map((orderLog) => ({
    id: orderLog.id,
    createDateTime: DateTime.fromJSDate(orderLog.createdAt).toRelative(),
    status: orderLog.status || null,
  }))

  const { t } = useTranslation(["pages.admin.orderId", "pages.orderId"])

  return (
    <>
      <div className="mt-8">
        <ul role="list" className="space-y-6">
          {activity.map((activityItem, activityItemIdx) => (
            <li
              key={activityItem.id}
              className="group relative min-h-fit flex gap-x-4 text-gray-400"
            >
              <div
                className={classNames(
                  activityItemIdx === activity.length - 1 ? "h-6" : "-bottom-6",
                  "absolute left-0 top-0 flex w-6 justify-center"
                )}
              >
                <div className="w-px bg-gray-200" />
              </div>

              <div>
                <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                  {activityItemIdx === 0 ? (
                    activityItem.status === OrderStatusEnum.COMPLETED ? (
                      <OrderLogCircleStatic styles="bg-green-100 ring-green-600" />
                    ) : (
                      <>
                        <OrderLogCirclePulse />
                      </>
                    )
                  ) : (
                    <>
                      <OrderLogCircleStatic />
                    </>
                  )}
                </div>
              </div>

              <>
                <OrderLogStatus
                  status={t("pages.orderId:head.status." + activityItem.status)}
                  createDateTime={activityItem.createDateTime}
                />
              </>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default OrderLogList
