export const formatConfig = (config) => {
  switch (config.key) {
    case "feeSaleCoef":
    case "feeCardTransactionCoef":
    case "feeCardRuTransactionCoef":
    case "feeCardIntTransactionCoef":
    case "feeSwiftFixed":
    case "feeSwiftCoef":
    case "feeBankRuFixed":
    case "feeBankRuCoef":
    case "dyteMeetingRate":
      const number = parseFloat(config.value)
      return isNaN(number) ? 0 : number
    case "allowAddSlots":
    case "allowLogin":
    case "allowPayouts":
    case "allowRefunds":
    case "allowRegGuides":
    case "allowRegUsers":
    case "allowSales":
    case "allowPaidGames":
    case "allowPaymentsRub":
    case "allowPaymentsSgd":
      return config.value === "1" || config.value === "true"
    case "numDaysMaxForSales":
      const numDaysMaxForSales = parseInt(config.value)
      return isNaN(numDaysMaxForSales) ? 0 : numDaysMaxForSales
    case "maxTicketsPerGame":
      const maxTicketsPerGame = parseInt(config.value)
      return isNaN(maxTicketsPerGame) ? 10 : maxTicketsPerGame
    case "currencies":
      return config.value.split(",").map((v) => v.trim())
    case "slotDateLimit":
      return new Date(config.value)
    default:
      return config.value
  }
}
