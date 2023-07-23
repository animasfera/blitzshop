import { useMutation } from "@blitzjs/rpc"
import { BlitzPage, Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Box, Container, Heading, useColorModeValue } from "@chakra-ui/react"

import Layout from "src/core/layouts/Layout"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/form/Form"
import { ResetPassword } from "src/auth/schemas"
import resetPassword from "src/auth/mutations/resetPassword"
import { Card } from "src/core/components/Card"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouter().query
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <Container maxW={"container.md"}>
      <Box
        bg={useColorModeValue("gray.50", "inherit")}
        minH="500px"
        py="12"
        px={{ base: "4", lg: "8" }}
      >
        <Box maxW="md" mx="auto">
          <Heading textAlign="center" size="xl" fontWeight="extrabold" mb={6}>
            Восстановление пароля
          </Heading>

          {isSuccess ? (
            <div>
              <p>Пароль успешно изменен.</p>
              <p>
                Можно перейти на <Link href={Routes.Home()}>главную страницу</Link>
              </p>
            </div>
          ) : (
            <Card>
              <Form
                submitText="Сбросить пароль"
                schema={ResetPassword}
                initialValues={{
                  password: "",
                  passwordConfirmation: "",
                  token: query.token as string,
                }}
                onSubmit={async (values) => {
                  try {
                    await resetPasswordMutation(values)
                  } catch (error: any) {
                    if (error.name === "ResetPasswordError") {
                      return {
                        [FORM_ERROR]: error.message,
                      }
                    } else {
                      return {
                        [FORM_ERROR]: "Ошибка.",
                      }
                    }
                  }
                }}
              >
                <LabeledTextField name="password" label="Новый пароль" type="password" />
                <LabeledTextField
                  name="passwordConfirmation"
                  label="Повторите пароль"
                  type="password"
                />
              </Form>
            </Card>
          )}
        </Box>
      </Box>
    </Container>
  )
}

// ResetPasswordPage.redirectAuthenticatedTo = "/"
// ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
