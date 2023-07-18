import { SessionContext } from "@blitzjs/auth"
import { GetServerSideProps } from "next"
import { gSSP } from "src/blitz-server"

export type ServerSideProps = {
  initialPublicData: SessionContext["$publicData"]
}

export const getServerSideProps: GetServerSideProps = gSSP<ServerSideProps>(async ({ ctx }) => {
  const { session } = ctx

  return {
    props: {
      initialPublicData: session.$publicData,
    },
  }
})
