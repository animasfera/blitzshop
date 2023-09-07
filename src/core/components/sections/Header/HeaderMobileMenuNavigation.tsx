import { HeaderMobileMenuNavigationList } from "src/core/components/sections/Header/HeaderMobileMenuNavigationList"

interface HeaderMobileMenuNavigationProps {
  navigation: { name: string; href: string }[]
}

export const HeaderMobileMenuNavigation = (props: HeaderMobileMenuNavigationProps) => {
  const { navigation } = props

  return (
    <nav>
      <HeaderMobileMenuNavigationList navigation={navigation} />
    </nav>
  )
}

export default HeaderMobileMenuNavigation
