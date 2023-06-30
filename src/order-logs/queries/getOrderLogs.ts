import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetOrderLogsInput
  extends Pick<Prisma.OrderLogFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetOrderLogsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: orderLogs,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.orderLog.count({ where }),
      query: (paginateArgs) => db.orderLog.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      orderLogs,
      nextPage,
      hasMore,
      count,
    }
  }
)
