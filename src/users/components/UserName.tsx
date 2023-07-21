import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { Box } from "@chakra-ui/react"

export const UserName = (props) => {
  const { user, asLink, ...rest } = props
  if (props.asLink) {
    return (
      <Box {...rest}>
        <Link
          // href={Routes.ShowUserPage({ username: props.user.username })}
          href={""}
        >
          {props.user.username}
        </Link>
      </Box>
    )
  } else {
    return <Box {...rest}>{props.user.username}</Box>
  }
}
