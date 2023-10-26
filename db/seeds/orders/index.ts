import { LocaleEnum } from "@prisma/client"
import db, { Country, ShippingMethod, ShippingFeeTypeEnum } from "db"

import { orders } from "db/seeds/orders/data"
import { converter } from "src/core/converter"

export const createOrders = async () => {
  try {
    for (let index = 0; index < orders.length; index++) {
      const element = orders[index]
      const user = await db.user.findUnique({
        where: { username: element?.user.username },
        include: { location: { include: { country: true } } },
      })

      if (element && user) {
        const items = await db.item.findMany({
          where: {
            OR: element.items.map((item) => ({ title: { contains: item.title } })),
          },
          include: { amount: true },
        })

        if (!!items && items.length > 0) {
          let amount: number = 0
          let country: Country | null = null
          let shippingMethod: ShippingMethod | null = null

          for (let index = 0; index < items.length; index++) {
            const item = items[index]
            const fxRate = item
              ? await converter({
                  amount: item.amount.amount,
                  from: item.amount.currency,
                  to: user.currency,
                })
              : 0

            amount = amount + fxRate
          }

          country =
            (await db.country.findFirst({
              where: { id: user.location?.countryId || element.user.country.id },
            })) ??
            (await db.country.create({
              data: {
                id: element.user.country.id,
                titleEn: element.user.country.titleEn,
                titleRu: element.user.country.titleRu,
              },
            }))

          shippingMethod =
            (await db.shippingMethod.findFirst({
              where: { title: "test shipping method" },
            })) ??
            (await db.shippingMethod.create({
              data: {
                title: "title test shipping method",
                description: "description test shipping method",
                fee: 0,
                feeType: user.id % 2 == 0 ? ShippingFeeTypeEnum.PER_KG : ShippingFeeTypeEnum.FIXED,
              },
            }))

          await db.order.create({
            data: {
              purchasedItems: {
                createMany: {
                  data: items.map((item) => ({
                    title: item.title,
                    description: item.description,
                    amountId: item.amountId,
                    coverImageId: item.coverImageId,
                    itemId: item.id,
                    categoryId: item.categoryId,
                  })),
                },
              },
              amount: { create: { amount, currency: user.currency } },
              orderLog: {
                create: { status: element.status, comment: element.status },
              },
              user: { connect: { id: user.id } },
              status: element.status,
              shippingMethod: {
                connectOrCreate: {
                  where: { id: shippingMethod?.id },
                  create: {
                    title: "test shipping method",
                    description: "test shipping method",
                    fee: 0,
                    feeType:
                      user.id % 2 == 0 ? ShippingFeeTypeEnum.PER_KG : ShippingFeeTypeEnum.FIXED,
                  },
                },
              },
              shippingAddress: {
                create: {
                  userId: user.id,
                  firstName: user.firstName || element.user.firstName || "",
                  lastName: user.lastName || element.user.lastName || "",
                  countryId: country.id,
                  city:
                    user.locale === LocaleEnum.RU
                      ? user.location?.cityRu || element.user.location.cityRu
                      : user.location?.cityEn || element.user.location.cityEn,
                  address:
                    user.locale === LocaleEnum.RU
                      ? user.location?.addressRu || element.user.location.addressRu
                      : user.location?.addressEn || element.user.location.addressEn,
                  postalCode: element.user.location.postalCode,
                  phone: element.user.location.phone,
                  instructions:
                    user.locale === LocaleEnum.RU
                      ? "тестовый текст инструкции"
                      : "test instructions",
                },
              },
            },
          })
        }
      }
    }
  } catch (err) {
    console.error(err)
  }
}

export default createOrders
