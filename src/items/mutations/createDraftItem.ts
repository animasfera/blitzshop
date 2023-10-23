import { resolver } from "@blitzjs/rpc"
import db, { ItemStatusEnum } from "db"
import { ItemFull } from "types"
import { CreateItemSchema } from "../schemas"

export default resolver.pipe(
  //resolver.zod(CreateItemSchema),
  resolver.authorize(),
  async (input) => {
    let item: ItemFull | null
    item = await db.item.findFirst({
      where: { status: ItemStatusEnum.DRAFT },
      include: {
        _count: true,
        amount: true,
        cartToItems: true,
        category: true,
        coverImage: { include: { image: true } },
        chatRoom: true,
        images: { include: { image: true } },
        invoices: true,
        location: true,
        purchasedItems: true,
        reviews: true,
        user: true,
      },
    })

    if (!item) {
      item = await db.item.create({
        data: {
          title: "",
          status: ItemStatusEnum.DRAFT,
          amount: { create: { amount: 0 } },
          coverImage: { create: { image: { create: { url: "" } } } },
        },
        include: {
          _count: true,
          amount: true,
          cartToItems: true,
          category: true,
          coverImage: { include: { image: true } },
          chatRoom: true,
          images: { include: { image: true } },
          invoices: true,
          location: true,
          purchasedItems: true,
          reviews: true,
          user: true,
        },
      })
    }

    return item
  }
)
