import { useSession } from "@blitzjs/auth"
import { useMutation, useQuery } from "@blitzjs/rpc"
import React from "react"
import Form from "src/core/components/form/Form"
import LabeledTextareaField from "src/core/components/form/LabeledTextareaField"
import createOrderLog from "src/order-logs/mutations/createOrderLog"
import deleteOrderLog from "src/order-logs/mutations/deleteOrderLog"
import updateOrderLog from "src/order-logs/mutations/updateOrderLog"
import getOrderLogs from "src/order-logs/queries/getOrderLogs"
import { OrderFull } from "src/orders/schemas"
import AdminOrderLogAvatar from "./AdminOrderLogAvatar"
import AdminOrderLogList from "./AdminOrderLogList"

interface AdminOrderLogControllerProps {
  order: OrderFull
}

const AdminOrderLogController = (props: AdminOrderLogControllerProps) => {
  const { order } = props
  const session = useSession()
  const [orderLogs, { setQueryData }] = useQuery(getOrderLogs, {
    where: { orderId: order.id },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  })
  const [createOrderLogMutation] = useMutation(createOrderLog)
  const [updateOrderLogMutation] = useMutation(updateOrderLog)
  const [deleteOrderLogMutation] = useMutation(deleteOrderLog)

  return (
    <>
      <AdminOrderLogList
        orderLogs={orderLogs.orderLogs}
        trashButtonClick={async (orderLogId: number) => {
          const deleted = await deleteOrderLogMutation({ id: orderLogId })
          await setQueryData(orderLogs)
        }}
        onCommentChange={async (orderLogId, comment) => {
          await updateOrderLogMutation({ id: orderLogId, comment: comment })
          await setQueryData(orderLogs)
        }}
      />
      <div className="mt-6 flex gap-x-3">
        <AdminOrderLogAvatar
          username={session.user?.username}
          avatarUrl={session.user?.avatarUrl}
        />

        <Form
          submitText="Отправить"
          onSubmit={async (values) => {
            const log = await createOrderLogMutation({
              orderId: order.id,
              userId: session.userId,
              ...values,
            })
            await setQueryData(orderLogs)
          }}
        >
          <LabeledTextareaField name="comment" label="" placeholder="Ваш комментарий" rows={3} />

          {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
        </Form>
      </div>
    </>
  )
}

export default AdminOrderLogController
