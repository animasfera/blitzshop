import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { DeliveryMethodEnum, InvoiceStatusEnum, Prisma, ShippingCompanyEnum } from "db"

import countriesJson from "layout/countries.json"
import getShippingCost from "src/shipping-addresses/queries/getShippingCost"
import { CreateOrderSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateOrderSchema),
  resolver.authorize(),
  async ({ items, shippingAddress, ...rest }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // TODO if currency!==EUR - convert rest.total to currency
    const session = await ctx.session.$getPrivateData()
    const cartId = session.cartId

    if (items.length === 0) {
      throw new Error("No items in the order")
    }

    const itemsOriginal = await db.item.findMany({
      where: { id: { in: items.map((item) => item.itemId) as number[] } },
      include: { images: { include: { image: true } } },
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

    const selectedCountry = countriesJson.countries.find(
      (el) => el.id === shippingAddress.countryId || el.code === shippingAddress.countryId
    )
    if (!selectedCountry) throw new Error()

    const country = {
      connectOrCreate: {
        where: { id: selectedCountry.id },
        create: {
          id: shippingAddress.countryId,
          titleRu: selectedCountry.titleRu,
          titleEn: selectedCountry.titleEn,
        },
      },
    }

    const user = { connect: { id: ctx.session.userId } }

    const shippingCompany =
      shippingAddress.countryId === "RU" ||
      shippingAddress.countryId === "BY" ||
      shippingAddress.countryId === "KZ"
        ? ShippingCompanyEnum.SDEK
        : ShippingCompanyEnum.BOXBERRY

    /*
    const shippingCost = await getShippingCost(
      {
        deliveryMethod: shippingAddress?.deliveryMethod === DeliveryMethodEnum.DOOR ? 2 : 1,
        shippingAddress: {
          country_code:
            shippingCompany === ShippingCompanyEnum.SDEK
              ? selectedCountry.id
              : selectedCountry.code,
          city_code: shippingAddress?.cityId ?? undefined,
          city: shippingAddress.city ?? undefined,
        },
        packages: itemsOriginal.map((el) => ({
          weight: el.weight,
        })),
      },
      ctx
    )
    */

    let orderData = {
      ...rest,
      shippingCompany: shippingCompany,

      /*
      getShippingCost for:

      shippingFee
      shippingDutyFee
      shippingInsuranceFee
      shippingPackageFee
      shippingAddress
      shippingAddressId
      shippingDutyPayment
      shippingInsurance
      shippingTrackingId
      shippingCompany
      */
      log: { create: {} },
      shippingAddress: {
        create: {
          deliveryMethod: shippingAddress.deliveryMethod,
          company: shippingCompany,
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          phone: shippingAddress.phone,
          address: shippingAddress.address,
          city: shippingAddress.city ?? "",
          cityId: shippingAddress.cityId,
          province: shippingAddress.province,
          provinceId: shippingAddress.provinceId,
          postalCode: shippingAddress.postalCode ?? "",
          country,
          user,
        },
      },
      /*
      invoice: {
        create: {
          amount: rest.total,
          status: InvoiceStatusEnum.PENDING,
          currency,
        },
      },
      */
      items: { createMany: { data: purchasedItemsCreateInput } },
      net: 0,
      user: { connect: { id: ctx.session.userId } },
    } as Prisma.OrderCreateInput

    const order = await db.order.create({
      data: orderData,
      include: {
        items: true,
        user: true,
        invoice: true,
        log: true,
        shippingAddress: true,
      },
    })

    // !!!
    /*
    await db.cartToItem.deleteMany({ where: { cartId } })
    await db.cart.update({
      where: { id: cartId },
      data: { numItems: 0 },
    })
    */

    return order
  }
)
