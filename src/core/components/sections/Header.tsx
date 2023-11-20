import { useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { Dialog } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

import logout from "src/auth/mutations/logout"

import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { CurrenciesEnum } from "src/core/enums/CurrenciesEnum"
import { useCurrentUser } from "src/core/hooks/useCurrentUser"

// TODO: remove component
import { Button } from "@chakra-ui/react"

const UserMenuButton = () => {
  const { t } = useTranslation(["translation"])
  const [logoutMutation] = useMutation(logout)

  return (
    <Button
      size={"xs"}
      onClick={async () => {
        await logoutMutation()
      }}
    >
      {t("translation:userMenu.logout")}
    </Button>
  )
}

const UserMenuMobileButton = () => {
  const { t } = useTranslation(["translation"])
  const [logoutMutation] = useMutation(logout)

  return (
    <Button
      onClick={async () => {
        await logoutMutation()
      }}
    >
      {t("translation:userMenu.logout")}
    </Button>
  )
}

const SignInButton = () => {
  const { t } = useTranslation(["translation"])
  return (
    <>
      <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
        {t("translation:menu.login")}
      </a>
    </>
  )
}

const SignInMobileButton = () => {
  const { t } = useTranslation(["translation"])
  return (
    <>
      <a
        href="#"
        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
      >
        {t("translation:menu.login")}
      </a>
    </>
  )
}

export default function Header(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { t } = useTranslation(["translation"])
  const currentUser = useCurrentUser()
  const UserButtonComponent = currentUser ? UserMenuButton : SignInButton
  const MobileUserButtonComponent = currentUser ? UserMenuMobileButton : SignInMobileButton

  const navigation = [
    { name: t("translation:menu.products"), href: "/products" },
    { name: t("translation:menu.shipping"), href: "/shipping" },
    { name: t("translation:menu.contacts"), href: "/contacts" },
  ]

  const [selected, setSelected] = useState<OptionSelectField>(
    // @ts-ignore
    Object.values(CurrenciesEnum).map(({ name }) => ({
      label: name,
      value: name,
    }))[0]
  )
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="logo"
          />
        </a>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/*<SelectSubmitLight*/}
        {/*  name="currency"*/}
        {/*  options={Object.values(CurrenciesEnum).map(({ name }) => ({*/}
        {/*    label: name + "asads",*/}
        {/*    value: name,*/}
        {/*  }))}*/}
        {/*  selected={selected}*/}
        {/*  handleChange={(value) => setSelected(value)}*/}
        {/*  outerProps={{ className: "m-0" }}*/}
        {/*/>*/}

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}

          <UserButtonComponent />
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="logo"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <MobileUserButtonComponent />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
