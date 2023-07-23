import { useEffect } from "react"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/router"
import { Box, Container, useColorModeValue } from "@chakra-ui/react"

import Layout from "src/core/layouts/Layout"
import confirmEmail from "src/auth/mutations/confirmEmail"

let counter = 1

const ConfirmEmailPage: BlitzPage = () => {
  return <>ConfirmEmailPage</>
  /*
  const session = useSession()
  const query = useRouter().query
  const [confirmEmailMutation, { isSuccess, isError, isLoading }] = useMutation(confirmEmail)

  useEffect(() => {
    async function confirm() {
      if (query.token) {
        await confirmEmailMutation({ token: query.token as string })
      }
    }
    if (counter === 1) {
      void confirm()
    }
    counter++
  }, [])

  return (
    <Container maxW={"container.md"}>
      <Box
        bg={useColorModeValue("gray.50", "inherit")}
        minH="500px"
        py="12"
        px={{ base: "4", lg: "8" }}
      >
        <Box maxW="md" mx="auto">
          {isSuccess ? (
            <div>
              <p>Спасибо, ваш E-mail подтвержден.</p>
              {session.userId && (
                <p>
                  Можно перейти на <Link href={Routes.Home()}>главную страницу</Link>
                </p>
              )}
              {!session.userId && (
                <p>
                  Теперь можно <Link href={Routes.LoginPage()}>авторизироваться</Link>
                </p>
              )}
            </div>
          ) : (
            <Box>
              {!query.token ? (
                <Box>Не указан код</Box>
              ) : isLoading ? (
                <Box>Проверяем код...</Box>
              ) : isError ? (
                <Box>Неверный код</Box>
              ) : (
                ""
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  )
  */
}

// ConfirmEmailPage.getLayout = (page) => <Layout title="Подтверждение E-mail">{page}</Layout>

export default ConfirmEmailPage
