import { HeaderMobileMenuNavigationListItem } from "src/core/components/sections/Header/HeaderMobileMenuNavigationListItem"

interface HeaderMobileMenuNavigationListProps {
  navigation: { name: string; href: string }[]
  path: string
}

export const HeaderMobileMenuNavigationList = (props: HeaderMobileMenuNavigationListProps) => {
  const { navigation, path } = props

  return (
    <ul className="space-y-1 pb-3 pt-2">
      {navigation.map((page) => (
        <HeaderMobileMenuNavigationListItem key={page.href} page={page} path={path} />
      ))}
    </ul>
  )
}

export default HeaderMobileMenuNavigationList
