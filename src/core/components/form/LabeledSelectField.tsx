import React, { ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

import { OptionSelectField, Select } from "src/core/tailwind-ui/application-ui/forms/Select"

export interface LabeledSelectFieldProps {
  format?: "value" | "object"
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

  handleChange?: (value: string | number) => void
}

export const LabeledSelectField = React.forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  (props, ref) => {
    let {
      format = "value",
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
      parse: (v) => {
        console.log(v)
        return format === "value" ? v : options.find((o) => o.value === v)
      },
      format: (v) => v,
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const showError = touched && normalizedError

    selected = options.find((o) => {
      console.log(input.value, name)
      return (
        o.value ===
        (format === "value"
          ? input.value
          : //@ts-ignore
            input.value?.value)
      )
    })

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
        onChange={handleChange}
      />
    )
  }
)

export default LabeledSelectField
