import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { Box, Button, Container, Flex, Heading, HStack, Image, Text } from "@chakra-ui/react"

import { useCurrentUser } from "src/core/hooks/useCurrentUser"
import { Leaf } from "./Leaf"

export const TopBanner = () => {
  const user = useCurrentUser()
  const router = useRouter()

  return (
    <>
      <Container maxW={"container.lg"} display={user && user.id ? "none" : "block"}>
        <Flex overflow={"hidden"} pt={["10px", "64px"]} flexDirection={["column", "column", "row"]}>
          <Leaf
            theme={"blue"}
            mr={"32px"}
            // maxW={"640px"}
            w={"100%"}
            h={["auto", "544px"]}
            position={"relative"}
            pl={["35px", "64px"]}
            pr={"64px"}
            pt={["35px", "113px"]}
            overflow={"hidden"}
            dir={"left"}
            borderRadius={"100px"}
          >
            <Box>
              <Image
                top={[0, 0, 0, -300]}
                src={"/landing/fest.svg"}
                position={"absolute"}
                w={"100%"}
                left={0}
                zIndex={0}
              />
              <Box
                position={"absolute"}
                top={0}
                left={"50px"}
                bg={"white"}
                borderBottomLeftRadius={"5px"}
                borderBottomRightRadius={"5px"}
                px={"25px"}
                pb={"8px"}
                pt={"8px"}
                display={["none", "none", "none", "block"]}
              >
                <HStack>
                  <Box borderRadius={"5px"} w={"10px"} h={"10px"} bg={"#3CA9C1"}></Box>
                  <Text
                    fontSize={["12px !important", "12px  !important"]}
                    display={["none", "none", "none", "block"]}
                    color={"black"}
                    // lineHeight={["22px", "30px"]}
                    position={"relative"}
                    zIndex={1}
                    mb={0}
                    fontWeight={700}
                    textTransform={"uppercase"}
                  >
                    3 декабря
                  </Text>
                </HStack>
              </Box>
              <Heading
                as="h1"
                color={"white"}
                mb={[3, 10]}
                lineHeight={["40px", "60px"]}
                fontSize={["26px !important", "26px !important", "48px  !important"]}
                zIndex={1}
                position={"relative"}
              >
                Онлайн Лила фестиваль
              </Heading>
              <Text
                fontSize={["16px !important", "20px  !important"]}
                color={"white"}
                lineHeight={["22px", "30px"]}
                w={["100%", "357px"]}
                position={"relative"}
                zIndex={1}
              >
                24-часовой онлайн-фестиваль от создателя сообщества Leela.Game Омкара
              </Text>
              <Button
                mt={[0, 0, "50px"]}
                mb={["40px", "40px", 0]}
                position={"relative"}
                zIndex={1}
                bg={"#283F4F"}
                _hover={{ bg: "#131e25" }}
                _active={{ bg: "#131e25" }}
                color={"white"}
                fontSize={["12px", "12px", "14px"]}
                p={["20px 28px", "20px 28px", "25px 32px"]}
                fontWeight={700}
                lineHeight={"24px"}
                textTransform={"uppercase"}
                onClick={() => void router.push(Routes.SignupPage())}
              >
                Принять участие
              </Button>
            </Box>
          </Leaf>
        </Flex>
      </Container>
    </>
  )
}
