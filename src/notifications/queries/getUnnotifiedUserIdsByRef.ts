import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { paginate } from "blitz"

interface GetNotificationsInput
  extends Pick<Prisma.NotificationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetNotificationsInput) => {
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

    return {
      notifications,
      nextPage,
      hasMore,
      count,
    }
  }
)
