import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { FormApi } from "final-form"
import { useFormState } from "react-final-form"
import { z } from "zod"
import { LocaleEnum } from "db"

import countriesJson from "layout/countries.json"

import { Form, FormProps } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { CountryField } from "./fields/CountryField"
import { Loading } from "src/core/components/Loading"
import { Condition } from "src/core/components/form/Condition"
import { PickProvinceOptions } from "src/checkout/components/fields/PickProvinceOptions"
import { PickCitiesOptions } from "src/checkout/components/fields/PickCitiesOptions"
import { PickDeliveryMethodsOptions } from "src/checkout/components/fields/PickDeliveryMethodsOptions"
import { PickAddressOptions } from "src/checkout/components/fields/PickAddressOptions"

interface CheckoutPaymentFormProps<S> extends FormProps<any> {
  handleSetOrder: (value?: number) => void
}

export const ShippingAddressForm = <S extends z.ZodType<any, any>>(
  props: CheckoutPaymentFormProps<S>
) => {
  const { handleSetOrder } = props

  const countries = countriesJson.countries

  const { t, i18n } = useTranslation(["shippingAddress", "shippingMethod"])
  // const [form, setForm] = useState<FormApi<z.TypeOf<S>, Partial<z.TypeOf<S>>>>()
  // const [countries] = useQuery(getListCountriesForDelivery, { staleTime: Infinity })

  return (
    <>
      <Form<S>
        subscription={{ submitting: true, pristine: true }}
        // debug={true}
        {...props}
        /*
        getInstance={(formA) => {
          !form && setForm(formA)
        }}
        */
      >
        <div className="mx-auto max-w-2xl flex flex-col gap-10 px-4 xl:max-w-none xl:px-0">
          <LabeledTextField
            name={"firstName"}
            label={t("shippingAddress:fields.firstName.label")}
            type={"text"}
            autoComplete={"first-name"}
            outerProps={{ className: "mt-6 mb-2" }}
            required
          />
          <LabeledTextField
            name={"lastName"}
            label={t("shippingAddress:fields.lastName.label")}
            type={"text"}
            autoComplete={"last-name"}
            outerProps={{ className: "mb-2" }}
            required
          />

          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 xxl:grid-cols-5">
            {/* тут комментарий должен быть, который внизу компонента */}
            <CountryField
              countries={countries.map(({ id, code, titleRu, titleEn, flag }) => ({
                value: id === "RU" || id === "KZ" || id === "BY" ? id : code,
                label: i18n.resolvedLanguage?.toLowerCase() === LocaleEnum.ru ? titleRu : titleEn,
                img: flag,
              }))}
            />

            {/* SDEK FORM */}
            <Condition when={"countryId"} is={["RU", "KZ", "BY"]}>
              <PickDeliveryMethodsOptions />
            </Condition>

            <Loading>
              <PickProvinceOptions />
            </Loading>

            <Loading>
              <PickCitiesOptions />
            </Loading>

            <Loading>
              <PickAddressOptions handleSetOrder={handleSetOrder} />
            </Loading>
          </div>
          <LabeledTextField
            name={"phone"}
            label={t("shippingAddress:fields.phone.label")}
            type={"text"}
            autoComplete={"phone"}
            outerProps={{ className: "mt-6 mb-2" }}
            required
          />
        </div>
      </Form>
    </>
  )
}

export default ShippingAddressForm

{
  /*<CountryField countries={countries} />*/
}
{
  /* SDEK FORM */
}
{
  /*<Condition when={"countryId"} is={["RU", "KZ", "BY"]}>*/
}
{
  /*  <Loading>*/
}
{
  /*    <PickProvinceOptions>*/
}
{
  /*      {(options, disabled) => (*/
}
{
  /*        <LabeledSelectField*/
}
{
  /*          format={"object"}*/
}
{
  /*          key={"province"}*/
}
{
  /*          name={"province"}*/
}
{
  /*          label={t("shippingAddress:fields.province.label")}*/
}
{
  /*          options={options}*/
}
{
  /*          outerProps={{*/
}
{
  /*            className:*/
}
{
  /*              "sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-4 xxl:col-span-2",*/
}
{
  /*          }}*/
}
{
  /*          required*/
}
{
  /*          disabled={disabled}*/
}
{
  /*        />*/
}
{
  /*      )}*/
}
{
  /*    </PickProvinceOptions>*/
}
{
  /*  </Loading>*/
}
{
  /*  <Loading>*/
}
{
  /*    <PickCitiesOptions>*/
}
{
  /*      {(options, disabled) => (*/
}
{
  /*        <LabeledSelectField*/
}
{
  /*          format={"object"}*/
}
{
  /*          key={"city"}*/
}
{
  /*          name={"city"}*/
}
{
  /*          label={t("shippingAddress:fields.city.label")}*/
}
{
  /*          options={options}*/
}
{
  /*          outerProps={{*/
}
{
  /*            className:*/
}
{
  /*              "sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-4 xxl:col-span-2",*/
}
{
  /*          }}*/
}
{
  /*          required*/
}
{
  /*          disabled={disabled}*/
}
{
  /*        />*/
}
{
  /*      )}*/
}
{
  /*    </PickCitiesOptions>*/
}
{
  /*  </Loading>*/
}
{
  /*  <RadioSelectedCardsField*/
}
{
  /*    name={"deliveryMethod"}*/
}
{
  /*    label={t("shippingAddress:fields.deliveryMethod.label")}*/
}
{
  /*    options={[*/
}
{
  /*      { label: t("shippingAddress:fields.deliveryMethod.options.door"), value: 1 },*/
}
{
  /*      { label: t("shippingAddress:fields.deliveryMethod.options.pickup"), value: 2 },*/
}
{
  /*    ]}*/
}
{
  /*  />*/
}
{
  /*  <Condition when={"deliveryMethod"} is={1}></Condition>*/
}
{
  /*  <Condition when={"deliveryMethod"} is={2}>*/
}
{
  /*    <LabeledTextField*/
}
{
  /*      name={"address"}*/
}
{
  /*      label={t("shippingAddress:fields.address.label")}*/
}
{
  /*      autoComplete={"street-address"}*/
}
{
  /*      outerProps={{*/
}
{
  /*        className:*/
}
{
  /*          "sm:col-span-4 md:col-span-3 lg:col-span-5 xl:col-span-4 xxl:col-span-5",*/
}
{
  /*      }}*/
}
{
  /*    />*/
}
{
  /*  </Condition>*/
}
{
  /*</Condition>*/
}
{
  /* INTERNATIONAL FORM */
}
{
  /*<Condition when={"countryId"} not={["RU", "KZ", "BY"]}>*/
}
