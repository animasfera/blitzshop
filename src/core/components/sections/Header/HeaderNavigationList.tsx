import { HeaderNavigationListItem } from "src/core/components/sections/Header/HeaderNavigationListItem"

interface HeaderNavigationListProps {
  navigation: { name: string; href: string }[]
}

export const HeaderNavigationList = (props: HeaderNavigationListProps) => {
  const { navigation } = props

  return (
    <ul className="lg:flex lg:space-x-4">
      {navigation.map((page) => (
        <HeaderNavigationListItem key={page.href} page={page} />
      ))}
    </ul>
  )
}

export default HeaderNavigationList
