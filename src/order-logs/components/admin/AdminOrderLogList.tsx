import { useTranslation } from "react-i18next"

import { classNames } from "src/core/helpers/classNames"
import { OrderLog, OrderStatusEnum } from "@prisma/client"
import { useSession } from "@blitzjs/auth"
import Form from "src/core/components/form/Form"
import LabeledTextareaField from "src/core/components/form/LabeledTextareaField"
import { DateTime } from "luxon"
import { UserPublicInfoType } from "src/users/schemas"
import AdminOrderLogComment from "./AdminOrderLogComment"
import OrderLogStatus from "../OrderLogStatus"
import OrderLogCirclePulse from "../OrderLogCirclePulse"
import OrderLogCircleStatic from "../OrderLogCircleStatic"
import AdminOrderLogAvatar from "./AdminOrderLogAvatar"
import { TrashIcon } from "@heroicons/react/24/outline"

interface AdminOrderLogListProps {
  orderLogs: (OrderLog & {
    user?: UserPublicInfoType | null
  })[]
  trashButtonClick: (orderLogId: number) => void
  onCommentChange: (orderLogId: number, comment: string) => void
}

enum AdminOrderLogActivityItemType {
  status = "status",
  comment = "comment",
}

export interface AdminOrderLogActivityItem {
  id: number
  createDateTime: string | null
  createdAt: Date
  updatedAt: Date
  person?: UserPublicInfoType | null
  status: OrderStatusEnum | null
  type: AdminOrderLogActivityItemType
  comment: string | null
}

export const AdminOrderLogList = (props: AdminOrderLogListProps) => {
  const { orderLogs, trashButtonClick, onCommentChange } = props
  const session = useSession()

  const activity: AdminOrderLogActivityItem[] = orderLogs.map((orderLog) => ({
    id: orderLog.id,
    createDateTime: DateTime.fromJSDate(orderLog.createdAt).toRelative(),
    createdAt: orderLog.createdAt,
    updatedAt: orderLog.updatedAt,
    person: orderLog.user || null,
    status: orderLog.status || null,
    type: orderLog.status
      ? AdminOrderLogActivityItemType.status
      : AdminOrderLogActivityItemType.comment,
    comment: orderLog.comment,
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
              {activityItem.person?.id === session.userId && (
                <div
                  className="absolute flex flex-row outline outline-indigo-100 outline-1 duration-300 group-hover:opacity-100 h-6 rounded top-[-10px] right-0 text-gray-400 bg-white opacity-0 drop-shadow-lg
                shadow-indigo-400/50"
                >
                  <button
                    className="p-1 h-6 w-6 hover:bg-indigo-200 hover:text-gray-900"
                    onClick={() => trashButtonClick(activityItem.id)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              )}
              <div
                className={classNames(
                  activityItemIdx === activity.length - 1 ? "h-6" : "-bottom-6",
                  "absolute left-0 top-0 flex w-6 justify-center"
                )}
              >
                <div className="w-px bg-gray-200" />
              </div>
              {activityItem.person ? (
                <AdminOrderLogAvatar
                  username={activityItem.person.username}
                  avatarUrl={activityItem.person.avatarUrl}
                />
              ) : (
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
              )}

              {activityItem.type === AdminOrderLogActivityItemType.status ? (
                <>
                  <OrderLogStatus
                    status={t("pages.orderId:head.status." + activityItem.status)}
                    createDateTime={activityItem.createDateTime}
                    person={activityItem.person}
                  />
                </>
              ) : activityItem.type === AdminOrderLogActivityItemType.comment ? (
                <>
                  <AdminOrderLogComment
                    id={activityItem.id}
                    person={activityItem.person}
                    createDateTime={activityItem.createDateTime}
                    comment={activityItem.comment}
                    isEditable={session.userId === activityItem.person?.id}
                    isEdited={
                      activityItem.updatedAt.toISOString() !== activityItem.createdAt.toISOString()
                    }
                    onChange={(comment) => onCommentChange(activityItem.id, comment)}
                  />
                </>
              ) : (
                <></>
              )}
              <div className="absolute duration-500 right-0 bottom-[-16px] opacity-0 group-hover:opacity-100">
                <time className="flex-none py-0.5 text-xs leading-5 text-gray-300">
                  {activityItem.createdAt?.toLocaleString()}
                </time>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default AdminOrderLogList
