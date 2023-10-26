import { useTranslation } from "react-i18next"

export const Weight = (props: { value: number; sys?: "kg" | "g" }) => {
  const { t, i18n } = useTranslation(["item"])
  const { value, sys = "kg" } = props
  let showValue
  sys === "kg" ? (showValue = value / 1000) : (showValue = value)
  return <span className="whitespace-nowrap">{showValue + " " + t("weight." + sys)}</span>
}
