import Link from "next/link"
import React, { ReactElement } from "react"

interface AuthContainerProps {
  title: string
  children: ReactElement | ReactElement[]
  link?: {
    message?: string
    text: string
    href: string
  }
}

export const AuthContainer = (props: AuthContainerProps) => {
  const { title, children, link } = props

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src="/images/logo.jpg" alt="logo" />

        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {title}
        </h2>

        {link && (
          <p className="mt-2 text-center text-sm text-gray-500">
            {`${link.message} `}
            {
              <Link
                href={link.href}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                {link.text}
              </Link>
            }
          </p>
        )}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">{children}</div>
      </div>
    </div>
  )
}

export default AuthContainer
