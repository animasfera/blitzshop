import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetItemToRefundsInput
  extends Pick<Prisma.ItemToRefundFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetItemToRefundsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: itemToRefunds,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.itemToRefund.count({ where }),
      query: (paginateArgs) => db.itemToRefund.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      itemToRefunds,
      nextPage,
      hasMore,
      count,
    }
  }
)
