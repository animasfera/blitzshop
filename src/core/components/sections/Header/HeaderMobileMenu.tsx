import { Fragment } from "react"
import { ClientSession } from "@blitzjs/auth"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"

import { ButtonCircular } from "src/core/tailwind-ui/application-ui/elements/buttons/ButtonCircular"
import { HeaderLogo } from "src/core/components/sections/Header/HeaderLogo"
import { HeaderAuth } from "src/core/components/sections/Header/HeaderAuth"
import { HeaderAvatar } from "src/core/components/sections/Header/HeaderAvatar"
import { HeaderMobileMenuNavigation } from "src/core/components/sections/Header/HeaderMobileMenuNavigation"

interface HeaderMobileMenuProps {
  open: boolean
  session: ClientSession
  navigation: { name: string; href: string }[]
  userMenu: { name: string; href: string }[]
  path: string

  handleOpen: (value: boolean) => void
  logout: () => Promise<void>
}

export const HeaderMobileMenu = (props: HeaderMobileMenuProps) => {
  const { open, session, navigation, userMenu, path, handleOpen, logout } = props

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 xl:hidden" onClose={() => handleOpen(!open)}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col gap-y-4 overflow-y-auto bg-white py-6 shadow-xl">
              <div className="mx-4 flex justify-between items-center">
                <HeaderLogo />

                <ButtonCircular
                  variant={"soft"}
                  icon={<XMarkIcon className="h-5 w-5" aria-hidden="true" />}
                  handleClick={() => handleOpen(!open)}
                  className={"bg-white xl:hidden"}
                />
              </div>

              <HeaderMobileMenuNavigation navigation={navigation} path={path} />

              <div className="border-t border-gray-200 mx-4" />

              {session?.user ? (
                <HeaderAvatar
                  path={path}
                  session={session}
                  navigation={userMenu}
                  isMenu
                  logout={logout}
                />
              ) : (
                <HeaderAuth path={path} isMenu />
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default HeaderMobileMenu
