import React, { ComponentPropsWithoutRef, ReactElement } from "react"
import { FieldInputProps } from "react-final-form"

export interface CheckboxProps {
  name: string
  label: string | ReactElement
  description?: string
  inlineDescription?: boolean
  input: FieldInputProps<any, HTMLElement>
  positionInput?: "rigth" | "left"
  defaultChecked?: boolean
  required?: boolean
  disabled?: boolean
  autoComplete?: string
  helperText?: string
  error?: string
  showError?: boolean
  outerProps?: ComponentPropsWithoutRef<"div">
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    name,
    label,
    description,
    inlineDescription,
    input,
    positionInput = "left",
    defaultChecked,
    required,
    disabled,
    autoComplete,
    helperText,
    error,
    showError,
    outerProps,
    labelProps,
  } = props

  return (
    <div
      // positionInput
      className={`
        relative flex gap-3 items-start
        ${positionInput === "left" && "flex-row"}
        ${positionInput === "rigth" && "flex-row-reverse"}
      `}
      {...outerProps}
    >
      <div className="relative flex h-6 items-center">
        <input
          {...props}
          {...input}
          ref={ref}
          id={name}
          name={name}
          type="checkbox"
          checked={input.checked}
          onChange={input.onChange}
          defaultChecked={defaultChecked}
          disabled={disabled}
          className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          autoComplete={autoComplete}
          aria-invalid="true"
          aria-describedby={`${name}-description`}
          required={required}
        />
      </div>
      <div className="text-sm leading-6">
        <div className={inlineDescription ? "flex gap-4" : ""}>
          <label
            htmlFor={name}
            className={`font-medium text-gray-900 ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            {...labelProps}
          >
            {label}
            {required && <span className="text-red-600">{required && " *"}</span>}
          </label>

          {description && (
            <p id="comments-description" className="text-gray-500">
              {description}
            </p>
          )}
        </div>

        {helperText && (
          <p id={`${name}-description`} className="m-0 mt-1 text-gray-500">
            {helperText}
          </p>
        )}

        {!showError && (
          <p id={`${name}-error`} role="alert" className="m-0 mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  )
})

export default Checkbox
