import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetShippingAddressesInput
  extends Pick<Prisma.ShippingAddressFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetShippingAddressesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: shippingAddresses,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.shippingAddress.count({ where }),
      query: (paginateArgs) => db.shippingAddress.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      shippingAddresses,
      nextPage,
      hasMore,
      count,
    }
  }
)
