import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

import { HeaderLogo } from "src/core/components/sections/Header/HeaderLogo"
import { HeaderAuth } from "src/core/components/sections/Header/HeaderAuth"
import { HeaderMobileMenuNavigation } from "src/core/components/sections/Header/HeaderMobileMenuNavigation"

interface HeaderMobileMenuProps {
  open: boolean
  navigation: { name: string; href: string }[]
  path: string

  handleOpen: (value: boolean) => void
}

export const HeaderMobileMenu = (props: HeaderMobileMenuProps) => {
  const { open, navigation, path, handleOpen } = props

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
              <div className="mx-4">
                <HeaderLogo />
              </div>

              <HeaderMobileMenuNavigation navigation={navigation} path={path} />

              <div className="border-t border-gray-200 mx-4" />

              <HeaderAuth path={path} isMenu />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default HeaderMobileMenu
