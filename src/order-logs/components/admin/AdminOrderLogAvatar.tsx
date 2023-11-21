import React from "react"
import { string } from "zod"
interface AdminOrderLogAvatarProps {
  username?: string
  avatarUrl?: string
}
const AdminOrderLogAvatar = (props: AdminOrderLogAvatarProps) => {
  const { username, avatarUrl } = props
  return (
    <div className="w-6">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt=""
          className="relative h-6 w-6 flex-none rounded-full bg-gray-50"
        />
      ) : (
        <div className="relative flex h-6 w-6 rounded-full justify-center bg-gray-500">
          <span className="font-small text-center text-gray-100">
            {username?.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  )
}
export default AdminOrderLogAvatar
