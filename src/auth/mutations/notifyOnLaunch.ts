import { resolver } from "@blitzjs/rpc"
import db from "db"
import { ForgotPassword } from "../schemas"

export default resolver.pipe(resolver.zod(ForgotPassword), async ({ email }) => {
  try {
    await db.waitingUser.create({
      data: {
        email: email,
      },
    })
  } catch (e) {}

  return true
})
