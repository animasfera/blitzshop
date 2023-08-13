import { currencyFormat } from "../helpers/Helpers"

export const Money = (props: { amount: number; currency?: string; withPlus?: boolean }) => {
  const { amount, currency = "EUR", withPlus = false } = props
  let plus = ""

  if (withPlus) {
    plus = amount > 0 ? "+" : ""
  }

  return (
    <span className="text-gray-900 whitespace-nowrap">
      {plus}
      {currencyFormat(amount, currency)}
    </span>
  )
}
