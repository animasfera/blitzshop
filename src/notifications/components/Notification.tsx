import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react"
import React from "react"
import { Notification as NotificationPrismaType } from "@prisma/client"

type NotificationProps = {
  notification: NotificationPrismaType
  onClick: (notification: NotificationPrismaType) => void
}

export const Notification = (props: NotificationProps) => {
  const { notification, onClick } = props
  return (
    <Alert
      key={notification.id}
      status={notification.type}
      rounded={5}
      mb={2}
      onClick={() => {
        onClick && onClick(notification)
      }}
    >
      <AlertIcon />
      {notification.title && <AlertTitle mr={2}>{notification.title}</AlertTitle>}
      <AlertDescription
        pr={4}
        dangerouslySetInnerHTML={{ __html: notification.message }}
      ></AlertDescription>
      <CloseButton
        // onClick={() => {
        //   onClose && onClose(notification)
        // }}
        position="absolute"
        right={1}
        top={1}
      />
    </Alert>
  )
}
