import React, { useState, Fragment, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import Image from "next/image"
import { FieldInputProps } from "react-final-form"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid"

import { classNames } from "src/core/helpers/classNames"

export interface OptionSelectField {
  label: string
  value: string | number
  description?: string | number
  img?: string
}
export interface SelectProps {
  name: string
  label?: string
  input?: FieldInputProps<any, HTMLElement>
  placeholder?: string
  selected?: OptionSelectField | OptionSelectField[]
  defaultValue?: OptionSelectField
  required?: boolean
  disabled?: boolean
  options: OptionSelectField[]
  multiple?: boolean
  helperText?: string
  error?: string
  showError?: boolean

  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">

  handleChange?: (values: OptionSelectField | OptionSelectField[]) => void
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    name,
    label,
    input,
    placeholder,
    selected,
    defaultValue,
    required,
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
        value={selected}
        defaultValue={defaultValue}
        onChange={handleChange}
        multiple={multiple}
        disabled={disabled}
      >
        {({ open }) => (
          <>
            {label && (
              <Listbox.Label
                className="block text-sm font-medium leading-6 text-gray-900"
                {...labelProps}
              >
                {label}
                {required && <span className="text-red-600">{required && " *"}</span>}
              </Listbox.Label>
            )}
            <div className="relative mt-2">
              <Listbox.Button
                className={`
                  relative w-full cursor-default rounded-md bg-white py-1.5 pl-3
                  pr-10 text-left shadow-sm ring-1 ring-inset focus:ring-2
                  ${
                    showError
                      ? `text-red-900 ring-red-300 focus:ring-red-500 focus-visible:ring-red-500
                      focus-visible:ring-red-500:focus-visible pr-10`
                      : `text-gray-900 ring-gray-300 focus:ring-indigo-600
                      focus-visible:ring-indigo-600 focus-visible:ring-indigo-600:focus-visible`
                  }
                  `}
              >
                <span className="flex items-center">
                  {selected ? (
                    Array.isArray(selected) ? (
                      <ul className="flex gap-4">
                        {selected.map((el) => (
                          <li key={el.value} className="flex items-center">
                            {el?.img && (
                              <Image
                                src={el?.img}
                                alt={el?.label ?? ""}
                                className="h-4 w-4 mr-1 flex-shrink-0 rounded-full"
                              />
                            )}
                            <span className="block truncate">{el?.label}</span>
                            {el?.description && (
                              <span className="ml-1 truncate text-gray-500">{el?.description}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        {selected?.img && (
                          <Image
                            src={selected?.img}
                            alt={selected?.label ?? ""}
                            className="h-5 w-5 mr-3 flex-shrink-0 rounded-full"
                          />
                        )}
                        <span className="block truncate">{selected?.label}</span>
                        {selected?.description && (
                          <span className="ml-2 truncate text-gray-500">
                            {selected?.description}
                          </span>
                        )}
                      </>
                    )
                  ) : (
                    <span className={`truncate ${showError ? `text-red-300` : `text-gray-400`}`}>
                      {placeholder ?? "Выберите"}
                    </span>
                  )}
                </span>
                {showError && (
                  <div
                    className={`pointer-events-none absolute inset-y-0 flex items-center pr-3 right-5`}
                  >
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                )}
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className={`h-5 w-5 ${showError ? `text-red-500` : `text-gray-400`}`}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                ref={ref}
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            {option.img && (
                              <Image
                                src={option.img}
                                alt={option.label ?? ""}
                                className="h-5 w-5 mr-3 flex-shrink-0 rounded-full"
                              />
                            )}
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {option.label}
                            </span>
                            {option.description && (
                              <span
                                className={classNames(
                                  active ? "text-indigo-200" : "text-gray-500",
                                  "ml-2 truncate"
                                )}
                              >
                                {option.description}
                              </span>
                            )}
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
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
