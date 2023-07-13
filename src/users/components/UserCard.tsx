import Link from "next/link"
import { Box, Flex, Link as ChakraLink } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import { UserAvatar } from "./UserAvatar"
import { UserCardProps, UserMailProps } from "types"

export const UserCard = (props: {
  onClick?: (user: UserCardProps | UserMailProps) => void
  user: UserCardProps | UserMailProps
  size?: string
}) => {
  const { user, onClick, size = "md" } = props

  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <Link href={"#"} passHref>
        <UserAvatar
          name={user.username}
          src={user.avatarUrl}
          size={size}
          mr={2}
          cursor={"pointer"}
          onClick={() => onClick && onClick(user)}
        />
      </Link>
      <Box flex={1} lineHeight={"19px"}>
        <Link href={"#"} passHref>
          <ChakraLink onClick={() => onClick && onClick(user)}>{user.username}</ChakraLink>
        </Link>
      </Box>
    </Flex>
  )
}
