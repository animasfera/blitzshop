import { BlitzPage } from "@blitzjs/next"
import { useRouter } from "next/router"

import Layout from "src/core/layouts/Layout"
import { LoginForm } from "src/auth/components/LoginForm"
import Container from "../core/tailwind-ui/application-ui/Container"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Container size={"sm"}>
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          return router.push(next)
        }}
      />
    </Container>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>
export default LoginPage
