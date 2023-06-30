import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetShippingMethodsInput
  extends Pick<Prisma.ShippingMethodFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetShippingMethodsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: shippingMethods,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.shippingMethod.count({ where }),
      query: (paginateArgs) => db.shippingMethod.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      shippingMethods,
      nextPage,
      hasMore,
      count,
    }
  }
)
