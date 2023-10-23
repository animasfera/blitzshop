import { Ctx, paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetOrdersInput
  extends Pick<Prisma.OrderFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetOrdersInput, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const {
      items: orders,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.order.count({ where }),
      query: (paginateArgs) =>
        db.order.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            amount: true,
            shippingMethod: true,
            user: { select: { id: true, email: true, username: true } },
            purchasedItems: {
              include: {
                amount: true,
                category: true,
                coverImage: true,
                item: {
                  include: { user: { select: { email: true, id: true, username: true } } },
                },
              },
            },
          },
        }),
    })

    return {
      orders,
      nextPage,
      hasMore,
      count,
    }
  }
)
