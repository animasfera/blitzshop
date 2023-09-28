import { CurrencyEnum } from "@prisma/client"
import axios from "axios"

interface Converter {
  from: CurrencyEnum
  to: CurrencyEnum
  amount: number
}

export const converter = async ({ from, to, amount }: Converter) => {
  if (from === to) return amount

  let res: any

  await fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    .then(async (response) => {
      const result = await response.json()

      if (to === CurrencyEnum.RUB) {
        res = result.Valute[`${from}`].Value
      } else if (from === CurrencyEnum.RUB) {
        res = result.Valute[`${to}`].Value / 10000
      } else {
        res = result.Valute[`${from}`].Value / result.Valute[`${to}`].Value
      }
    })
    .catch((err) => console.error(err))

  return Math.ceil(res * amount * 1.01)
}
export default converter

/*
  if (from === to) return Math.ceil(amount)

  const res = await axios.get(
    `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`,
    { headers: { apikey: process.env.CONVERTER_API_KEY || "" } }
  )

  const data = res.data

  if (data && data.result) {
    return Math.ceil(data.result)
  } else {
    throw new Error("Currency converter is unavailable")
  }
*/
