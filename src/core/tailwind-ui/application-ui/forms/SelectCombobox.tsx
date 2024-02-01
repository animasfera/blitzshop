import React, { useState, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { FieldInputProps } from "react-final-form"
import { Combobox } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid"

import { classNames } from "src/core/helpers/classNames"

export interface OptionComboboxField {
  value: string | number | null
  label: string
  description?: string | number
  img?: string | null
  disabled?: boolean
}

export interface ComboboxProps {
  format?: "value" | "object"
  name: string
  label?: string
  input?: FieldInputProps<any, HTMLElement>
  placeholder?: string
  selected?: OptionComboboxField | null
  required?: boolean
  disabled?: boolean
  options: OptionComboboxField[]
  // TODO: add multiple
  // multiple,
  helperText?: string
  error?: string
  showError?: boolean

  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">

  onChange?: (value: string | number) => void
}

export const SelectCombobox = React.forwardRef<HTMLSelectElement, ComboboxProps>((props, ref) => {
  const {
    format = "value",
    name,
    label,
    input,
    placeholder,
    selected,
    required,
    disabled,
    options,
    helperText,
    error,
    showError,

    outerProps,
    labelProps,

    onChange,
  } = props

  const { t } = useTranslation(["translation"])

  const [query, setQuery] = useState("")
  const [selectedOption, setSelectedOption] = useState<OptionComboboxField | null>(selected ?? null)

  const handleSelectedOption = (option: OptionComboboxField | null) => {
    setSelectedOption(option)
    !!input && !!option?.value && input?.onChange(option.value)
    onChange && !!option?.value && option.value !== "boolean" && onChange(option.value)
    setQuery("")
  }

  const selectedValue = options.find((o) => {
    if (selectedOption) {
      return o.value === selectedOption.value
    }

    return o.value === (format === "value" ? input?.value : input?.value?.value)
  })

  const filtered =
    query === ""
      ? options
      : options.filter((el) => {
          return el.label.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="relative mb-7" {...outerProps}>
      <Combobox
        as="div"
        value={selectedValue}
        onChange={(v) => {
          handleSelectedOption(v)
        }}
        ref={ref}
        name={name ?? input?.name}
        disabled={disabled}
      >
        {label && (
          <Combobox.Label
            className="block text-sm font-medium leading-6 text-gray-900"
            {...labelProps}
          >
            {label}
            {required && <span className="text-red-600">{required && " *"}</span>}
          </Combobox.Label>
        )}

        <div className="relative mt-2">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(el: OptionComboboxField) => el?.label}
            placeholder={placeholder ?? t("select")}
          />

          <Combobox.Button
            className={`
            absolute w-full h-8 inset-t-0 top-0 right-0 flex
            items-center rounded-r-md px-2 focus:outline-none
            ${disabled ? "cursor-no-drop" : "cursor-pointer"}
            ${
              showError
                ? `text-red-900 ring-red-300 focus:ring-red-500 focus-visible:ring-red-500
                      focus-visible:ring-red-500:focus-visible pr-10`
                : `text-gray-900 ring-gray-300 focus:ring-indigo-600
                      focus-visible:ring-indigo-600 focus-visible:ring-indigo-600:focus-visible`
            }
            `}
          >
            {showError && (
              <div
                className={`pointer-events-none absolute inset-t-0 flex items-center pr-3 right-5`}
              >
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            )}
            <span className="pointer-events-none absolute inset-t-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon
                className={`h-5 w-5 ${showError ? `text-red-500` : `text-gray-400`}`}
                aria-hidden="true"
              />
            </span>
          </Combobox.Button>

          {filtered.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filtered.map((option, index) => {
                const isCheck = option.value === selectedValue?.value

                return (
                  <Combobox.Option
                    key={`${index}-${option.value}`}
                    value={option}
                    className={() =>
                      classNames(
                        isCheck
                          ? "bg-indigo-600 text-white hover:bg-indigo-400"
                          : "text-gray-900 hover:text-indigo-600 hover:bg-gray-200",
                        `${
                          option.disabled ? "opacity-30 cursor-no-drop" : "cursor-pointer"
                        } relative select-none py-2 pl-3 pr-9`
                      )
                    }
                    disabled={option.disabled}
                  >
                    {() => (
                      <>
                        <div className="flex items-center">
                          {option.img && (
                            <Image
                              width={200}
                              height={200}
                              src={option.img} // ?? "#"
                              alt={option.label ?? ""}
                              className="h-5 w-5 mr-3 flex-shrink-0 rounded-full overflow-hidden object-cover"
                            />
                          )}

                          <span
                            className={classNames(
                              isCheck ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {option.label}
                          </span>
                          {option.description && (
                            <span
                              className={classNames(
                                isCheck ? "text-indigo-200" : "text-gray-500",
                                "ml-2 truncate"
                              )}
                            >
                              {option.description}
                            </span>
                          )}
                        </div>

                        {isCheck ? (
                          <span
                            className={classNames(
                              isCheck ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                )
              })}
            </Combobox.Options>
          )}

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
      </Combobox>
    </div>
  )
})

export default SelectCombobox
