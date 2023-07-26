import { Box } from "@chakra-ui/react"
import { UserMain } from "types"

export const UserTaxDetails = (props: { user: Partial<UserMain>; withPassport?: boolean }) => {
  const { user } = props

  return (
    <>
      <Box>{(user.firstName || user.lastName) && user.firstName + " " + user.lastName}</Box>
      <Box>{user.username}</Box>
      <Box>{user.email}</Box>
    </>
  )
}
