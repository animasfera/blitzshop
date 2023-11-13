import { AuthenticationError, NotFoundError, Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import queryString from "query-string"
import { z } from "zod"
import { CurrencyEnum } from "db"

interface BoxberryShippingCost {
  DelCost: number
  ServiceCost: number
  Total: number
  Currency: CurrencyEnum
  TariffZone: number
  includeInsurance: string
  DutyAmount: number | null
  error: {
    isError: false
    errorCode?: string
    errorMessage?: string
  }
}

const GetBoxberryShippingCost = z.object({
  deliveryMethod: z.number(),
  shippingAddress: z.object({
    country_code: z.string(),
    city_code: z.number().or(z.string()).optional(),
    city: z.string().optional(),
    postal_code: z.string().optional(),
    address: z.string().optional(),
  }),
  packages: z.array(
    z.object({
      weight: z.number(),
      height: z.number().optional(),
      length: z.number().optional(),
      width: z.number().optional(),
    })
  ),
})

/*
  token 	string 	да 	Ключ доступа
  method 	string 	да 	DeliveryCost
  weight 	integer 	да 	Вес посылки, г
  type 	integer 	да 	Тип доставки, 1=до отделения, 2=курьерская доставка
  countryCode 	string 	да 	Код страны в ISO 3166-1 numeric
  express 	boolean 	да 	Нужна ли экспресс доставка. Если экспресс доставка недоступна в стране, будет ошибка
  marketplaceType 	integer 	нет 	Маркетплейс 1 - Ebay, 2 - Etsy, 3 - другой, 4 - AliExpress, 5 - Amazon, 0 - Нет. Обязательно для экспорта в страны Европы
  departPoint 	string 	да 	ПВЗ отправления
  dutyPayment 	string 	нет 	Тип оплаты пошлины DDP/DDU
  insurance 	integer 	нет 	Страхование посылки, 1 - да, 0 - нет, по-умолчанию = 0
  destination 	string 	да 	Индекс при курьерской доставке, иначе код отделения
  value 	float 	нет 	Стоимость отправления, для расчета страховки, 0 если не указана
  currency 	string 	нет 	Валюта стоимости. Например, EUR, USD, RUB. По-умолчанию валюта ИМ
  width 	float 	да 	Длина, см
  height 	float 	да 	Ширина, см
  depth 	float 	да 	Высота, см
*/

export default resolver.pipe(
  resolver.zod(GetBoxberryShippingCost),
  resolver.authorize(),
  async ({ deliveryMethod, shippingAddress, packages }, ctx: Ctx) => {
    const token = process.env.BOXBERRY_PRIVAT_TOKEN
    const url = process.env.BOXBERRY_PRIVAT_URL

    if (!token) {
      // TODO: add translate text err
      throw new AuthenticationError("нет токена")
    }

    if (!url) {
      // TODO: add translate text err
      throw new NotFoundError()
    }

    let weight = 0
    let width = 0
    let height = 0
    let depth = 0

    packages.forEach((item) => {
      weight += item.weight
      width += item.width ?? 0
      height += item.height ?? 0
      depth += item.length ?? 0
    })

    try {
      const queryParams = {
        type: deliveryMethod, // Тип доставки, 1=до отделения, 2=курьерская доставка
        weight,
        countryCode: shippingAddress.country_code,
        departPoint: "01574",
        // TODO: destination 	string 	да 	Индекс при курьерской доставке, иначе код отделения
        destination: shippingAddress.postal_code, // &destination=12345-6789
        currency: ctx.session.user?.currency ?? CurrencyEnum.EUR,
        width,
        height,
        depth,

        // TODO: Юля говорила что нужно добавить возможность выбора DDP || DDU
        // dutyPayment=DDP
        /*
        ???
        может быть такое
        В указанную страну (Австрия) невозможно отправить посылку весом более 2 кг с выбранным типом оплаты пошлины (DDU)
        */
        dutyPayment: "DDP", // TODO: required!!!

        // TODO: Юля сказала, что "Плюс важный момент - это страховка."
        // Страхование посылки, 1 - да, 0 - нет, по-умолчанию = 0
        insurance: 1, // TODO: required!!!

        // TODO: value 	float 	нет 	Стоимость отправления, для расчета страховки, 0 если не указана
        // &value=50
        value: 50, // TODO: required!!!
      }

      const data = await fetch(
        `${url}/export-api?method=DeliveryCost&token=${token}&${queryString.stringify(
          queryParams
        )}`,
        {}
      )

      if (data.ok) {
        const res: BoxberryShippingCost = await data.json()

        if (res.error.isError) throw new Error(`${res.error.errorCode}: ${res.error.errorMessage}`)

        return {
          delivery_sum: ((res.DutyAmount ?? 0) + res.ServiceCost) * 100,
          currency: res.Currency,
        }
      }
      throw new Error(`Error code: ${data.status}. Message: ${data.statusText}`)
    } catch (err) {
      console.error("Unknown Error", err)
      throw new Error(JSON.stringify(err))
    }
  }
)
