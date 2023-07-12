import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import { Box, Button, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { Loading } from "src/core/components/Loading"

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
  const { t } = useTranslation(["pages.home"])

  return (
    <Layout title={t("title")}>
      <Loading>
        <UserInfo />
      </Loading>
    </Layout>
  )
}

export { getServerSideProps } from "src/core/getServerSideProps"
export default Home
