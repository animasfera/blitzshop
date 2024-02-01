import { BlitzLogger, BlitzServerMiddleware, RequestMiddleware } from "blitz"
import { setupBlitzServer } from "@blitzjs/next"
import { AuthServerPlugin, BlitzCtx, PrismaStorage, simpleRolesIsAuthorized } from "@blitzjs/auth"
import { ServerResponse } from "http"
import db, { CurrencyEnum, UserRoleEnum } from "db"
import { authConfig } from "./blitz-client"

const middleware: RequestMiddleware = async (
  req,
  res: ServerResponse & { blitzCtx: BlitzCtx },
  next
) => {
  // склеить API_LOGIN:API_PASSWORD
  const credentials =
    process.env.API_LOGIN && process.env.API_PASSWORD
      ? `${process.env.API_LOGIN}:${process.env.API_PASSWORD}`
      : ""
  // закодировать в base64 при помощи Bufer (Basic - если такая auth)
  const credentialsBase64 = `Basic ${Buffer.from(credentials).toString("base64")}`

  // сравнить base64 с req.headers.authorization
  if (req.headers.authorization === credentialsBase64) {
    // override sessionMiddleware for this request
    //@ts-ignore
    res.blitzCtx.session = {
      $publicData: {
        userId: 1,
        role: UserRoleEnum.ADMIN,
        timezone: "",
        user: {
          id: 1,
          username: "admin",
          firstName: "",
          lastName: "",
          avatarUrl: "",
          role: UserRoleEnum.ADMIN,
          timezone: "",
          currency: CurrencyEnum.RUB,
        },
      },
      $authorize: (role: UserRoleEnum) => {
        return true
      },
      $isAuthorized: () => true,
    }
  }
  await next()
}

export const { gSSP, gSP, api } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized,
    }),
    BlitzServerMiddleware(middleware),
  ],
  logger: BlitzLogger({}),
})
