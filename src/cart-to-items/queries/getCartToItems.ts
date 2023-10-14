import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetCartToItemInput
  extends Pick<Prisma.CartToItemFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetCartToItemInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: cartToItems,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.cartToItem.count({ where }),
      query: (paginateArgs) =>
        db.cartToItem.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            item: { include: { amount: true, coverImage: { include: { image: true } } } },
          },
        }),
    })

    return {
      cartToItems,
      nextPage,
      hasMore,
      count,
    }
  }
)
