"use client"
import React from "react"
import { CurrencyEnum } from "@prisma/client"

export interface Currency {
  name: CurrencyEnum
  rate: number
}

let CurrencyContext: React.Context<{
  currency: Currency
  setCurrency: (value: { name: CurrencyEnum; rate: number }) => void
}>

// @ts-ignore
CurrencyContext = React.createContext({
  currency: { name: CurrencyEnum.EUR, rate: 1 },
  setCurrency: (value) => {},
})

export { CurrencyContext }
