import React, { ComponentPropsWithoutRef, ReactElement, useEffect } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledCheckboxFieldProps {
  name: string
  label: string | ReactElement
  description?: string
  helperText?: string
  required?: boolean
  disabled?: boolean

  outerProps?: ComponentPropsWithoutRef<"div">
  fieldProps?: UseFieldConfig<string>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledCheckboxField = React.forwardRef<HTMLInputElement, LabeledCheckboxFieldProps>(
  (props, ref) => {
    const {
      name,
      label,
      helperText,
      required,
      disabled,

      outerProps,
      fieldProps,
      labelProps,
    } = props
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      type: "checkbox",
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const showError = touched && normalizedError

    return (
      <div className="relative flex items-start" {...outerProps}>
        <div className="relative flex h-6 items-center">
          <input
            ref={ref}
            id={name}
            aria-describedby={`${name}-description`}
            name={name}
            type="checkbox"
            checked={input.checked}
            onChange={input.onChange}
            disabled={disabled || submitting}
            className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 ${
              disabled || submitting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            required={required}
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label
            htmlFor={name}
            className={`font-medium text-gray-900 ${
              disabled || submitting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            {...labelProps}
          >
            {label}
            {required && <span className="text-red-600">{required && " *"}</span>}
          </label>

          {helperText && (
            <p id={`${name}-description`} className="m-0 mt-1 text-gray-500">
              {helperText}
            </p>
          )}

          {showError && (
            <p id={`${name}-error`} role="alert" className="m-0 mt-1 text-sm text-red-600">
              {normalizedError}
            </p>
          )}
        </div>
      </div>
    )
  }
)
