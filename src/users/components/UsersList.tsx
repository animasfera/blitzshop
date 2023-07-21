import { Stack } from "@chakra-ui/react"
import { UserCardProps } from "types"

import { UserCard } from "./UserCard"

export const UsersList = (props: { users: UserCardProps[] }) => {
  const { users } = props

  return (
    <>
      <Stack>
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            // withRating={true}
          />
        ))}
      </Stack>
    </>
  )
}
