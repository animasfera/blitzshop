import React, { ComponentPropsWithoutRef, ReactElement } from "react"
import { useField, UseFieldConfig } from "react-final-form"

import { Checkbox } from "src/core/tailwind-ui/application-ui/forms/Checkbox"

export interface LabeledCheckboxFieldProps {
  name: string
  label: string | ReactElement
  description?: string
  inlineDescription?: boolean
  positionInput?: "rigth" | "left"
  defaultChecked?: boolean
  helperText?: string
  required?: boolean
  disabled?: boolean
  autoComplete?: string
  outerProps?: ComponentPropsWithoutRef<"div">
  fieldProps?: UseFieldConfig<string>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledCheckboxField = React.forwardRef<HTMLInputElement, LabeledCheckboxFieldProps>(
  (props, ref) => {
    const {
      name,
      label,
      description,
      inlineDescription,
      positionInput,
      defaultChecked,
      helperText,
      required,
      disabled,
      autoComplete,
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
      <Checkbox
        name={name}
        label={label}
        description={description}
        inlineDescription={inlineDescription}
        input={input}
        positionInput={positionInput}
        defaultChecked={defaultChecked}
        required={required}
        disabled={disabled || submitting}
        autoComplete={autoComplete}
        helperText={helperText}
        error={normalizedError}
        showError={showError}
        outerProps={outerProps}
        labelProps={labelProps}
      />
    )
  }
)
