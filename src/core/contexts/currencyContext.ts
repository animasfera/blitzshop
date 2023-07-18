import React from "react"
import { CurrencyEnum } from "@prisma/client"

export interface Currency {
  name: string
  rate: number
}

let CurrencyContext: React.Context<{
  currency: Currency
  setCurrency: (value: { name: CurrencyEnum; rate: number }) => void
}>

CurrencyContext = React.createContext({
  currency: { name: "EUR", rate: 1 },
  setCurrency: (value) => {},
})

export { CurrencyContext }
