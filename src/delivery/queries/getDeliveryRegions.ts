import { Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { LocaleEnum } from "db"

export default resolver.pipe(resolver.authorize(), async ({}, ctx: Ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const regions = await db.deliveryRegion.findMany({})

  if (ctx.session.user?.locale === LocaleEnum.ru) {
    return regions.sort((a, b) => {
      if (a.titleRu < b.titleRu) return -1
      if (a.titleRu > b.titleRu) return 1

      return 0
    })
  } else {
    return regions.sort((a, b) => {
      if (a.titleEn < b.titleEn) return -1
      if (a.titleEn > b.titleEn) return 1

      return 0
    })
  }
})
