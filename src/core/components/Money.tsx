import { CurrencyEnum } from "db"

import { currencyFormat } from "src/core/helpers/Helpers"

export const Money = (props: {
  amount: number
  currency?: CurrencyEnum
  withPlus?: boolean
  ceil?: boolean
}) => {
  const { amount, currency = "EUR", withPlus = false, ceil } = props
  let plus = ""

  if (withPlus) {
    plus = amount > 0 ? "+" : ""
  }

  return (
    <span className="whitespace-nowrap">
      {plus}
      {currencyFormat({ num: amount, currency, ceil })}
    </span>
  )
}
