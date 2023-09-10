import { HeaderNavigationListItem } from "src/core/components/sections/Header/HeaderNavigationListItem"

interface HeaderNavigationListProps {
  navigation: { name: string; href: string }[]
  path: string
}

export const HeaderNavigationList = (props: HeaderNavigationListProps) => {
  const { navigation, path } = props

  return (
    <ul className="lg:flex lg:space-x-4">
      {navigation.map((page) => (
        <HeaderNavigationListItem key={page.href} page={page} path={path} />
      ))}
    </ul>
  )
}

export default HeaderNavigationList
