import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import getShippingAddresses from "./getShippingAddresses"

interface GetShippingAddressesInput
  extends Pick<Prisma.ShippingAddressFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetShippingAddressesInput, ctx) => {
    let query = {
      ...where,
      userId: ctx.session.userId,
    }

    return getShippingAddresses({ where: { ...query } }, ctx)
  }
)
