import React from "react"
import { CurrencyContext } from "src/core/contexts/currencyContext"

const useCurrency = () => React.useContext(CurrencyContext)

export { CurrencyContext, useCurrency }
