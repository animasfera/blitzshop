import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetItemsInput
  extends Pick<Prisma.ItemFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetItemsInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: items,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.item.count({ where }),
    query: (paginateArgs) =>
      db.item.findMany({
        ...paginateArgs,
        where,
        orderBy,
        include: {
          _count: true,
          amount: {},
          category: true,
          coverImage: { include: { image: true } },
          cart: true,
          chatRoom: true,
          images: true,
          invoices: true,
          location: true,
          purchasedItems: true,
          reviews: true,
          user: true,
        },
      }),
  })

  return {
    items,
    nextPage,
    hasMore,
    count,
  }
})
