import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetCartsInput
  extends Pick<Prisma.CartFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCartsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: carts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.cart.count({ where }),
      query: (paginateArgs) => db.cart.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      carts,
      nextPage,
      hasMore,
      count,
    }
  }
)
