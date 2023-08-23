import React, { useState, forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { RadioGroup } from "@headlessui/react"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"

import { classNames } from "src/core/helpers/classNames"

export interface OptionLabeledColorsField {
  value: string
  bgColor: string
  selectedColor: string
}

export interface LabeledColorsFieldProps {
  name: string
  label: string
  required?: boolean
  disabled?: boolean
  helperText?: string
  defaultValue?: OptionLabeledColorsField
  options: Array<OptionLabeledColorsField>

  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const LabeledColorsField = forwardRef<HTMLInputElement, LabeledColorsFieldProps>(
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

    const [selected, setSelected] = useState<OptionLabeledColorsField | undefined>(
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
    const showError = touched && normalizedError

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
                className={"pointer-events-none absolute inset-y-0 flex items-center pr-3 right-0"}
              >
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center space-x-3">
            {options.map((color) => (
              <RadioGroup.Option
                key={color.value}
                value={color}
                className={({ active, checked }) =>
                  classNames(
                    color.selectedColor,
                    active && checked ? "ring ring-offset-1" : "",
                    !active && checked ? "ring-2" : "",
                    disabled || submitting ? "cursor-not-allowed" : "cursor-pointer",
                    "relative -m-0.5 flex items-center justify-center rounded-full p-0.5 focus:outline-none"
                  )
                }
              >
                <RadioGroup.Label as="span" className="sr-only">
                  {color.value}
                </RadioGroup.Label>
                <span
                  aria-hidden="true"
                  className={classNames(
                    color.bgColor,
                    "h-8 w-8 rounded-full border border-black border-opacity-10"
                  )}
                />
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>

        {helperText && (
          <p className="m-0 mt-2 text-sm text-gray-500" id={`${name}-description`}>
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

export default LabeledColorsField
