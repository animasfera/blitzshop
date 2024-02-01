import { Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { LocaleEnum } from "db"

export default resolver.pipe(resolver.authorize(), async ({}, ctx: Ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const countries = await db.deliveryCountry.findMany({})

  if (ctx.session.user?.locale === LocaleEnum.ru) {
    return countries.sort((a, b) => {
      if (a.titleRu < b.titleRu) return -1
      if (a.titleRu > b.titleRu) return 1

      return 0
    })
  } else {
    return countries.sort((a, b) => {
      if (a.titleEn < b.titleEn) return -1
      if (a.titleEn > b.titleEn) return 1

      return 0
    })
  }
})

/*
const countries = data
    .map((el) => {
      // TODO: add Boxberry

      //  const description =
      //    el.id === "RU" || el.id === "KZ" || el.id === "BY"
      //      ? ctx.session.user?.locale === LocaleEnum.ru
      //        ? "(СДЭК)"
      //        : "(CDEK)"
      //      : "(Boxberry)"


      return {
        value:
          el.id === "RU" || el.id === "KZ" || el.id === "BY" ? el.id : el.code,
        label:
          ctx.session.user?.locale === LocaleEnum.ru ? el.titleRu : el.titleEn,
        // TODO: add Boxberry
        // description,
        img: el.flag,
      };
    })
    .sort((a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;

      return 0;
    });

  return countries;
*/
