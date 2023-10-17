import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { CurrencyEnum, LocaleEnum } from "@prisma/client"
import db from "db"

import { CreateCardTokenSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateCardTokenSchema),
  // resolver.authorize(),
  async (input, ctx) => {
    let cardToken = await db.cardToken.findUnique({ where: { token: input.token } })
    const cardCountryIsoCode = input.cardCountryIsoCode.toLowerCase()

    if (cardCountryIsoCode !== LocalEnum.ru) {
      throw new Error("Only Russian cards can be attached")
    }

    if (!cardToken) {
      ;``
      cardToken = await db.cardToken.create({
        data: {
          token: input.token,
          owner: { connect: { id: input.ownerId } },
          cardLastFour: input.cardLastFour,
          cardType: input.cardType,
          cardExpDate: input.cardExpDate,
          cardCountryIsoCode: cardCountryIsoCode,
        },
      })
    }

    /*
    const moneyAccount = await db.moneyAccount.findFirst({
      where: {
        userId: input.ownerId,
        currency: CurrencyEnum.RUB,
      },
    })

    if (!moneyAccount) {
      throw new Error("Can't add card token - payment profile not found")
    } else {
      console.log("found moneyAccount")
    }

    const paymentMethod = await db.paymentMethod.findFirst({
      where: {
        name: "cloudpayments",
      },
    })
    if (!paymentMethod) {
      throw new NotFoundError()
    } else {
      console.log("found paymentMethod")
    }


    const paymentMethodDetail = await db.paymentMethodDetail.create({
      data: {
        moneyAccountId: moneyAccount.id,
        paymentMethodId: paymentMethod.id,
        cardTokenId: cardToken.id,
      },
    })
    if (!paymentMethodDetail) {
      throw new Error("Couldn't create paymentMethodDetail")
    } else {
      console.log("created paymentMethodDetail")
    }
    */

    try {
      // await activatePaymentMethodDetailDbQuery({ id: paymentMethodDetail.id }, ctx, db)
    } catch (e) {
      console.error(e)
    }

    return cardToken
  }
)
