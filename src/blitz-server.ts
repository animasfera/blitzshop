import { setupBlitzServer } from "@blitzjs/next"
import { AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized } from "@blitzjs/auth"
import { BlitzLogger } from "blitz"
import db from "db"
import { authConfig } from "./blitz-auth-config"

export const { gSSP, gSP, api, useAuthenticatedBlitzContext } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  //logger: BlitzLogger({}),
})
