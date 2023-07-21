import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react"

export const UsersListAsAvatars = (props) => {
  const { users, size, ...rest } = props
  return (
    <Wrap {...rest}>
      {users.map((player, index) => {
        return (
          <WrapItem key={`${index}-${player.id}`}>
            <Link
              // href={Routes.ShowUserPage({ username: player.username })}
              href={""}
            >
              <Avatar size={size || "sm"} src={player.avatarUrl} mr={2} cursor={"pointer"} />
            </Link>
          </WrapItem>
        )
      })}
    </Wrap>
  )
}
