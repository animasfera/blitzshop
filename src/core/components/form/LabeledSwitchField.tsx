import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

import { ToogleWithLabel } from "src/core/tailwind-ui/application-ui/forms/toogles/ToogleWithLabel"

interface LabeledSwitchFieldProps {
  name: string
  label: string
  description?: string

  type?: "simple" | "short"
  size?: "md" | "lg"
  position?: "right" | "left"
  inline?: boolean
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onIcon?: JSX.Element
  offIcon?: JSX.Element
  helperText?: string

  fieldProps?: UseFieldConfig<string>
  labelProps?: ComponentPropsWithoutRef<"label">
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>

  onChange?: (checked: boolean) => void
}

export const LabeledSwitchField = forwardRef<HTMLInputElement, LabeledSwitchFieldProps>(
  (props, ref) => {
    const {
      name,
      label,
      description,
      type,
      size,
      position,
      inline,
      checked,
      defaultChecked,
      disabled,
      onIcon,
      offIcon,
      helperText,
      fieldProps,
      labelProps,
      outerProps,
      onChange,
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
      <ToogleWithLabel
        name={name}
        label={label}
        input={input}
        description={description}
        type={type}
        size={size}
        position={position}
        inline={inline}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled || submitting}
        onIcon={onIcon}
        offIcon={offIcon}
        helperText={helperText}
        error={normalizedError}
        showError={showError}
        labelProps={labelProps}
        outerProps={outerProps}
        onChange={onChange}
      />
    )
  }
)

export default LabeledSwitchField

/*
example:

<LabeledSwitchField
  name={"name3"}
  label="ToogleWithLabel"
  description="ToogleWithLabel description description"
  checked={checked}
  onChange={setChecked}
  type="short"
  size="lg"
  position="left"
  inline
  offIcon={
    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 12 12">
      <path
        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  }
  onIcon={
    <svg className="h-4 w-4 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
    </svg>
  }
  helperText={"helperText"}
/>
*/
