import React, { useState, forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"

interface Option {
  label: string
  value: string | number
  description?: string | number
}

export interface LabeledRadioFieldProps {
  name: string
  label: string
  subtitle?: string
  type?: "string" | "number"
  placeholder?: string
  required?: boolean
  disabled?: boolean
  helperText?: string
  defaultValue?: Option
  options: Array<Option>

  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

// RadioButtonsField
export const LabeledRadioField = forwardRef<HTMLInputElement, LabeledRadioFieldProps>(
  (props, ref) => {
    const {
      name,
      label,
      subtitle,
      type,
      required,
      disabled,
      helperText,
      defaultValue,
      options,

      outerProps,
      fieldProps,
      labelProps,
    } = props
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: (v) => {
        return type === "number" ? Number(v) : v
      },
      format: (v) => {
        return type === "number" ? Number(v) : v
      },
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const showError = touched && normalizedError

    return (
      <div className="relative mb-7" {...outerProps}>
        <label
          className="block relative text-sm font-medium leading-6 text-gray-900"
          {...labelProps}
        >
          {label}
          {required && <span className="text-red-600">{required && " *"}</span>}
          {showError && (
            <div className="pointer-events-none absolute right-0 inset-y-0  flex items-center pr-3">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
          )}
        </label>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        <fieldset className="mt-2">
          <legend className="sr-only">{label}</legend>
          <div className="space-y-2">
            {options.map((option) => {
              console.log("option", option)

              return (
                <div key={option.value} className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      {...input}
                      id={`${name}-${option.value}`}
                      name="notification-method"
                      type="radio"
                      defaultChecked={
                        input.value === option.value || defaultValue?.value === option.value
                      }
                      checked={input.value === option.value}
                      className={`
                    block w-full border-0 p-1.5 ring-1 ring-inset focus:ring-inset focus:ring-2
                    ${
                      showError
                        ? `text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500
                        focus-visible:ring-red-500 focus-visible:ring-red-500:focus-visible pr-10`
                        : `text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600
                        focus-visible:ring-indigo-600 focus-visible:ring-indigo-600:focus-visible`
                    }
                    `}
                      aria-invalid="true"
                      aria-describedby={`${name}-error`}
                      disabled={disabled || submitting}
                      required={required}
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor={`${name}-${option.value}`}
                      className="font-medium text-gray-900"
                    >
                      {option.label}
                    </label>
                    {option?.description && (
                      <p id={`${name}-${option.value}-description`} className="text-gray-500 m-0">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </fieldset>

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

export default LabeledRadioField

/*
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>{label}</FormLabel>

        <Stack spacing={2} {...group}>
          {options.map((value, index) => {
            const radio = getRadioProps({ value: value.value })

            return (
              <Radio
                key={value.value}
                ref={ref}
                {...radio}
                isChecked={inputValue === value.value}
                // first={index === 0}
                // last={index === options.length - 1}
              >
                {value.label}
              </Radio>
            )
          })}
        </Stack>
        <Box color={"grey"} fontSize={"13px"} mt={1}>
          {help}
        </Box>

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
      </FormControl>
*/
