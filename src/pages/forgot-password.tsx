import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { Box, Center, Container, Heading, useColorModeValue } from "@chakra-ui/react"

import Layout from "src/core/layouts/Layout"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/form/Form"
import { ForgotPassword } from "src/auth/schemas"
import forgotPassword from "src/auth/mutations/forgotPassword"
import { Card } from "src/core/components/Card"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  // TODO translate

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
            <Center textAlign={"center"}>
              Отлично! Если у нас зарегистрирован ваш e-mail, вскоре вы получите письмо со ссылкой
              для сброса пароля.
            </Center>
          ) : (
            <Card>
              <Form
                submitText="Отправить"
                schema={ForgotPassword}
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                  try {
                    await forgotPasswordMutation(values)
                  } catch (error: any) {
                    return {
                      [FORM_ERROR]: "Ошибка",
                    }
                  }
                }}
              >
                <LabeledTextField name="email" label="" placeholder="Ваш E-mail" />
              </Form>
            </Card>
          )}
        </Box>
      </Box>
    </Container>
  )
}

// ForgotPasswordPage.redirectAuthenticatedTo = "/"
// ForgotPasswordPage.getLayout = (page) => <Layout title="Восстановление пароля">{page}</Layout>

export default ForgotPasswordPage
