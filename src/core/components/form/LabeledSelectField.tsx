import React, { ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

import { OptionSelectField, Select } from "src/core/tailwind-ui/application-ui/forms/Select"

export interface LabeledSelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  selected?: OptionSelectField | OptionSelectField[]
  defaultValue?: OptionSelectField
  required?: boolean
  disabled?: boolean
  options: OptionSelectField[]
  multiple?: boolean
  helperText?: string

  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>

  handleChange?: (values: OptionSelectField | OptionSelectField[]) => void
}

export const LabeledSelectField = React.forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  (props, ref) => {
    const {
      name,
      label,
      placeholder,
      selected,
      defaultValue,
      required,
      disabled,
      options,
      multiple,
      helperText,

      outerProps,
      labelProps,
      fieldProps,

      handleChange,
    } = props

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
      <Select
        ref={ref}
        name={name}
        label={label}
        input={input}
        placeholder={placeholder}
        selected={selected}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled || submitting}
        options={options}
        multiple={multiple}
        helperText={helperText}
        error={normalizedError}
        showError={showError}
        outerProps={outerProps}
        labelProps={labelProps}
        handleChange={handleChange}
      />
    )
  }
)

export default LabeledSelectField
