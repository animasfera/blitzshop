import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetPurchasedItemsInput
  extends Pick<Prisma.PurchasedItemFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPurchasedItemsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: purchasedItems,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.purchasedItem.count({ where }),
      query: (paginateArgs) => db.purchasedItem.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      purchasedItems,
      nextPage,
      hasMore,
      count,
    }
  }
)
