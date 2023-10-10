import { Switch } from "@headlessui/react"
import { FieldInputProps } from "react-final-form"

import { classNames } from "src/core/helpers/classNames"

interface ToogleProps {
  name: string
  input?: FieldInputProps<any, HTMLElement>
  type?: "simple" | "short"
  size?: "md" | "lg"
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onIcon?: JSX.Element
  offIcon?: JSX.Element

  onChange?: (checked: boolean) => void
}

export const Toogle = (props: ToogleProps) => {
  const {
    name,
    input,
    type = "simple",
    size = "md",
    checked,
    defaultChecked,
    disabled,
    onIcon,
    offIcon,

    onChange,
  } = props

  const typeSwitch = {
    simple: {
      switch: `transition-colors duration-200 ease-in-out`,
      md: {
        switch: "flex w-8 p-px ring-1 ring-inset ring-gray-900/5",
        span: {
          style: "h-4 w-4 shadow-sm ring-1 ring-gray-900/5",
          translate: "translate-x-3.5",
        },
      },
      lg: {
        switch: "relative inline-flex h-6 w-11 flex-shrink-0 border-2 border-transparent",
        span: {
          style: "h-5 w-5 pointer-events-none inline-block shadow ring-0",
          translate: "translate-x-5",
        },
      },
    },
    short: {
      switch: `group relative inline-flex flex-shrink-0 items-center justify-center`,
      md: {
        switch: `h-4 w-8`,
        span: {
          style: "",
          translate: "translate-x-3.5",
        },
      },
      lg: {
        switch: `h-5 w-10`,
        span: {
          style: "",
          translate: "translate-x-5",
        },
      },
    },
  }

  return (
    <Switch
      name={name}
      checked={checked ?? input?.checked}
      defaultChecked={defaultChecked}
      onChange={onChange ?? input?.onChange}
      className={classNames(
        checked ? "bg-indigo-600" : "bg-gray-200",
        `cursor-pointer rounded-full focus:outline-none
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600
        ${typeSwitch[type].switch} ${typeSwitch[type][size].switch}`
      )}
      disabled={disabled}
    >
      {type === "simple" && (
        <span
          aria-hidden="true"
          className={classNames(
            checked ? typeSwitch[type][size].span.translate : "translate-x-0",
            `bg-white transform rounded-full transition duration-200 ease-in-out
          ${typeSwitch[type][size].span.style}`
          )}
        >
          {offIcon && (
            <span
              className={classNames(
                checked ? "opacity-0 duration-100 ease-out" : "opacity-100 duration-200 ease-in",
                "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
              )}
              aria-hidden="true"
            >
              {offIcon}
            </span>
          )}
          {onIcon && (
            <span
              className={classNames(
                checked ? "opacity-100 duration-200 ease-in" : "opacity-0 duration-100 ease-out",
                "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
              )}
              aria-hidden="true"
            >
              {onIcon}
            </span>
          )}
        </span>
      )}

      {type === "short" && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-full w-full rounded-md bg-white"
          />
          <span
            aria-hidden="true"
            className={classNames(
              checked ? "bg-indigo-600" : "bg-gray-200",
              `pointer-events-none absolute mx-auto rounded-full
              transition-colors duration-200 ease-in-out
              ${size === "lg" ? "h-4 w-9" : "h-3 w-7"}
              `
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              checked ? typeSwitch[type][size].span.translate : "translate-x-0",
              `pointer-events-none absolute left-0 inline-block transform
              rounded-full border border-gray-200 bg-white shadow ring-0
              transition-transform duration-200 ease-in-out
              ${size === "lg" ? "h-5 w-5" : "h-4 w-4"}`
            )}
          >
            {offIcon && (
              <span
                className={classNames(
                  checked ? "opacity-0 duration-100 ease-out" : "opacity-100 duration-200 ease-in",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                )}
                aria-hidden="true"
              >
                {offIcon}
              </span>
            )}
            {onIcon && (
              <span
                className={classNames(
                  checked ? "opacity-100 duration-200 ease-in" : "opacity-0 duration-100 ease-out",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                )}
                aria-hidden="true"
              >
                {onIcon}
              </span>
            )}
          </span>
        </>
      )}
    </Switch>
  )
}

export default Toogle

/*
example:

<Toogle
  checked={checked}
  onChange={setChecked}
  type="short"
  size="lg"
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
/>
*/
