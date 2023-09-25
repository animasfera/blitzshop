import Image from "next/image"

import { BadgeNotification } from "src/core/tailwind-ui/application-ui/elements/badges/BadgeNotification"

interface AvatarProps {
  avatarUrl?: string
  firstName?: string | null
  lastName?: string | null
  username: string
  withText?: boolean
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  rounded?: boolean
  notification?: {
    color?: "green" | "gray" | "red"
    count?: number
  }
}

// ?? Example:
/*
    <Avatar
      avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      firstName={'firstName'}
      lastName={'LastName'}
      username={'Username'}
      size={"xl"}
      rounded={false}
      notification={{ color: "red", count: 10 }}
      withText
    />
*/

export const Avatar = (props: AvatarProps) => {
  const {
    avatarUrl,
    firstName = "",
    lastName = "",
    username,
    withText = false,
    size = "md",
    rounded = true,
    notification,
  } = props

  const sizeAvatar = {
    xs: `${rounded ? "rounded-full" : "rounded-md"} h-6 w-6`,
    sm: `${rounded ? "rounded-full" : "rounded-md"} h-8 w-8`,
    md: `${rounded ? "rounded-full" : "rounded-md"} h-10 w-10`,
    lg: `${rounded ? "rounded-full" : "rounded-md"} h-12 w-12`,
    xl: `${rounded ? "rounded-full" : "rounded-md"} h-14 w-14`,
  }

  return (
    <div className="flex items-center">
      <div className="relative inline-block">
        {avatarUrl && (
          <Image
            width={100}
            height={100}
            className={`inline-block ${sizeAvatar[size]}`}
            src={avatarUrl}
            alt={`avatar-${username}`}
          />
        )}

        {!avatarUrl && (firstName || lastName) && (
          <span
            className={`inline-flex ${sizeAvatar[size]} items-center justify-center bg-gray-500`}
          >
            <span className="font-medium leading-none text-white">
              {!!firstName && `${firstName.toUpperCase()[0]}`}
              {!!lastName && `${lastName.toUpperCase()[0]}`}
            </span>
          </span>
        )}

        {!avatarUrl && !firstName && !lastName && (
          <span className={`inline-block ${sizeAvatar[size]} overflow-hidden bg-gray-100`}>
            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        )}

        {notification && (
          <BadgeNotification count={notification.count} color={notification.color} size={size} />
        )}
      </div>

      {withText && (
        <div
          // hidden lg:flex lg:flex-col lg:items-center
          className="ml-3 flex flex-col items-center"
        >
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {!!firstName && !!lastName && `${firstName} ${lastName}`}
            {!!firstName && !lastName && `${firstName}`}
            {!!lastName && !firstName && `${lastName}`}
            {!firstName && !lastName && `${username}`}
          </p>
          {(!!firstName || !!lastName) && (
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              {username}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Avatar
