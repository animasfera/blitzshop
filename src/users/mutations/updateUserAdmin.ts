import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UserRoleEnum } from "@prisma/client"
import { UserFull } from "types"

import { UpdateUserAdminSchema } from "../schemas"
import getUser from "../queries/getUser"

import { adminBlockUserMailer } from "mailers/adminBlockUserMailer"

export default resolver.pipe(
  resolver.zod(UpdateUserAdminSchema),
  resolver.authorize(),
  async ({ ...data }, ctx) => {
    // TODO: allow this for admins
    if (ctx.session.role !== UserRoleEnum.ADMIN) {
      throw new Error("У вас нет прав на редактирование данного пользователя")
    }
    let { ...user } = data as UserFull
    const userOld = await getUser({ id: user.id }, ctx)

    const newUser = await db.user.update({ where: { id: user.id }, data: user })

    if (user.status !== userOld.status) {
      if (user.status == "blocked") {
        await db.session.deleteMany({ where: { userId: user.id } })
        await adminBlockUserMailer(
          { user: userOld, blockReason: user.blockReason },
          { lang: userOld.locale }
        ).send()
      }
    }
    return newUser
  }
)
