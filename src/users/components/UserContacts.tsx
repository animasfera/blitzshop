import Link from "next/link"
import { Box } from "@chakra-ui/react"
import { UserCard } from "./UserCard"

export const UserContacts = (props) => {
  const { user, withLink = true, withRating = false, size } = props

  return (
    <Box>
      <UserCard user={user} size={"sm"} />
      <Box flex={1} mt={3} fontSize={14}>
        <Box>{user.phone && "Телефон: " + user.phone}</Box>
        <Box>
          {user.telegram && (
            <>
              Telegram: @<Link href={"https://t.me/" + user.telegram}>{user.telegram}</Link>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}
