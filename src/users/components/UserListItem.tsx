import { Box, ChakraProps } from "@chakra-ui/react"
import { User } from "@prisma/client"

export const UserListItem = (props: ChakraProps & { user: User }) => {
  const { user, ...chakraProps } = props
  return <Box {...chakraProps}></Box>
}
