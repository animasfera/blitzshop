import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

import { Input } from "src/core/tailwind-ui/application-ui/forms/Input"

export interface LabeledTextFieldProps {
  name: string
  label?: string
  // Field type. Doesn't include radio buttons and checkboxes
  type?: "text" | "password" | "email" | "number"
  placeholder?: string
  required?: boolean
  disabled?: boolean
  autoComplete?: string
  helperText?: string
  errorText?: string
  defaultValue?: string | number | boolean | null

  fieldProps?: UseFieldConfig<string>
  labelProps?: ComponentPropsWithoutRef<"label">
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>

  handleChange?: (values: any) => void
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  (props, ref) => {
    const {
      name,
      label,
      type,
      placeholder,
      required,
      disabled,
      autoComplete,
      helperText,
      errorText,
      defaultValue,

      fieldProps,
      labelProps,
      outerProps,
    } = props

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
    const showError = touched && normalizedError

    return (
      <Input
        name={name}
        label={label}
        input={input}
        type={type}
        placeholder={placeholder}
        defaultValue={typeof defaultValue === "boolean" || !defaultValue ? "" : defaultValue}
        required={required}
        disabled={disabled || submitting}
        autoComplete={autoComplete}
        helperText={helperText || errorText}
        error={normalizedError}
        showError={showError}
        outerProps={outerProps}
        labelProps={labelProps}
      />
    )
  }
)

export default LabeledTextField
