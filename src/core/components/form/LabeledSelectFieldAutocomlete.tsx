import React, { ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

import {
  OptionComboboxField,
  SelectCombobox,
} from "src/core/tailwind-ui/application-ui/forms/SelectCombobox"

export interface LabeledSelectFieldProps {
  format?: "value" | "object"
  name: string
  label?: string
  placeholder?: string
  selected?: OptionComboboxField
  required?: boolean
  disabled?: boolean
  options: OptionComboboxField[]
  // TODO: add multiple
  // multiple,
  helperText?: string
  errorText?: string

  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>

  handleChange?: (value: string | number) => void
}

export const LabeledSelectFieldAutocomlete = React.forwardRef<
  HTMLSelectElement,
  LabeledSelectFieldProps
>((props, ref) => {
  let {
    format = "value",
    name,
    label,
    placeholder,
    selected,
    required,
    disabled,
    options,
    helperText,
    errorText,

    outerProps,
    labelProps,
    fieldProps,

    handleChange,
  } = props

  const {
    input,
    meta: { touched, error, submitError, submitting },
  } = useField(name, {
    parse: (v) => {
      return format === "value" ? v : options.find((o) => o.value === v)
    },
    format: (v) => v,
    ...fieldProps,
  })

  const normalizedError = Array.isArray(error)
    ? error.join(", ")
    : error || submitError || errorText
  const showError = (touched && normalizedError) || !!errorText

  return (
    <SelectCombobox
      format={format}
      ref={ref}
      name={name}
      label={label}
      input={input}
      placeholder={placeholder}
      selected={selected}
      required={required}
      disabled={disabled || submitting}
      options={options}
      helperText={helperText}
      error={normalizedError}
      showError={showError}
      outerProps={outerProps}
      labelProps={labelProps}
      onChange={handleChange}
    />
  )
})

export default LabeledSelectFieldAutocomlete
