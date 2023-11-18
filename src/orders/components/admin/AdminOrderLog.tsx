import { useTranslation } from "react-i18next"

import { OrderFull, OrderStatus } from "../../schemas"
import { classNames } from "src/core/helpers/classNames"
import { OrderStatusEnum } from "@prisma/client"
import { useSession } from "@blitzjs/auth"

interface AdminOrderLogProps {
  order: OrderFull
}
export interface AdminOrderLogActivityItem {
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

export const AdminOrderLog = (props: AdminOrderLogProps) => {
  const { order } = props
  const session = useSession()
  const activity: AdminOrderLogActivityItem[] = order.log.map((orderLog) => ({
    id: orderLog.id,
    dateTime: orderLog.createdAt,
    person: orderLog.user,
    type: orderLog.status,
  }))

  const { t } = useTranslation(["pages.admin.orderId"])

  return (
    <>
      <div className="mt-8 xl:w-2/4">
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
              {activityItem.person ? (
                <>
                  {activityItem.person.avatarUrl ? (
                    <img
                      src={activityItem.person.avatarUrl}
                      alt=""
                      className="relative h-6 w-6 flex-none rounded-full bg-gray-50"
                    />
                  ) : (
                    <div className="relative flex h-6 w-6 rounded-full justify-center bg-gray-500">
                      <span className="font-small text-center text-gray-100">
                        {activityItem.person.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                    {activityItemIdx === 0 ? (
                      activityItem.type === OrderStatusEnum.COMPLETED ? (
                        <div
                          className={"h-1.5 w-1.5 rounded-full bg-green-100 ring-1 ring-green-300"}
                        />
                      ) : (
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </span>
                      )
                    ) : (
                      <div
                        className={"h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"}
                      />
                    )}
                  </div>
                </>
              )}

              <p
                className={classNames(
                  "flex-auto py-0.5 leading-5 text-xs",
                  activityItemIdx === 0
                    ? activityItem.type !== OrderStatusEnum.COMPLETED
                      ? "font-bold text-indigo-500"
                      : "font-medium text-green-500"
                    : "font-medium text-gray-500"
                )}
              >
                <span className="text-xs leading-5">
                  {activityItem.type ? OrderStatus[activityItem.type] : ""}
                </span>
              </p>
              <time className="flex-none text-xs leading-5 text-gray-500">
                <span className="font-medium text-gray-400 mr-2">
                  {activityItem.person ? activityItem.person.username : ""}
                </span>
                {activityItem.dateTime.toLocaleString()}
              </time>
            </li>
          ))}
        </ul>

        {/* New comment form */}
        <div className="mt-6 flex gap-x-3">
          {session.user?.avatarUrl ? (
            <img
              src={session.user?.avatarUrl}
              alt=""
              className="h-6 w-6 flex-none rounded-full bg-gray-50"
            />
          ) : (
            <div className="relative flex h-6 w-6 rounded-full justify-center bg-gray-500">
              <span className="font-small text-center text-gray-100">
                {session.user?.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <form action="#" className="relative flex-auto">
            <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
              <label htmlFor="comment" className="sr-only">
                Add your comment
              </label>
              <textarea
                rows={2}
                name="comment"
                id="comment"
                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ml-2"
                placeholder="Add your comment..."
                defaultValue={""}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
              <button
                type="submit"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AdminOrderLog
