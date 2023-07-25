import { Badge } from "@chakra-ui/react"

import { UserIdStatusColors, UserIdStatusRu } from "./UserEnums"

export const UserIdStatusBadge = (props) => {
  const { status } = props
  return <Badge colorScheme={UserIdStatusColors[status]}>{UserIdStatusRu[status]}</Badge>
}
