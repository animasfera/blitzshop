import { ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { FieldInputProps } from "react-final-form"
import { Switch } from "@headlessui/react"

import { Toogle } from "src/core/tailwind-ui/application-ui/forms/toogles/Toogle"

interface ToogleWithLabelProps {
  name: string
  label: string
  input?: FieldInputProps<any, HTMLElement>
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
  error?: string
  showError?: boolean

  labelProps?: ComponentPropsWithoutRef<"label">
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>

  onChange?: (checked: boolean) => void
}

export const ToogleWithLabel = (props: ToogleWithLabelProps) => {
  const {
    name,
    label,
    input,
    description,
    type,
    size,
    position = "right",
    inline,
    checked,
    defaultChecked,
    disabled,
    onIcon,
    offIcon,
    helperText,
    error,
    showError,
    labelProps,
    outerProps,
    onChange,
  } = props

  return (
    <div className="relative mb-7" {...outerProps}>
      <Switch.Group
        as="div"
        className={`flex items-center justify-between ${
          position === "left" ? "flex-row-reverse gap-3" : "flex-row"
        }`}
        {...outerProps}
      >
        <span className={`flex flex-grow ${inline ? "flex-row items-center gap-x-2" : "flex-col"}`}>
          <Switch.Label
            as="span"
            className="text-sm font-medium leading-6 text-gray-900"
            passive
            {...labelProps}
          >
            {label}
          </Switch.Label>
          {description && (
            <Switch.Description as="span" className="text-sm text-gray-500">
              {description}
            </Switch.Description>
          )}
        </span>

        <Toogle
          name={name}
          input={input}
          type={type}
          size={size}
          checked={checked ?? input?.checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onIcon={onIcon}
          offIcon={offIcon}
          onChange={onChange ?? input?.onChange}
        />
      </Switch.Group>

      {helperText && <p className="m-0 mt-1 text-sm text-gray-500">{helperText}</p>}

      {showError && error && (
        <p id={`${name}-error`} role="alert" className="absolute m-0 mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default ToogleWithLabel
