import { resolver } from "@blitzjs/rpc"
import db from "db"
import { User, UserRoleEnum, UserStatusEnum } from "@prisma/client"

import getUser from "../queries/getUser"
import { adminBlockUserMailer } from "mailers/adminBlockUserMailer"
import { notification } from "src/core/notifications/NotificationsTransaction"

import { UpdateUserAdminSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateUserAdminSchema),
  resolver.authorize(),
  async ({ ...data }, ctx) => {
    // TODO: allow this for admins
    if (ctx.session.role !== UserRoleEnum.ADMIN) {
      throw new Error("У вас нет прав на редактирование данного пользователя")
    }
    let { ...user } = data as User
    const userOld = await getUser({ id: user.id }, ctx)

    const newUser = await db.user.update({ where: { id: user.id }, data: user })

    if (user.status !== userOld.status) {
      if (user.status == UserStatusEnum.BLOCKED) {
        await db.session.deleteMany({ where: { userId: user.id } })
        notification({
          channels: ["email"],
          userId: userOld.id,
          data: adminBlockUserMailer({ blockReason: "" }),
        })
      }
    }
    return newUser
  }
)
