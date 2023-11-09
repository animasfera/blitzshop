import React, {
  useState,
  forwardRef,
  ComponentPropsWithoutRef,
  PropsWithoutRef,
  ReactElement,
} from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { RadioGroup } from "@headlessui/react"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"

import { RadioSelectedCard } from "./RadioSelectedCard"

export interface OptionRadioSelectedCard {
  label: string
  value: string | number
  description?: string | ReactElement
  footerText?: string | ReactElement
}

export interface RadioSelectedCardsFieldProps {
  name: string
  label: string
  required?: boolean
  disabled?: boolean
  helperText?: string
  defaultValue?: OptionRadioSelectedCard
  options: Array<OptionRadioSelectedCard>

  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const RadioSelectedCardsField = forwardRef<HTMLInputElement, RadioSelectedCardsFieldProps>(
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

    const [selected, setSelected] = useState<OptionRadioSelectedCard | undefined>(
      defaultValue || undefined
    )

    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: (v) => v,
      format: (v) => v,
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const showError = touched && normalizedError

    return (
      <div className="relative mb-7" {...outerProps}>
        <RadioGroup
          ref={ref}
          value={options.find((o) => o.value === input.value)}
          onChange={(v) => {
            // setSelected(options.find((o) => o.value === v.value))
            input?.onChange(v.value)
          }}
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

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
            {options.map((option) => (
              <RadioSelectedCard key={option.value} option={option} disabled={disabled} />
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

export default RadioSelectedCardsField
