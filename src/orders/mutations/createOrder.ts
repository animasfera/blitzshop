import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateOrderSchema } from "../schemas"
import {
  DeliveryMethodEnum,
  InvoiceStatusEnum,
  Prisma,
  PurchasedItem,
  ShippingCompanyEnum,
} from "@prisma/client"
import { NotFoundError } from "blitz"

export default resolver.pipe(
  resolver.zod(CreateOrderSchema),
  resolver.authorize(),
  async ({ items, currency, shippingAddress, ...rest }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // TODO if currency!==EUR - convert rest.total to currency
    const session = await ctx.session.$getPrivateData()
    const cartId = session.cartId

    if (items.length === 0) {
      throw new Error("No items in the order")
    }
    let address: any
    const { countryId, ...restAddress } = shippingAddress
    address = restAddress
    address.country = {
      connect: {
        id: countryId,
      },
    }
    address.deliveryMethod = DeliveryMethodEnum.DOOR
    address.user = {
      connect: {
        id: ctx.session.userId,
      },
    }
    address.company = ShippingCompanyEnum.SDEK

    let orderData = {
      ...rest,
      log: { create: {} },
      shippingAddress: {
        create: {
          ...address,
          // country: {
          //   connect: shippingAddress.countryId,
          // },
        },
      },
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
        title: itemOriginal.title,
        description: itemOriginal.description,
        coverImageId: itemOriginal.images[0]?.id,
      })
    })
    orderData.items = {
      createMany: {
        data: purchasedItemsCreateInput,
      },
    }

    const order = await db.order.create({
      data: orderData,
      include: {
        items: true,
        user: true,
        invoice: true,
      },
    })

    await db.cartToItem.deleteMany({ where: { cartId } })
    await db.cart.update({
      where: { id: cartId },
      data: {
        numItems: 0,
      },
    })

    return order
  }
)
