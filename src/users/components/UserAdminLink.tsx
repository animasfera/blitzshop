import Link from "next/link"
import { Routes } from "@blitzjs/next"

export const UserAdminLink = (props) => {
  const { user } = props
  return (
    <Link
      // href={Routes.AdminShowUserPage({ userId: user.id })}
      href={"#"}
    >
      {user.username}
    </Link>
  )
}
