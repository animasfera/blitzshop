import { hash256 } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { TokenTypeEnum, UserStatusEnum } from "@prisma/client"

import { ConfirmEmail } from "../schemas"
import deleteNotificationsByRef from "src/notifications/mutations/deleteNotificationsByRef"

export class ConfirmEmailError extends Error {
  name = "ConfirmEmailError"
  message = "Wrong confirmation code"
}

export default resolver.pipe(resolver.zod(ConfirmEmail), async ({ token }, ctx) => {
  // 1. Try to find this token in the database
  const hashedToken = hash256(token)
  const possibleToken = await db.token.findFirst({
    where: { hashedToken, type: TokenTypeEnum.CONFIRM_EMAIL },
    include: { user: true },
  })

  // 2. If token not found, error
  if (!possibleToken) {
    throw new ConfirmEmailError()
  }
  const savedToken = possibleToken

  // 3. Delete token so it can't be used again
  await db.token.delete({ where: { id: savedToken.id } })

  // 5. Since token is valid, now we can activate user
  const user = await db.user.update({
    where: { id: savedToken.userId },
    data: {
      status: UserStatusEnum.ACTIVE,
      emailConfirmed: true,
    },
  })

  await deleteNotificationsByRef(
    {
      userId: savedToken.userId,
      // ref: "confirmEmail",
    },
    ctx
  )

  return true
})
