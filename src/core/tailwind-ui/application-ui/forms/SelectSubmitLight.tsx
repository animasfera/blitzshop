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
import { SelectSubmitProps } from "./SelectSubmit"

export const SelectSubmitLight = React.forwardRef<HTMLSelectElement, SelectSubmitProps>(
  (props, ref) => {
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
              <Listbox.Button
                className={`
                shadow-none
                 rounded-md
                inline-flex items-center
                              ${disabled ? "cursor-no-drop bg-gray-400 " : "hover:bg-gray-100"}
                `}
              >
                <Listbox.Label className="sr-only" {...labelProps}>
                  {label}
                </Listbox.Label>
                <div className="relative">
                  <div
                    className={`shadow-none inline-flex divide-x ${
                      disabled ? "divide-gray-300" : "divide-indigo-700"
                    }`}
                  >
                    <div
                      className={`
                inline-flex items-center gap-x-1.5
                px-3 py-2 text-indigo-600 shadow-sm ${disabled ? "bg-gray-200" : "bg-white-100"}
                `}
                    >
                      {selected?.img ? (
                        <Image
                          src={selected?.img ?? ""}
                          alt={selected?.label ?? ""}
                          width={200}
                          height={200}
                          className="h-5 w-5 flex-none rounded-md object-cover object-center"
                        />
                      ) : (
                        <></>
                      )}

                      {selected && <p className="text-sm font-semibold">{selected.label}</p>}
                    </div>
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
                      className="min-w-full absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg focus:outline-none "
                    >
                      {options.map((option) => {
                        return (
                          <Listbox.Option
                            key={option.label}
                            className={() =>
                              classNames(
                                selected?.value === option.value
                                  ? "bg-indigo-600 text-white cursor-default"
                                  : "text-gray-900 cursor-pointer  ",
                                "select-none p-2 text-sm"
                              )
                            }
                            value={option}
                          >
                            {(data) => {
                              return (
                                <div className="flex flex-row ">
                                  <div className="w-full flex justify-center text-left">
                                    <div className="flex gap-2 ">
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
                                            : "text-gray-600"
                                        }
                                      ></span>
                                    ) : null}
                                  </div>
                                  <p
                                    className={classNames(
                                      data.active ? "text-gray-200" : "text-gray-500",
                                      "mt-2"
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
              </Listbox.Button>
            </>
          )}
        </Listbox>

        {helperText && (
          <p className="m-0 mt-1 text-sm text-gray-500 " id={`${name}-description`}>
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
  }
)

export default SelectSubmitLight
