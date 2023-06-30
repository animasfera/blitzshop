import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetConfigsInput
  extends Pick<Prisma.ConfigFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetConfigsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: configs,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.config.count({ where }),
      query: (paginateArgs) => db.config.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      configs,
      nextPage,
      hasMore,
      count,
    }
  }
)
