import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetPricesInput
  extends Pick<Prisma.PriceFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPricesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: prices,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.price.count({ where }),
      query: (paginateArgs) => db.price.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      prices,
      nextPage,
      hasMore,
      count,
    }
  }
)
