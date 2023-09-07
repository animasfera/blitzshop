import Link from "next/link"
import { useRouter } from "next/router"

interface HeaderMobileMenuNavigationListItemProps {
  page: { name: string; href: string }
}

export const HeaderMobileMenuNavigationListItem = (
  props: HeaderMobileMenuNavigationListItemProps
) => {
  const { page } = props

  const router = useRouter()

  return (
    <li>
      <Link
        key={page.href}
        href={page.href}
        className={`
          block border-l-4 py-2 pl-3 pr-4 text-base font-medium
          ${
            router.pathname === page.href
              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
              : `border-transparent text-gray-500 hover:border-gray-300
                hover:bg-gray-50 hover:text-gray-700`
          }
        `}
      >
        {page.name}
      </Link>
    </li>
  )
}

export default HeaderMobileMenuNavigationListItem
