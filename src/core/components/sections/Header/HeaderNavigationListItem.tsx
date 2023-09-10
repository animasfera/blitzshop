import Link from "next/link"

interface HeaderNavigationListItemProps {
  page: { name: string; href: string }
  path: string
}

export const HeaderNavigationListItem = (props: HeaderNavigationListItemProps) => {
  const { page, path } = props

  return (
    <li
      key={page.href}
      className={`inline-flex items-center border-b-2 ${
        path === page.href
          ? `border-indigo-500 text-gray-900`
          : `border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700`
      }`}
    >
      <Link href={page.href} className={"px-1 pt-1 text-sm font-medium whitespace-nowrap"}>
        {page.name}
      </Link>
    </li>
  )
}

export default HeaderNavigationListItem
