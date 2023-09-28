import { resolver } from "@blitzjs/rpc"
import db, { Cart, CartToItem, CurrencyEnum, Item, Price } from "db"

import { converter } from "src/core/converter"

// CreateCartSchema
import { AddProductToCartSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(AddProductToCartSchema),
  async ({ sessionId, itemId, price, currency }, ctx) => {
    try {
      // console.log("ctx isAuthorized", ctx.session.$isAuthorized())
      // isAuthorized: ctx session trxyWASgY4LoOYP4dEbY7lolGKWWvYFo:ajwt
      // !isAuthorized: ctx session jxmwXDrKwoHC3WuTlabLayww3AWa7-tn:ots

      if (ctx.session.$isAuthorized()) {
        console.log("ctx session", ctx.session.$handle)

        // TODO: add add to cart products for authorized user
        // return ctx.session.$handle
      }

      // add a product to cart if the user is unauthorized
      let cart: (Cart & { cartToItems: CartToItem[] }) | null = null
      let cartToItem: CartToItem & { item: Item }
      let newPrice: Price | null
      const fxRate = await converter({ from: price.currency, to: currency, amount: price.amount })

      cart = await db.cart.findFirst({
        where: { sessionId: sessionId ?? ctx.session.$handle },
        include: { cartToItems: { include: { item: true } } },
      })

      if (!cart) {
        newPrice = await db.price.create({ data: { amount: fxRate, currency } })

        cart = await db.cart.create({
          data: { sessionId: ctx.session.$handle, amountId: newPrice.id },
          include: { cartToItems: { include: { item: true } } },
        })
      }

      const isExistItemId = cart.cartToItems.find((el) => el.itemId === itemId)

      if (isExistItemId) {
        await db.cartToItem.delete({ where: { id: isExistItemId.id } })
      } else {
        cartToItem = await db.cartToItem.create({
          data: { itemId, cartId: cart.id },
          include: { item: { include: { amount: true } }, cart: { include: { amount: true } } },
        })
      }

      newPrice = await db.price.findUnique({ where: { id: cart.amountId } })

      const cartToItems = await db.cartToItem.findMany({
        where: { cartId: cart.id },
        include: { item: { include: { amount: true } } },
      })
      const cartData = cartToItems.reduce((obj: { qty?: number; amount?: number }, item) => {
        return {
          qty: (obj.qty ?? 0) + item.qty,
          amount: (obj.amount ?? 0) + (newPrice?.amount ?? 0),
        }
      }, {})

      const res = await db.price.update({
        where: { id: cart.amountId },
        data: { amount: cartData.amount, currency },
      })

      cart = await db.cart.update({
        where: { id: cart.id },
        data: { numItems: cartData.qty ?? 0 },
        include: { cartToItems: { include: { item: true } } },
      })

      return cart
    } catch (error) {
      console.error(error)
    }
  }
)
