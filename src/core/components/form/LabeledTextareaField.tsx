import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"

export interface LabeledTextareaFieldProps {
  name: string
  label: string
  // Field type. Doesn't include radio buttons and checkboxes
  type?: "text" | "number"
  placeholder?: string
  required?: boolean
  disabled?: boolean
  helperText?: string
  defaultValue?: string | number
  rows?: number

  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextareaField = forwardRef<HTMLTextAreaElement, LabeledTextareaFieldProps>(
  (props, ref) => {
    const {
      name,
      label,
      type,
      placeholder,
      required,
      disabled,
      helperText,
      defaultValue,
      rows,

      outerProps,
      fieldProps,
      labelProps,
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
      <div className="relative mb-7" {...outerProps}>
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
          {...labelProps}
        >
          {label}
          {required && <span className="text-red-600">{required && " *"}</span>}
        </label>
        <div className="mt-2 flex rounded-md shadow-sm relative mt-2 rounded-md shadow-sm">
          <textarea
            {...props}
            {...input}
            ref={ref}
            id={name}
            name={name}
            rows={rows ?? 4}
            className={`
            block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset
            ${
              showError
                ? `text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500
                focus-visible:ring-red-500 focus-visible:ring-red-500:focus-visible pr-10`
                : `text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600
                focus-visible:ring-indigo-600 focus-visible:ring-indigo-600:focus-visible`
            }
            `}
            placeholder={placeholder}
            value={input.value}
            defaultValue={defaultValue}
            disabled={disabled || submitting}
            aria-invalid="true"
            aria-describedby={`${name}-error`}
            required={required}
          />
          {showError && (
            <div
              className={"pointer-events-none absolute inset-y-0  flex items-center pr-3 right-0"}
            >
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
          )}
        </div>
        {helperText && (
          <p className="m-0 mt-1 text-sm text-gray-500" id={`${name}-description`}>
            {helperText}
          </p>
        )}
        {showError && (
          <p id={`${name}-error`} role="alert" className="absolute m-0 mt-1 text-sm text-red-600">
            {normalizedError}
          </p>
        )}
      </div>
    )
  }
)

export default LabeledTextareaField
