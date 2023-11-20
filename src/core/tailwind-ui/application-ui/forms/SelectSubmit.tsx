import React, {
  useState,
  Fragment,
  ComponentPropsWithoutRef,
  PropsWithoutRef,
  SetStateAction,
} from "react"
import Image from "next/image"
import { FieldInputProps } from "react-final-form"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"

import { classNames } from "src/core/helpers/classNames"
import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"

export interface SelectSubmitProps {
  name: string
  label?: string
  input?: FieldInputProps<any, HTMLElement>
  selected?: OptionSelectField
  defaultValue?: OptionSelectField
  disabled?: boolean
  options: OptionSelectField[]
  multiple?: boolean
  helperText?: string
  error?: string
  showError?: boolean

  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">

  handleChange?: (values: OptionSelectField) => void
}

export const SelectSubmit = React.forwardRef<HTMLSelectElement, SelectSubmitProps>((props, ref) => {
  const {
    name,
    label,
    input,
    selected,
    defaultValue,
    disabled,
    options,
    multiple,
    helperText,
    error,
    showError,

    outerProps,
    labelProps,

    handleChange,
  } = props

  return (
    <div className="relative mb-7" {...outerProps}>
      <Listbox
        {...input}
        ref={ref}
        name={name}
        value={selected}
        defaultValue={defaultValue}
        onChange={handleChange}
        multiple={multiple}
        disabled={disabled}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="sr-only" {...labelProps}>
              {label}
            </Listbox.Label>
            <div className="relative">
              <div
                className={`inline-flex divide-x rounded-md shadow-sm ${
                  disabled ? "divide-gray-300" : "divide-indigo-700"
                }`}
              >
                <div
                  className={`
                inline-flex items-center gap-x-1.5 rounded-l-md bg-indigo-600
                px-3 py-2 text-white shadow-sm ${disabled ? "bg-gray-400" : "bg-indigo-600"}
                `}
                >
                  {selected?.img && (
                    <Image
                      src={selected?.img ?? ""}
                      alt={selected?.label ?? ""}
                      width={200}
                      height={200}
                      className="h-5 w-5 flex-none rounded-md object-cover object-center"
                    />
                  )}

                  {selected && (
                    <p className="text-sm font-semibold whitespace-nowrap">{selected.label}</p>
                  )}
                </div>
                <Listbox.Button
                  className={`
                inline-flex items-center rounded-l-none rounded-r-md p-2
                ${
                  disabled
                    ? "cursor-no-drop bg-gray-400 hover:bg-gray-300"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }
                `}
                >
                  <span className="sr-only">Change published status</span>
                  <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </Listbox.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  // ring-1 ring-black ring-opacity-5
                  className="min-w-full absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg focus:outline-none"
                >
                  {options.map((option) => {
                    return (
                      <Listbox.Option
                        key={option.value + ""}
                        className={() =>
                          classNames(
                            selected?.value === option.value
                              ? "bg-indigo-600 text-white cursor-default"
                              : "text-gray-900 cursor-pointer",
                            "select-none p-2 text-sm"
                          )
                        }
                        value={option}
                      >
                        {(data) => {
                          return (
                            <div className="flex flex-row">
                              <div className="w-full flex justify-between">
                                <div className="flex gap-2">
                                  {option?.img && (
                                    <Image
                                      src={option?.img ?? ""}
                                      alt={option?.label ?? ""}
                                      width={200}
                                      height={200}
                                      className="h-5 w-5 flex-none rounded-md object-cover object-center"
                                    />
                                  )}

                                  <p
                                    className={
                                      selected?.value === option.value
                                        ? "font-semibold"
                                        : "font-normal"
                                    }
                                  >
                                    {option.label}
                                  </p>
                                </div>

                                {selected ? (
                                  <span
                                    className={
                                      selected.value === option.value
                                        ? "text-white"
                                        : "text-indigo-600"
                                    }
                                  >
                                    {selected.value === option.value && (
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                  </span>
                                ) : null}
                              </div>
                              <p
                                className={classNames(
                                  data.active ? "text-indigo-200" : "text-gray-500",
                                  "mt-2",
                                  "whitespace-nowrap"
                                )}
                              >
                                {option.description}
                              </p>
                            </div>
                          )
                        }}
                      </Listbox.Option>
                    )
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      {helperText && (
        <p className="m-0 mt-1 text-sm text-gray-500" id={`${name}-description`}>
          {helperText}
        </p>
      )}
      {showError && (
        <p id={`${name}-error`} role="alert" className="absolute m-0 mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
})

export default SelectSubmit
