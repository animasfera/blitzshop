import { resolver } from "@blitzjs/rpc"
import db, { CartToItem, CurrencyEnum, Item, Price } from "db"
import { CartWithCartToItem } from "types"

import { converter } from "src/core/converter"
import { mergedCart } from "src/carts/mutations/mergedCart"

import { AddProductToCartSchema } from "../schemas"

const includeCart = { amount: true, cartToItems: { include: { item: true } } }

export default resolver.pipe(
  resolver.zod(AddProductToCartSchema),
  async ({ userId, sessionId, itemId, price, currency }, ctx) => {
    let cart: CartWithCartToItem | null = null
    let cartToItem: CartToItem & { item: Item }
    let newPrice: Price | null
    const fxRate = await converter({ from: price.currency, to: currency, amount: price.amount })

    try {
      cart = await mergedCart({
        userId,
        sessionId: sessionId ?? ctx.session.$handle,
        currency,
        ctx,
      })

      if (!cart) {
        newPrice = await db.price.create({ data: { amount: fxRate, currency } })

        cart = await db.cart.create({
          data: { sessionId: ctx.session.$handle, amountId: newPrice.id },
          include: includeCart,
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
      const cartData = cartToItems.reduce((obj: { qty?: number }, item) => {
        return {
          qty: (obj.qty ?? 0) + item.qty,
        }
      }, {})

      let resAmount: number = 0

      for (let i = 0; i < cartToItems.length; i++) {
        const reaAmount = cartToItems[i]?.item.amount.amount ?? 0
        const resCurrency = cartToItems[i]?.item.amount.currency ?? CurrencyEnum.USD
        const resRate = await converter({
          from: resCurrency,
          to: currency,
          amount: reaAmount,
        })

        resAmount = resAmount + resRate
      }

      const res = await db.price.update({
        where: { id: cart.amountId },
        data: { amount: resAmount, currency }, // cartData.amount
      })

      cart = await db.cart.update({
        where: { id: cart.id },
        data: { numItems: cartData.qty ?? 0 },
        include: includeCart,
      })

      return cart
    } catch (error) {
      console.error(error)
    }
  }
)
