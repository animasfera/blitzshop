import { HeaderMobileMenuNavigationList } from "src/core/components/sections/Header/HeaderMobileMenuNavigationList"

interface HeaderMobileMenuNavigationProps {
  navigation: { name: string; href: string }[]
  path: string
}

export const HeaderMobileMenuNavigation = (props: HeaderMobileMenuNavigationProps) => {
  const { navigation, path } = props

  return (
    <nav>
      <HeaderMobileMenuNavigationList navigation={navigation} path={path} />
    </nav>
  )
}

export default HeaderMobileMenuNavigation
