import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { RadioGroup } from "@headlessui/react"
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid"

import { classNames } from "src/core/helpers/classNames"

interface CheckoutDeliveryMethodProps {
  deliveryMethods: { value: 1 | 2; label: string }[]
  deliveryMethod: { value: 1 | 2; label: string }

  handleDeliveryMethod: (el: { value: 1 | 2; label: string }) => void
}

export const CheckoutDeliveryMethod = (props: CheckoutDeliveryMethodProps) => {
  const { deliveryMethods, deliveryMethod, handleDeliveryMethod } = props

  const { t } = useTranslation(["pages.checkout"])

  return (
    <section className="pt-16 xl:col-start-1 xl:row-start-1 xl:mx-auto xl:w-full xl:max-w-xl xl:pb-10 xl:py-0">
      <h2 className="sr-only">{t("delivery.title")}</h2>

      <div>
        <RadioGroup
          value={deliveryMethod}
          onChange={(v) => {
            handleDeliveryMethod(v)
          }}
        >
          <RadioGroup.Label className="text-lg font-medium text-gray-900">
            {t("delivery.title")}
          </RadioGroup.Label>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {deliveryMethods.map((method) => (
              <RadioGroup.Option
                key={method.value}
                value={method}
                className={() =>
                  classNames(
                    method.value === deliveryMethod.value
                      ? "border-transparent"
                      : "border-gray-300",
                    method.value === deliveryMethod.value ? "ring-2 ring-indigo-500" : "",
                    "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                  )
                }
              >
                {() => (
                  <>
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className="block text-sm font-medium text-gray-900"
                        >
                          {method.label}
                        </RadioGroup.Label>
                        {/*
                        <RadioGroup.Description
                          as="span"
                          className="mt-1 flex items-center text-sm text-gray-500"
                        >
                          {deliveryMethod.turnaround}
                        </RadioGroup.Description>
                        <RadioGroup.Description
                          as="span"
                          className="mt-6 text-sm font-medium text-gray-900"
                        >
                          {deliveryMethod.price}
                        </RadioGroup.Description>
                        */}
                      </span>
                    </span>
                    {method.value === deliveryMethod.value ? (
                      <CheckCircleIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                    ) : null}
                    <span
                      className={classNames(
                        method.value === deliveryMethod.value ? "border" : "border-2",
                        method.value === deliveryMethod.value
                          ? "border-indigo-500"
                          : "border-transparent",
                        "pointer-events-none absolute -inset-px rounded-lg"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </section>
  )
}

export default CheckoutDeliveryMethod
