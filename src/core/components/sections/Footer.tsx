import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

let navigation = {
  social: [],
} as any

export default function Footer(props) {
  const { path } = props
  const { t } = useTranslation(["translation"])
  navigation.main = [
    { name: t("translation:menu.products"), href: "/products" },
    { name: t("translation:menu.shipping"), href: "/shipping" },
    { name: t("translation:menu.contacts"), href: "/contacts" },
    { name: t("translation:menu.offer"), href: "/legal/ru/contract-offer" },
    { name: t("translation:menu.privacy"), href: "/legal/ru/privacy-policy" },
  ]
  // const [mainNavigation, setMainNavigation] = useState<any>([{}])
  // const [navigationSocial, setNavigationSocial] = useState<any>(navigation.social)

  // useEffect(() => {
  // setMainNavigation(navigation.main)
  // setNavigationSocial(navigation.social)
  // }, [])

  const isAdminPage = path.indexOf("/admin") !== -1
  return (
    <>
      {!isAdminPage && (
        <footer className="bg-gray-900">
          <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
            <nav
              className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
              aria-label="Footer"
            >
              {navigation.main.map((item, i) => (
                <div key={i} className="pb-6">
                  <a
                    href={item.href}
                    className="text-sm leading-6 text-gray-600 hover:text-gray-400"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </nav>
            <div className="mt-10 flex justify-center space-x-10">
              {navigation.social.map((item, i) => (
                <a key={i} href={item.href} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-10 text-center text-xs leading-5 text-gray-500">&copy; 2023 OMKARA</p>
          </div>
        </footer>
      )}
    </>
  )
}
