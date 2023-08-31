import React from "react"
import { useTranslation } from "react-i18next"

import { Form } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { LabeledCheckboxField } from "src/core/components/form/LabeledCheckboxField"
import { CheckoutPaymentFormInputsBlock } from "src/checkout/components/CheckoutPaymentFormInputsBlock"

interface CheckoutPaymentFormProps {}

export const CheckoutPaymentForm = (props: CheckoutPaymentFormProps) => {
  const {} = props

  const { t } = useTranslation(["pages.checkout"])

  return (
    <Form
      submitText={t("payment.form.submit.button.text")}
      onSubmit={() => {
        console.log("onSubmit")
      }}
    >
      <div className="mx-auto max-w-2xl flex flex-col gap-10 px-4 xl:max-w-none xl:px-0">
        <CheckoutPaymentFormInputsBlock title={t("payment.form.contact.title")}>
          <LabeledTextField
            name={"email"}
            label={t("payment.form.contact.email.label")}
            type={"email"}
            placeholder={"example@mail.com"}
            autoComplete={"email"}
            outerProps={{ className: "mt-6" }}
          />
        </CheckoutPaymentFormInputsBlock>

        <CheckoutPaymentFormInputsBlock title={t("payment.form.details.title")}>
          <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6">
            <LabeledTextField
              name={"card-number"}
              label={t("payment.form.details.cardNum.label")}
              placeholder={"1122 3344 5566 7788"}
              autoComplete={"card-number"}
              outerProps={{ className: "col-span-3 md:col-span-4" }}
            />

            <LabeledTextField
              name={"expiration-date"}
              label={t("payment.form.details.exp.label")}
              placeholder={"12/28"}
              autoComplete={"cc-exp"}
              outerProps={{ className: "col-span-2 xs:col-span-3" }}
            />

            <LabeledTextField
              name={"cvc"}
              label={t("payment.form.details.cvc.label")}
              type={"password"}
              placeholder={"123"}
              autoComplete={"csc"}
              outerProps={{ className: "xs:col-span-3" }}
            />
          </div>
        </CheckoutPaymentFormInputsBlock>

        <CheckoutPaymentFormInputsBlock title={t("payment.form.shipping.title")}>
          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 xxl:grid-cols-5">
            <LabeledTextField
              name={"address"}
              label={t("payment.form.shipping.address.label")}
              placeholder={t("payment.form.shipping.address.placeholder")}
              autoComplete={"street-address"}
              outerProps={{
                className: "sm:col-span-4 md:col-span-3 lg:col-span-5 xl:col-span-4 xxl:col-span-5",
              }}
            />

            <LabeledTextField
              name={"city"}
              label={t("payment.form.shipping.city.label")}
              placeholder={t("payment.form.shipping.city.placeholder")}
              autoComplete={"city-address"}
              outerProps={{
                className: "sm:col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-4 xxl:col-span-2",
              }}
            />

            <LabeledTextField
              name={"region"}
              label={t("payment.form.shipping.region.label")}
              placeholder={t("payment.form.shipping.region.placeholder")}
              autoComplete={"region-address"}
              outerProps={{
                className: "sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-4 xxl:col-span-2",
              }}
            />

            <LabeledTextField
              name={"postal-code"}
              label={t("payment.form.shipping.postal.label")}
              placeholder={t("payment.form.shipping.postal.placeholder")}
              autoComplete={"postal-code-address"}
              outerProps={{ className: "sm:col-span-2 md:col-span-1 xl:col-span-4 xxl:col-span-1" }}
            />
          </div>
        </CheckoutPaymentFormInputsBlock>

        <CheckoutPaymentFormInputsBlock title={t("payment.form.billing.title")}>
          <div className="mt-6 flex items-center">
            <LabeledCheckboxField
              name={"same-as-shipping"}
              label={t("payment.form.billing.sameAsShipping.label")}
              defaultChecked
            />
          </div>
        </CheckoutPaymentFormInputsBlock>
      </div>
    </Form>
  )
}

export default CheckoutPaymentForm
