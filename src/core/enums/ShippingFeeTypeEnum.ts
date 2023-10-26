import { ShippingFeeTypeEnum } from "db"

export const ShippingsFeeTypeEnum = {
  FIXED: {
    value: ShippingFeeTypeEnum.FIXED,
    nameEn: "Fixed fee",
    nameRu: "Фиксированная оплата",
  },
  PER_KG: {
    value: ShippingFeeTypeEnum.PER_KG,
    nameEn: "By weight per kg",
    nameRu: "По весу за кг",
  },
}

export const ShippingsArray = Object.values(ShippingsFeeTypeEnum).map((shipping) => shipping)
