import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import db, { CurrencyEnum, Price } from "db"
import { CartWithCartToItem } from "types"

import { MergedCart } from "src/carts/schemas"
import { converter } from "src/core/converter"

interface MergedCartIsAuth {
  userId: number | null
  sessionId: string | null | undefined
  cart: CartWithCartToItem | null
  currency: CurrencyEnum
}
interface MergedCarts {
  userId: number | null | undefined
  sessionId: string | null | undefined
  currency: CurrencyEnum
  ctx: Ctx
}

const includeCart = { amount: true, cartToItems: { include: { item: true } } }

export const mergedCartIsAuth = async ({ userId, sessionId, cart, currency }: MergedCartIsAuth) => {
  let newCart: CartWithCartToItem | null = null
  let newPrice: Price | null = null
  let price: Price | null = null

  try {
    if (sessionId) {
      newCart = await db.cart.findFirst({ where: { sessionId }, include: includeCart })
    }

    if (newCart && cart) {
      const fxRate = await converter({
        from: newCart.amount.currency,
        to: cart.amount.currency,
        amount: newCart.amount.amount,
      })

      price = await db.price.findUnique({ where: { id: newCart.amountId } })

      newPrice = await db.price.update({
        where: { id: cart.amountId },
        data: {
          amount: cart.amount.amount + fxRate,
          currency: cart.amount.currency,
        },
      })

      let dataCartToItems: { qty: number; itemId: number; cartId: number }[] = []

      newCart.cartToItems.forEach((el) => {
        const exist = cart ? cart?.cartToItems.some((item) => item.itemId === el.itemId) : false

        if (!exist) {
          dataCartToItems.push({
            cartId: cart.id,
            itemId: el.itemId,
            qty: el.qty,
          })
        }
      })

      const cartToItems = await db.cartToItem.createMany({
        data: dataCartToItems,
      })

      newCart = await db.cart.update({
        where: { id: cart.id },
        data: { userId, mergedCartId: newCart.id, numItems: cartToItems.count + cart.numItems },
        include: includeCart,
      })

      return newCart
    }

    if (newCart) {
      price = await db.price.findUnique({ where: { id: newCart.amountId } })

      newPrice = await db.price.create({
        data: {
          amount: price?.amount ?? 0,
          currency: price?.currency ?? currency,
        },
      })

      const cartAuth = await db.cart.create({
        data: { userId, mergedCartId: newCart.id, amountId: newPrice.id },
        include: { ...includeCart },
      })
      // const cartToItemsAuth =
      const cartToItems = await db.cartToItem.createMany({
        data: newCart.cartToItems.map((el) => ({
          cartId: cartAuth.id,
          itemId: el.itemId,
          qty: el.qty,
        })),
      })

      newCart = await db.cart.update({
        where: { id: cartAuth.id },
        data: { numItems: cartToItems.count },
        include: includeCart,
      })

      return newCart
    }

    newPrice = await db.price.create({
      data: { amount: 0, currency },
    })
    newCart = await db.cart.create({
      data: { amountId: newPrice.id, numItems: 0, userId },
      include: includeCart,
    })

    return newCart
  } catch (error) {
    console.error(error)
  }

  return cart
}

export const mergedCart = async ({ userId, sessionId, currency, ctx }: MergedCarts) => {
  let cart: CartWithCartToItem | null = null

  if (ctx.session.$isAuthorized() && userId) {
    cart = await db.cart.findFirst({
      where: { userId },
      include: includeCart,
    })

    return await mergedCartIsAuth({ userId, sessionId, cart, currency })
  }

  if (sessionId) {
    cart = await db.cart.findFirst({
      where: { sessionId },
      include: includeCart,
    })
  }

  if (cart) return cart

  const price = await db.price.create({
    data: { amount: 0, currency },
  })
  cart = await db.cart.create({
    data: { amountId: price.id, numItems: 0, sessionId },
    include: includeCart,
  })

  return cart
}

export default resolver.pipe(
  resolver.zod(MergedCart),
  async ({ userId, sessionId, currency }, ctx: Ctx) => {
    return await mergedCart({ userId, sessionId, currency, ctx })
  }
)
