import { useState, forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"
import { CurrencyEnum } from "db"

import { CurrenciesEnum } from "src/core/enums/CurrenciesEnum"

export interface LabeledСurrencyFieldProps {
  name: string
  label: string
  // Field type. Doesn't include radio buttons and checkboxes
  type?: "text" | "number"
  isSelect?: boolean
  currency?: CurrencyEnum
  placeholder?: string
  required?: boolean
  disabled?: boolean
  helperText?: string
  defaultValue?: string | number
  fieldProps?: UseFieldConfig<string>
  labelProps?: ComponentPropsWithoutRef<"label">
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledСurrencyField = forwardRef<HTMLInputElement, LabeledСurrencyFieldProps>(
  (props, ref) => {
    const {
      name,
      label,
      type,
      isSelect,
      currency,
      placeholder,
      required,
      disabled,
      helperText,
      defaultValue,
      fieldProps,
      labelProps,
      outerProps,
    } = props

    const [currencyValue, setCurrencyValue] = useState<CurrencyEnum>(currency ?? CurrencyEnum.USD)

    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div className="relative mb-7" {...outerProps}>
        <label
          {...labelProps}
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {`${label}`}
          {required && <span className="text-red-600">{required && " *"}</span>}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className={`${touched && normalizedError ? `text-red-400` : `text-gray-500`}`}>
              {CurrenciesEnum[`${currencyValue}`].symbol}
            </span>
          </div>
          <input
            {...props}
            {...input}
            ref={ref}
            type={type ?? "text"}
            name={name}
            id={name}
            className={`
            block w-full border-0 p-1.5 ring-1 ring-inset focus:ring-inset focus:ring-2
            rounded-md py-1.5 pl-7 pr-20
            ${
              touched && normalizedError
                ? `text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500
                focus-visible:ring-red-500 focus-visible:ring-red-500:focus-visible pr-10`
                : `text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600
                focus-visible:ring-indigo-600 focus-visible:ring-indigo-600:focus-visible`
            }
            `}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disabled || submitting}
            aria-invalid="true"
            aria-describedby={`${name}-error`}
            required={required}
          />
          {touched && normalizedError && (
            <div className="pointer-events-none absolute inset-y-0  flex items-center pr-3 right-20">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
          )}
          {isSelect ? (
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor={`${name}-currency`} className="sr-only">
                Currency
              </label>
              <select
                id={`${name}-currency`}
                name={`${name}-currency`}
                defaultValue={currencyValue}
                className={`
              h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500
              focus:ring-2 focus:ring-inset focus:ring-indigo-600
              ${
                touched && normalizedError
                  ? `text-red-400 ring-red-300 focus:ring-red-500
                focus-visible:ring-red-500 focus-visible:ring-red-500:focus-visible`
                  : `text-gray-500 ring-gray-300 focus:ring-indigo-600
                  focus-visible:ring-indigo-600 focus-visible:ring-indigo-600:focus-visible`
              }`}
                onChange={(evt) => {
                  const value: CurrencyEnum | null = CurrencyEnum[`${evt.target.value}`] ?? null

                  if (value) {
                    setCurrencyValue(value)
                  }
                }}
              >
                {Object.values(CurrenciesEnum).map((currency) => (
                  <option key={currency.name} value={currency.name}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500" id={`${name}-price-currency`}>
                {currencyValue}
              </span>
            </div>
          )}
        </div>
        {helperText && (
          <p className="m-0 mt-1 text-sm text-gray-500" id={`${name}-description`}>
            {helperText}
          </p>
        )}
        {touched && normalizedError && (
          <p id={`${name}-error`} role="alert" className="absolute m-0 mt-1 text-sm text-red-600">
            {normalizedError}
          </p>
        )}
      </div>
    )
  }
)

export default LabeledСurrencyField
