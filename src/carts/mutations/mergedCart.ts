import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db, { Cart, CartToItem, CurrencyEnum, Item, Price } from "db"

import { MergedCart } from "../schemas"

type CartWithCartToItem = (Cart & { amount: Price; cartToItems: CartToItem[] }) | null
interface MergedCartIsAuth {
  userId: number | null
  sessionId: string | null | undefined
  cart: CartWithCartToItem
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
  let newCart: CartWithCartToItem = null
  let newPrice: Price | null = null

  try {
    if (cart) return cart

    if (sessionId) {
      newCart = await db.cart.findFirst({ where: { sessionId }, include: includeCart })
    }

    if (newCart) {
      const PriceSessionCart = await db.price.findUnique({ where: { id: newCart.amountId } })
      const newPrice = await db.price.create({
        data: {
          amount: PriceSessionCart?.amount ?? 0,
          currency: PriceSessionCart?.currency ?? currency,
        },
      })
      const cartAuth = await db.cart.create({
        data: { userId, mergedCartId: newCart.id, amountId: newPrice.id },
        include: { ...includeCart },
      })
      const cartToItem = await db.cartToItem.createMany({ data: cartAuth.cartToItems })

      newCart = await db.cart.update({
        where: { id: cartAuth.id },
        data: { numItems: cartToItem.count },
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
    console.log(error)
  }

  return cart
}

export const mergedCart = async ({ userId, sessionId, currency, ctx }: MergedCarts) => {
  let cart: CartWithCartToItem = null

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
