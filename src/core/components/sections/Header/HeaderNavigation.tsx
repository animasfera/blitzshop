import { HeaderNavigationList } from "src/core/components/sections/Header/HeaderNavigationList"

interface HeaderNavigationProps {
  navigation: { name: string; href: string }[]
}

export const HeaderNavigation = (props: HeaderNavigationProps) => {
  const { navigation } = props

  return (
    <nav className="h-full hidden xl:flex">
      <HeaderNavigationList navigation={navigation} />
    </nav>
  )
}

export default HeaderNavigation
