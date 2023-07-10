import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import { Box, Button, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { Loading } from "src/core/components/Loading"
import i18n from "src/core/i18n"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <Box>
          <Text>User id: {currentUser.id}</Text>
          <Text>User role: {currentUser.role}</Text>
        </Box>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <Button>Sign Up</Button>
        </Link>
        <Link href={Routes.LoginPage()}>
          <Button>Login</Button>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  const { t, i18n } = useTranslation(["pages.home"])

  return (
    <Layout title={t("title")}>
      <Loading>
        <Button
          onClick={() => {
            void i18n.changeLanguage("RU")
          }}
        >
          RU
        </Button>
        <Button
          onClick={() => {
            void i18n.changeLanguage("EN")
          }}
        >
          EN
        </Button>

        <UserInfo />
      </Loading>
    </Layout>
  )
}

export { getServerSideProps } from "src/core/getServerSideProps"
export default Home
