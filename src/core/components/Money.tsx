import { useQuery } from "@blitzjs/rpc"
import { CurrencyEnum } from "db"

import { currencyFormat } from "src/core/helpers/Helpers"
import { useCurrency } from "src/core/hooks/useCurrency"
import getFxRate from "src/fx-rates/queries/getFxRate"

export const Money = (props: {
  amount: number
  currency?: CurrencyEnum
  withPlus?: boolean
  ceil?: boolean
}) => {
  const { amount, currency = "EUR", withPlus = false, ceil } = props
  let plus = ""

  const currencyHook = useCurrency()
  const [rate] = useQuery(getFxRate, { from: currencyHook.currency.name, to: currency })

  if (withPlus) {
    plus = amount > 0 ? "+" : ""
  }

  return (
    <span className="whitespace-nowrap">
      {plus}
      {currencyFormat({
        num: amount / rate,
        currency: currencyHook.currency.name,
        ceil,
      })}
    </span>
  )
}
