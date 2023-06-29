import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetCardTokensInput
  extends Pick<Prisma.CardTokenFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCardTokensInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: cardTokens,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.cardToken.count({ where }),
      query: (paginateArgs) => db.cardToken.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      cardTokens,
      nextPage,
      hasMore,
      count,
    }
  }
)
