import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetPaymentMethodsInput
  extends Pick<Prisma.PaymentMethodFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPaymentMethodsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: paymentMethods,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.paymentMethod.count({ where }),
      query: (paginateArgs) => db.paymentMethod.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      paymentMethods,
      nextPage,
      hasMore,
      count,
    }
  }
)
