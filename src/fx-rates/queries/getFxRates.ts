import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetFxRatesInput
  extends Pick<Prisma.FxRateFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetFxRatesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: fxRates,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.fxRate.count({ where }),
      query: (paginateArgs) => db.fxRate.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      fxRates,
      nextPage,
      hasMore,
      count,
    }
  }
)
