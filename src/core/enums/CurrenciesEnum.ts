import { CurrencyEnum } from "db"
import { getUrlСountryFlag } from "src/core/helpers/getUrlСountryFlag"

export const CurrenciesEnum = {
  RUB: {
    name: CurrencyEnum.RUB,
    value: "RU",
    symbol: "₽",
    // flag: getUrlСountryFlag({ country: "ru" }),
  },
  // USD: {
  //   name: CurrencyEnum.USD,
  //   value: "US",
  //   symbol: "$",
  //   flag: getUrlСountryFlag({ country: "us" }),
  // },
  EUR: {
    name: CurrencyEnum.EUR,
    value: "EU",
    symbol: "€",
    // flag: getUrlСountryFlag({ country: "eu" }),
  },
}

export const CurrenciesArray = Object.values(CurrenciesEnum).map((currency) => currency)
