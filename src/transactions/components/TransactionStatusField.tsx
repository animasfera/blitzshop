import { useState } from "react"
import { Box, Button } from "@chakra-ui/react"
import { TransactionStatusEnum } from "@prisma/client"

import { StatusBadge } from "src/core/components/StatusBadge"
import { TransactionStatusForm } from "./TransactionStatusForm"

type TransactionStatusFieldProps = {
  status: TransactionStatusEnum
  reason?: string
  statusList:
    | { [key: string]: string | number | boolean | null | undefined }
    | { label: string; value: string | number | boolean | null | undefined }[]
  onChange?: (values: {
    status: TransactionStatusEnum
    failReason?: string
    remoteTransactionId?: string
  }) => void
}

export const TransactionStatusField = (props: TransactionStatusFieldProps) => {
  const { status, reason, statusList, onChange } = props
  const [showForm, setShowForm] = useState(false)

  let statusArray = [] as { label: string; value: string | number | boolean | null | undefined }[]

  const possibleStatusChanges = {
    pending: [
      TransactionStatusEnum.CANCELED,
      TransactionStatusEnum.PAYING,
      TransactionStatusEnum.FINISHED,
      TransactionStatusEnum.FAILED,
    ],
    paying: [
      TransactionStatusEnum.CANCELED,
      TransactionStatusEnum.FINISHED,
      TransactionStatusEnum.FAILED,
    ],
    canceled: [],
    failed: [],
    finished: [],
  }

  if (typeof statusList.length === "undefined") {
    for (var key in statusList) {
      if (possibleStatusChanges[status].indexOf(key) !== -1) {
        statusArray.push({ value: key, label: statusList[key] })
      }
    }
  } else {
    statusArray = statusList as any[]
  }

  return (
    <>
      <StatusBadge status={status} />
      {showForm ? (
        <Box mt={2}>
          <TransactionStatusForm
            status={status}
            // @ts-ignore
            options={statusArray}
            onCancel={() => {
              setShowForm(false)
            }}
            onSubmit={(values) => {
              onChange && onChange(values)
              setShowForm(false)
            }}
          />
        </Box>
      ) : (
        <>
          {["pending", "paying"].indexOf(status) !== -1 && (
            <Button
              size={"xs"}
              ml={2}
              onClick={() => {
                setShowForm(true)
              }}
            >
              Сменить
            </Button>
          )}
        </>
      )}
    </>
  )
}
