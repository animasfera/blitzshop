import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetDeliveriesCityInput
  extends Pick<Prisma.DeliveryCityFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetDeliveriesCityInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: cities,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.deliveryCity.count({ where }),
      query: (paginateArgs) =>
        db.deliveryCity.findMany({
          ...paginateArgs,
          where,
          orderBy,
          // include: {},
        }),
    })

    return {
      cities,
      nextPage,
      hasMore,
      count,
    }
  }
)

/*
import { Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { LocaleEnum } from "db"

export default resolver.pipe(resolver.authorize(), async ({}, ctx: Ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const cities = await db.deliveryCity.findMany({})

  if (ctx.session.user?.locale === LocaleEnum.ru) {
    return cities.sort((a, b) => {
      if (a.titleRu < b.titleRu) return -1
      if (a.titleRu > b.titleRu) return 1

      return 0
    })
  } else {
    return cities.sort((a, b) => {
      if (a.titleEn < b.titleEn) return -1
      if (a.titleEn > b.titleEn) return 1

      return 0
    })
  }
})
*/
