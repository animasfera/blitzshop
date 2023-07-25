import { Box, ChakraProps } from "@chakra-ui/react"
import { User } from "@prisma/client"

export const UsersListView = (props: ChakraProps & { users: Partial<User>[] }) => {
  const { users, ...chakraProps } = props
  return <Box {...chakraProps}></Box>
}
