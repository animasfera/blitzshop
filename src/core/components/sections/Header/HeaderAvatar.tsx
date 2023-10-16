import { Fragment } from "react"
import Link from "next/link"
import { ClientSession } from "@blitzjs/auth"
import { useTranslation } from "react-i18next"
import { useMediaQuery } from "react-responsive"
import { Menu, Transition } from "@headlessui/react"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { Avatar } from "src/core/tailwind-ui/application-ui/elements/avatars/Avatar"
import { HeaderMobileMenuNavigation } from "src/core/components/sections/Header/HeaderMobileMenuNavigation"

interface HeaderAvatarProps {
  path: string
  navigation: { name: string; href: string }[]
  session: ClientSession
  isMenu?: boolean

  logout: () => Promise<void>
}

export const HeaderAvatar = (props: HeaderAvatarProps) => {
  const { path, navigation, session, isMenu = false, logout } = props

  const { t } = useTranslation(["translation"])
  const isMdScreen = useMediaQuery({ query: "(min-width: 640px)" })

  if (!session?.user) return <></>

  if (isMenu) {
    return (
      <div className="sm:hidden flex flex-col gap-2">
        <div className="mx-4">
          <Avatar
            avatarUrl={session?.user?.avatarUrl}
            firstName={session?.user?.firstName}
            lastName={session?.user?.lastName}
            username={session?.user.username}
            withText
          />
        </div>

        <HeaderMobileMenuNavigation navigation={navigation} path={path} />

        <div className="w-full px-4 flex flex-row items-center self-center">
          <Button
            variant={"soft"}
            buttonText={t("translation:userMenu.logout")}
            styles={"bg-transparent shadow-none w-full justify-center"}
            onClick={logout}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="hidden md:block md:h-6 md:w-px md:bg-gray-200" aria-hidden="true" />

      <Menu as="div" className="relative">
        <Menu.Button className="-m-1.5 flex items-center p-1.5">
          <div className="hidden sm:flex">
            <span className="sr-only">Open user menu</span>
            <Avatar
              avatarUrl={session?.user?.avatarUrl}
              firstName={session?.user?.firstName}
              lastName={session?.user?.lastName}
              username={session?.user.username}
              withText={isMdScreen}
            />
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            {navigation.map((page) => (
              <Menu.Item key={page.name}>
                <Link
                  key={page.href}
                  href={page.href}
                  className={`
                    block border-l-4 py-2 pl-3 pr-4 text-sm
                    ${
                      path === page.href
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-medium"
                        : `border-transparent text-gray-500 hover:border-gray-300
                          hover:bg-gray-50 hover:text-gray-700 font-normal`
                    }
                  `}
                >
                  {page.name}
                </Link>
              </Menu.Item>
            ))}
            <Menu.Item>
              <div className="flex flex-col mt-2 gap-2">
                <div className="border-t border-gray-200 mx-4" />
                <div className="w-full flex flex-row items-center self-center">
                  <Button
                    variant={"soft"}
                    size={"sm"}
                    buttonText={t("translation:userMenu.logout")}
                    styles={"bg-transparent shadow-none w-full pl-4"}
                    onClick={logout}
                  />
                </div>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default HeaderAvatar
