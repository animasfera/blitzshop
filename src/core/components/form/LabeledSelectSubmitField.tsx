import React, { ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { SelectSubmit } from "src/core/tailwind-ui/application-ui/forms/SelectSubmit"

export interface LabeledSelectFieldProps {
  name: string
  label?: string
  selected?: OptionSelectField
  defaultValue?: OptionSelectField
  disabled?: boolean
  options: OptionSelectField[]
  multiple?: boolean
  helperText?: string

  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>

  handleChange?: (values: OptionSelectField | OptionSelectField[]) => void
}

export const LabeledSelectSubmitField = React.forwardRef<
  HTMLSelectElement,
  LabeledSelectFieldProps
>((props, ref) => {
  const {
    name,
    label,
    selected,
    defaultValue,
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
    <SelectSubmit
      ref={ref}
      name={name}
      label={label}
      input={input}
      selected={selected}
      defaultValue={defaultValue}
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
})

export default LabeledSelectSubmitField
