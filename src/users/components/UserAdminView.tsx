import { useQuery } from "@blitzjs/rpc"
import Head from "next/head"
import Link from "next/link"
import { Avatar, Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react"

import getUser from "../queries/getUser"

export const UserAdminView = (props) => {
  const { userId } = props
  const [user] = useQuery(getUser, { id: userId })

  return (
    <>
      <Head>
        <title>{user.username}</title>
      </Head>

      <Box mb={10}>
        <Box mb={6}>
          <Center>
            <Stack spacing={2}>
              <Avatar size={"2xl"} src={user.avatarUrl || ""} />
              <Heading>
                <Center>{user.username}</Center>
              </Heading>
            </Stack>
          </Center>
        </Box>

        <Box mb={6}>
          <Text>{user.firstName}</Text>
          <Text>{user.lastName}</Text>
          <Text>{user.email}</Text>
        </Box>

        <Link
          // href={Routes.AdminEditUserPage({ userId: user.id })}
          href={"#"}
        >
          <Button as={"a"}>Редактировать</Button>
        </Link>
      </Box>
    </>
  )
}
