import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateOrderSchema } from "../schemas"
import { InvoiceStatusEnum, Prisma, PurchasedItem } from "@prisma/client"
import { NotFoundError } from "blitz"

export default resolver.pipe(
  resolver.zod(CreateOrderSchema),
  resolver.authorize(),
  async ({ items, currency, ...rest }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // TODO if currency!==EUR - convert rest.total to currency
    let orderData = {
      ...rest,
      log: { create: {} },
      invoice: {
        create: {
          amount: rest.total,
          status: InvoiceStatusEnum.PENDING,
          currency,
        },
      },
      items: {
        createMany: { data: [] },
      },
      net: 0,
      user: {
        connect: {
          id: ctx.session.userId,
        },
      },
    } as Prisma.OrderCreateInput

    const itemsOriginal = await db.item.findMany({
      where: {
        id: { in: items.map((item) => item.itemId) as number[] },
      },
      include: {
        images: {
          include: {
            image: true,
          },
        },
      },
    })

    let purchasedItemsCreateInput = [] as any

    items.forEach((item) => {
      const itemOriginal = itemsOriginal.find((itemOriginal) => itemOriginal.id === item.itemId)
      if (!itemOriginal) {
        throw new NotFoundError("Item #" + item.itemId + " doesn not exist.")
      }
      purchasedItemsCreateInput.push({
        ...item,
        coverImage: { connect: { id: itemOriginal.id } },
      })
    })

    const order = await db.order.create({
      data: orderData,
      include: {
        items: true,
        user: true,
        invoice: true,
      },
    })

    return order
  }
)
