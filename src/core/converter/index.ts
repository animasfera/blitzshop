import { CurrencyEnum } from "@prisma/client"
import axios from "axios"

interface Converter {
  from: CurrencyEnum
  to: CurrencyEnum
  amount: number
}

const converter = async ({ from, to, amount }: Converter) => {
  const res = await axios.get(
    `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`,
    { headers: { apikey: process.env.CONVERTER_API_KEY || "" } }
  )

  const data = res.data

  console.log(data)

  if (data && data.result) {
    return Math.ceil(data.result)
  } else {
    throw new Error("Currency converter is unavailable")
  }
}
export default converter
