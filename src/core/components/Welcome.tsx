"use client"
import { useMutation } from "@blitzjs/rpc"
import { Box, Button, Container, Flex, Heading, Image } from "@chakra-ui/react"
import React, { useState } from "react"
import { FormLabel } from "@chakra-ui/form-control"

import Form, { FORM_ERROR } from "src/core/components/form/Form"
import LabeledTextField from "src/core/components/form/LabeledTextField"
import notifyOnLaunch from "src/auth/mutations/notifyOnLaunch"
import { ForgotPassword } from "src/auth/schemas"

export const Welcome = () => {
  const [createWaitingUserMutation] = useMutation(notifyOnLaunch)

  const [messageSent, setMessageSent] = useState(false)

  return (
    <Box
      w={"100%"}
      display={"flex"}
      flex={"1 0 auto"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      mt={4}
    >
      <Box textAlign={"center"}>
        <Container maxW={"container.lg"} pl={10} pr={10}>
          <Image
            src={"/logo.svg"}
            alt="omkara-logo"
            boxSize={"150px"}
            cursor={"pointer"}
            ml={"50%"}
            mb={6}
            transform={"translateX(-50%)"}
          />
          <Heading fontSize={45} mb={5}>
            Leela.Game
          </Heading>
          <Box fontSize={21} lineHeight={9}>
            A place where you can find the best Leela guides
            <br />
            and play with them - in the real or virtual space. <br />
            Soon.
          </Box>

          <Box p={[2, 8]} boxShadow={"0 0 15px rgba(0,0,0,.08)"} rounded={10} mt={10}>
            {messageSent ? (
              <Box fontSize={19} textAlign={"center"}>
                Thank you! We will let you know about the launch.
              </Box>
            ) : (
              <Form
                schema={ForgotPassword}
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                  try {
                    const res = await createWaitingUserMutation(values)
                    if (res) {
                      setMessageSent(true)
                    }
                  } catch (error: any) {
                    return {
                      [FORM_ERROR]: "Ошибка",
                    }
                  }
                }}
              >
                <Flex flexDirection={["column", "row"]}>
                  <FormLabel
                    lineHeight={"38px"}
                    textAlign={"center"}
                    whiteSpace={"nowrap"}
                    fontSize={19}
                    fontWeight={"normal"}
                  >
                    {/*Сообщить мне о запуске!*/}
                    Let me know about the launch!
                  </FormLabel>
                  <Flex flexDirection={"row"}>
                    <LabeledTextField name="email" label="" placeholder="E-mail" mb={0} />
                    <Button ml={2} w={"200px"} type={"submit"}>
                      Send
                    </Button>
                  </Flex>
                </Flex>
              </Form>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
