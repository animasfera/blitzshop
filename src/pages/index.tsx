import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import Layout from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { Button } from "src/core/components/buttons/Button"
import { useCurrentUser } from "src/core/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          buttonText="Logout"
          handleClick={async () => {
            await logoutMutation()
          }}
        />
        <div>
          <p>User id: {currentUser.id}</p>
          <p>User role: {currentUser.role}</p>
        </div>
      </>
    )
  } else {
    return (
      <div className="flex gap-2">
        <Link href={Routes.SignupPage()}>
          <Button buttonText="Sign Up" />
        </Link>
        <Link href={Routes.LoginPage()}>
          <Button buttonText="Login" />
        </Link>
      </div>
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
