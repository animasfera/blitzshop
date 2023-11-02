import { setupBlitzServer } from "@blitzjs/next"
import { AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized } from "@blitzjs/auth"
import { RpcServerPlugin } from "@blitzjs/rpc"
import { BlitzLogger } from "blitz"
import db from "db"
import { authConfig } from "./blitz-auth-config"

export const { gSSP, gSP, api, invoke, useAuthenticatedBlitzContext, getBlitzContext } =
  setupBlitzServer({
    plugins: [
      AuthServerPlugin({
        ...authConfig,
        storage: PrismaStorage(db),
        isAuthorized: simpleRolesIsAuthorized,
      }),
      RpcServerPlugin({}),
    ],
    logger: BlitzLogger({ minLevel: 2 }),
  })
