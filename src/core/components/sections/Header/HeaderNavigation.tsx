import { HeaderNavigationList } from "src/core/components/sections/Header/HeaderNavigationList"

interface HeaderNavigationProps {
  navigation: { name: string; href: string }[]
  path: string
}

export const HeaderNavigation = (props: HeaderNavigationProps) => {
  const { navigation, path } = props

  return (
    <nav className="h-full hidden xl:flex">
      <HeaderNavigationList navigation={navigation} path={path} />
    </nav>
  )
}

export default HeaderNavigation
