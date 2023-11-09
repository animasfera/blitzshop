import { useState, useEffect, forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { FieldInputProps } from "react-final-form"
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"

export interface InputProps {
  name: string
  label?: string
  input: FieldInputProps<any, HTMLElement>
  // Field type. Doesn't include radio buttons and checkboxes
  type?: "text" | "password" | "email" | "number"
  placeholder?: string
  defaultValue?: string | number
  required?: boolean
  disabled?: boolean
  autoComplete?: string
  helperText?: string
  error?: string
  showError?: boolean

  labelProps?: ComponentPropsWithoutRef<"label">
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    name,
    label,
    input,
    type = "text",
    placeholder,
    defaultValue,
    required,
    disabled,
    autoComplete,
    helperText,
    error,
    showError,

    labelProps,
    outerProps,
  } = props

  const [isShowPass, setShowPass] = useState(false)

  useEffect(() => {
    if (disabled) {
      setShowPass(false)
    }
  }, [disabled])

  return (
    <div className="relative mb-7" {...outerProps}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis"
          {...labelProps}
        >
          {`${label}`}
          {required && <span className="text-red-600">{required && " *"}</span>}
        </label>
      )}
      <div className="mt-2 flex rounded-md shadow-sm relative mt-2 rounded-md shadow-sm">
        <input
          {...props}
          {...input}
          ref={ref}
          type={isShowPass ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={input.value}
          defaultValue={defaultValue}
          disabled={disabled}
          id={name}
          className={`
            block w-full border-0 p-1.5 ring-1 ring-inset focus:ring-inset focus:ring-2
            ${type === "password" ? "rounded-s-md" : "rounded-md"}
            ${
              showError
                ? `text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500
                focus-visible:ring-red-500 focus-visible:ring-red-500:focus-visible pr-10`
                : `text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600
                focus-visible:ring-indigo-600 focus-visible:ring-indigo-600:focus-visible`
            }
            `}
          autoComplete={autoComplete}
          aria-invalid="true"
          aria-describedby={`${name}-error`}
          required={required}
        />
        {showError && (
          <div
            className={`
            pointer-events-none absolute inset-y-0  flex items-center pr-3
            ${type === "password" ? "right-10" : "right-0"}`}
          >
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
        {type === "password" && (
          <button
            type="button"
            className={`
              relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md
              px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-rigth-0 ring-inset
              ring-gray-300 hover:bg-gray-100 focus:ring-inset focus:ring-2
              focus-visible:ring-indigo-600
              ${
                showError &&
                `text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500
                focus-visible:ring-red-500 focus-visible:ring-red-500:focus-visible`
              }
              `}
            onClick={() => setShowPass(!isShowPass)}
            disabled={disabled}
          >
            {isShowPass ? (
              <EyeIcon
                className={`-ml-0.5 h-5 w-5 text-gray-400
                ${showError && `text-red-500`}`}
                aria-hidden="true"
              />
            ) : (
              <EyeSlashIcon
                className={`-ml-0.5 h-5 w-5 text-gray-400
                ${showError && `text-red-500`}`}
                aria-hidden="true"
              />
            )}
          </button>
        )}
      </div>
      {helperText && (
        <p className="m-0 mt-1 text-sm text-gray-500" id={`${name}-description`}>
          {helperText}
        </p>
      )}
      {showError && error && (
        <p id={`${name}-error`} role="alert" className="absolute m-0 mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
})

export default Input
