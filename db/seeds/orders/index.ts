import db, { CurrencyEnum } from "db"

import { orders } from "db/seeds/orders/data"
import { converter } from "src/core/converter"

export const createOrders = async () => {
  try {
    for (let index = 0; index < orders.length; index++) {
      const element = orders[index]
      const user = await db.user.findUnique({ where: { username: element?.user.username } })

      if (element && user) {
        const items = await db.item.findMany({
          where: {
            OR: element.items.map((item) => ({ title: { contains: item.title } })),
          },
          include: { amount: true },
        })

        if (!!items && items.length > 0) {
          let amount: number = 0

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
