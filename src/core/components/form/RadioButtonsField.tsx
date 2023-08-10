import React, { useState, forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { RadioGroup } from "@headlessui/react"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"

import { RadioButtonField } from "./RadioButtonField"

export interface OptionRadioButtonField {
  label: string
  value: string | number
  disabled?: boolean
}

export interface RadioButtonsFieldProps {
  name: string
  label: string
  required?: boolean
  disabled?: boolean
  helperText?: string
  defaultValue?: OptionRadioButtonField
  options: Array<OptionRadioButtonField>

  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const RadioButtonsField = forwardRef<HTMLInputElement, RadioButtonsFieldProps>(
  (props, ref) => {
    const {
      name,
      label,
      required,
      disabled,
      helperText,
      defaultValue,
      options,

      outerProps,
      fieldProps,
      labelProps,
    } = props

    const [selected, setSelected] = useState<OptionRadioButtonField | undefined>(
      defaultValue || undefined
    )

    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      /*
      parse: (v) => {
        return boolean ? !!Number(v) : v
      },
      format: (v) => {
        return boolean ? (typeof v === "string" ? v : v ? "1" : "0") : v
      },
      */
      parse: (v) => v,
      format: (v) => v,
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const showError = !normalizedError // touched && normalizedError

    return (
      <div className="relative mb-7" {...outerProps}>
        <RadioGroup
          {...input}
          ref={ref}
          value={selected}
          onChange={setSelected}
          disabled={disabled || submitting}
        >
          <div className="relative">
            <RadioGroup.Label
              className="block text-sm font-medium leading-6 text-gray-900"
              {...labelProps}
            >
              {label}
              {required && <span className="text-red-600">{required && " *"}</span>}
            </RadioGroup.Label>

            {showError && (
              <div
                className={"pointer-events-none absolute inset-y-0  flex items-center pr-3 right-0"}
              >
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {options.map((option) => (
              <RadioButtonField key={option.value} option={option} />
            ))}
          </div>
        </RadioGroup>

        {helperText && (
          <p className="m-0 mt-1 text-sm text-gray-500" id={`${name}-description`}>
            {helperText}
          </p>
        )}
        {showError && (
          <p id={`${name}-error`} role="alert" className="absolute m-0 mt-1 text-sm text-red-600">
            {normalizedError}
          </p>
        )}
      </div>
    )
  }
)

export default RadioButtonsField
