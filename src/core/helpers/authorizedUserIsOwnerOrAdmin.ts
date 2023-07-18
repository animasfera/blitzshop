import { Ctx } from "blitz"
import { UserRoleEnum } from "@prisma/client"

const check = (ownerId: number, ctx: Ctx) => {
  return (
    ctx.session.$isAuthorized() &&
    (ctx.session.$isAuthorized(UserRoleEnum.ADMIN) || ctx.session.userId === ownerId)
  )
}

export default check
