import db, { CurrencyEnum } from "db"

export const createConfigs = async () => {
  try {
    await db.config.upsert({
      where: { key: "allowAddItems" },
      update: { value: "1" },
      create: { key: "allowAddItems", value: "1" },
    })

    await db.config.upsert({
      where: { key: "allowLogin" },
      update: { value: "1" },
      create: { key: "allowLogin", value: "1" },
    })

    await db.config.upsert({
      where: { key: "allowPayouts" },
      update: { value: "1" },
      create: { key: "allowPayouts", value: "1" },
    })

    await db.config.upsert({
      where: { key: "allowRefunds" },
      update: { value: "1" },
      create: { key: "allowRefunds", value: "1" },
    })

    await db.config.upsert({
      where: { key: "allowRegUsers" },
      update: { value: "1" },
      create: { key: "allowRegUsers", value: "1" },
    })

    await db.config.upsert({
      where: { key: "allowSales" },
      update: { value: "1" },
      create: { key: "allowSales", value: "1" },
    })

    await db.config.upsert({
      where: { key: "currencies" },
      update: { value: Object.values(CurrencyEnum).join() },
      create: { key: "currencies", value: Object.values(CurrencyEnum).join() },
    })

    await db.config.upsert({
      where: { key: "feeBankRuCoef" },
      update: { value: "0.01" },
      create: { key: "feeBankRuCoef", value: "0.01" },
    })

    await db.config.upsert({
      where: { key: "feeBankRuFixed" },
      update: { value: "20" },
      create: { key: "feeBankRuFixed", value: "20" },
    })

    await db.config.upsert({
      where: { key: "feeCardIntTransactionCoef" },
      update: { value: "0.029" },
      create: { key: "feeCardIntTransactionCoef", value: "0.029" },
    })

    await db.config.upsert({
      where: { key: "feeCardRuTransactionCoef" },
      update: { value: "0.024" },
      create: { key: "feeCardRuTransactionCoef", value: "0.024" },
    })

    await db.config.upsert({
      where: { key: "feeSaleCoef" },
      update: { value: "0.15" },
      create: { key: "feeSaleCoef", value: "0.15" },
    })

    await db.config.upsert({
      where: { key: "feeSwiftCoef" },
      update: { value: "0.02" },
      create: { key: "feeSwiftCoef", value: "0.02" },
    })

    await db.config.upsert({
      where: { key: "feeSwiftFixed" },
      update: { value: "30" },
      create: { key: "feeSwiftFixed", value: "30" },
    })

    await db.config.upsert({
      where: { key: "numDaysMaxForSales" },
      update: { value: "30" },
      create: { key: "numDaysMaxForSales", value: "30" },
    })
  } catch (err) {
    console.error(err)
  }
}

export default createConfigs
