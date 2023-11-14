import LabeledSelectField from "../../../core/components/form/LabeledSelectField"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { PickProvinceOptions } from "./PickProvinceOptions"
import { useField } from "react-final-form"

type CountryFieldControllerProps = {
  countries: { label: string; value: string; img?: string }[]
  onChange?: (countryIsoCode: string) => void
}

export const CountryField = ({ onChange, countries }: CountryFieldControllerProps) => {
  const { t } = useTranslation(["shippingAddress"])
  const { input: region } = useField("region")
  const { input: city } = useField("city")

  return (
    <>
      <LabeledSelectField
        name={"countryId"}
        label={t("shippingAddress:fields.country.label")}
        options={countries}
        handleChange={() => {
          region.onChange(undefined)
          city.onChange(undefined)
        }}
        outerProps={{
          className: "sm:col-span-4 md:col-span-3 lg:col-span-5 xl:col-span-4 xxl:col-span-5",
        }}
      />
    </>
  )
}
