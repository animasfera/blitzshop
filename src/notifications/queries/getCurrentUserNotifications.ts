import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import getCurrentUser from "src/users/queries/getCurrentUser"
import { NotificationType, MoneyAccountStatus, UserStatus } from "@prisma/client"
import { paginate } from "blitz"

interface GetNotificationsInput
  extends Pick<Prisma.NotificationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ orderBy, skip = 0, take = 100 }: GetNotificationsInput, ctx) => {
    const where = { userId: ctx.session.userId, viewed: false }
    const autoNofitications = [] as { message: string; type: NotificationType }[]

    const {
      items: notifications,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.notification.count({ where }),
      query: (paginateArgs) => db.notification.findMany({ ...paginateArgs, where, orderBy }),
    })

    // const user = await getCurrentUser(null, ctx)
    // const origin = process.env.SITE_URL

    //     if(user){
    //       if(user.status === UserStatus.blocked){
    //         autoNofitications.push({
    //           type: NotificationType.error,
    //           message: `Ваш аккаунт заблокироован.`,
    //         })
    //       }
    //       if(user.emailConfirmed === false){
    //         const confirmEmailUrl = `${origin}/confirm-email`
    //         autoNofitications.push({
    //           type: NotificationType.warning,
    //           message: `Для завершения регистрации, пожалуйста, <a href="${confirmEmailUrl}">подтвердите ваш e-mail</a>.`,
    //         })
    //       }
    //       if(user.moneyAccount){
    //         if(user.moneyAccount.status === MoneyAccountStatus.invalid){
    //           const reason = user.moneyAccount.statusMessage
    //           autoNofitications.push({
    //             type: NotificationType.warning,
    //             message: `Мы проверили ваш платежный профиль. Мы не можем его активировать по следующей причине: "${user.moneyAccount.statusMessage}"<br />
    // Пожалуйста, зайдите в раздел <a href="${origin}/payouts">Выплаты</a> и устраните указанную проблему в платежном профиле.
    // `,
    //           })
    //         }
    //       }
    //     }

    return {
      notifications,
      autoNofitications,
      nextPage,
      hasMore,
      count,
    }
  }
)
