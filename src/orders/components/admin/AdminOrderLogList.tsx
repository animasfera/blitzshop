import { useTranslation } from "react-i18next"

import { OrderFull } from "../../schemas"
import { classNames } from "src/core/helpers/classNames"
import { OrderLog, OrderStatusEnum } from "@prisma/client"
import { useSession } from "@blitzjs/auth"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import Form from "src/core/components/form/Form"
import LabeledTextField from "src/core/components/form/LabeledTextField"
import LabeledTextareaField from "src/core/components/form/LabeledTextareaField"
import { DateTime } from "luxon"
import { UserPublicInfoType } from "src/users/schemas"

interface AdminOrderLogListProps {
  orderLogs: (OrderLog & {
    user?: UserPublicInfoType | null
  })[]
  trashButtonClick: (orderLogId: number) => void
}

enum AdminOrderLogActivityItemType {
  "status",
  "comment",
}

export interface AdminOrderLogActivityItem {
  id: number
  dateTime: string | null
  person?: UserPublicInfoType | null
  status: OrderStatusEnum | null
  type: AdminOrderLogActivityItemType
  comment: string | null
}

export const AdminOrderLogList = (props: AdminOrderLogListProps) => {
  const { orderLogs, trashButtonClick } = props
  const session = useSession()

  const activity: AdminOrderLogActivityItem[] = orderLogs.map((orderLog) => ({
    id: orderLog.id,
    dateTime: DateTime.fromJSDate(orderLog.createdAt).toRelative(),
    person: orderLog.user,
    status: orderLog.status,
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
              <div
                className={classNames(
                  activityItemIdx === activity.length - 1 ? "h-6" : "-bottom-6",
                  "absolute left-0 top-0 flex w-6 justify-center"
                )}
              >
                <div className="w-px bg-gray-200" />
              </div>
              {activityItem.person ? (
                <div className="w-6">
                  {activityItem.person.avatarUrl ? (
                    <img
                      src={activityItem.person.avatarUrl}
                      alt=""
                      className="relative h-6 w-6 flex-none rounded-full bg-gray-50"
                    />
                  ) : (
                    <div className="relative flex h-6 w-6 rounded-full justify-center bg-gray-500">
                      <span className="font-small text-center text-gray-100">
                        {activityItem.person.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                    {activityItemIdx === 0 ? (
                      activityItem.status === OrderStatusEnum.COMPLETED ? (
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
                </div>
              )}

              {activityItem.type === AdminOrderLogActivityItemType.status ? (
                <>
                  <p
                    className={classNames(
                      "flex-auto py-0.5 leading-5 text-xs",
                      activityItemIdx === 0
                        ? activityItem.status !== OrderStatusEnum.COMPLETED
                          ? "font-bold text-indigo-500"
                          : "font-medium text-green-500"
                        : "font-medium text-gray-500"
                    )}
                  >
                    <span className="font-medium text-gray-400">
                      {activityItem.person?.username}
                    </span>{" "}
                    {activityItem.status
                      ? t("pages.orderId:head.status." + activityItem.status)
                      : ""}
                  </p>
                  <time className="flex-none text-xs leading-5 text-gray-500">
                    {activityItem.dateTime}
                  </time>
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
                </>
              ) : (
                <>
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">
                          {activityItem.person?.username}
                        </span>
                        :
                      </div>
                      <time className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                        {activityItem.dateTime}
                      </time>
                    </div>
                    <p className="text-sm leading-6 text-gray-500">{activityItem.comment}</p>
                  </div>
                  {activityItem.person?.id === session.userId && (
                    <div
                      className="absolute flex flex-row outline outline-indigo-100 outline-1 duration-300 group-hover:opacity-100 h-6 rounded top-[-10px] right-0 text-gray-400 bg-white opacity-0 drop-shadow-lg
                shadow-indigo-400/50"
                    >
                      <button
                        className="p-1 h-6 w-6 hover:bg-indigo-200 hover:text-gray-900"
                        onClick={() => {}}
                      >
                        <PencilIcon />
                      </button>
                      <button
                        className="p-1 h-6 w-6 hover:bg-indigo-200 hover:text-gray-900"
                        onClick={() => trashButtonClick(activityItem.id)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  )}
                </>
              )}
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
          {/* forma */}
          <Form
            submitText="Отправить"
            onSubmit={async (i) => {
              alert()
            }}
          >
            <LabeledTextareaField name="comment" label="" placeholder="Ваш комментарий" rows={3} />

            {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
          </Form>
        </div>
      </div>
    </>
  )
}

export default AdminOrderLogList
