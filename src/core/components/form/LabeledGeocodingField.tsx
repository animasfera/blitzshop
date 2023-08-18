import React, { useState, forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useSession } from "@blitzjs/auth"
import { useField, UseFieldConfig } from "react-final-form"
import Geocode from "react-geocode"
import { useCombobox } from "downshift"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"

export interface LabeledGeocodingFieldProps {
  name: string
  label: string
  // Field type. Doesn't include radio buttons and checkboxes
  type?: "text" | "password" | "email" | "number"
  placeholder?: string
  required?: boolean
  disabled?: boolean
  helperText?: string

  fieldProps?: UseFieldConfig<string>
  labelProps?: ComponentPropsWithoutRef<"label">
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

const geocode = (address, callback) => {
  const response = {}
  Geocode.fromAddress(address).then(
    (response) => {
      callback(response.results)
    },
    (error) => {
      console.error(error)
    }
  )
}

export const LabeledGeocodingField = forwardRef<HTMLInputElement, LabeledGeocodingFieldProps>(
  (props, ref) => {
    const {
      name,
      label,
      type,
      placeholder,
      required,
      disabled,
      helperText,

      fieldProps,
      labelProps,
      outerProps,
    } = props

    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: (v) => {
        //@ts-ignore
        return props.format === "string" ? v.address : v
      },
      format: (v) => {
        //@ts-ignore
        return props.format === "string" ? v : v && (v?.formatted_address || v?.address)
      },
      ...fieldProps,
    })
    const session = useSession()
    const [geocodeResults, setGeocodeResults] = useState([])
    const [inputValue, setInputValue] = useState(input.value)

    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY!)
    Geocode.setLanguage(session?.user?.locale || "en")
    Geocode.setLocationType("ROOFTOP")

    const {
      isOpen,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      items: geocodeResults,
      itemToString: (item: any) => {
        return item ? String(item.formatted_address) : ""
      },
      initialInputValue: input.value,
      // @ts-ignore
      onSelectedItemChange: (action) => {
        if (action && action.selectedItem) {
          setInputValue(action.selectedItem.formatted_address)
          const value = {
            ...action.selectedItem.geometry.location,
            address: action.selectedItem.formatted_address,
            googlePlaceId: action.selectedItem.place_id,
            // viewport: action.selectedItem.geometry.viewport,
            countryCode:
              action.selectedItem.address_components.find((c) => c.types.indexOf("country") !== -1)
                ?.short_name || "",
          }
          console.log("onSelectedItemChange", value)
          input.onChange(value)
        }
      },
      onInputValueChange: ({ inputValue }) => {
        setInputValue(inputValue ? inputValue : "")
        if (inputValue) {
          geocode(inputValue, (response) => {
            setGeocodeResults(response)
          })
        }
      },
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
          {`${label}`}
          {required && <span className="text-red-600">{required && " *"}</span>}
        </label>

        <div {...getComboboxProps()}>
          <div className="mt-2 flex rounded-md shadow-sm relative mt-2 rounded-md shadow-sm">
            <input name={input.name} type={"hidden"} />
            <input
              {...props}
              {...getInputProps({ name: "", value: inputValue })}
              id={name}
              type={"search"}
              placeholder={placeholder}
              disabled={disabled || submitting}
              autoComplete={"new-password"}
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
              ${(disabled || submitting) && "cursor-not-allowed"}
              `}
              aria-invalid="true"
              aria-describedby={`${name}-error`}
              required={required}
            />
            {isOpen && (
              <div
                {...getMenuProps()}
                className={`
                downshift-dropdown bg-white gap-3 z-99 absolute rounded-b-xl overflow-hidden top-[37px]
                left-2/4 transform -translate-x-1/2 w-[98%] shadow-[0_0_20px_rgba(0,0,0,0.3)]
                `}
              >
                {geocodeResults.slice(0, 5).map((item, index) => (
                  <div
                    key={index}
                    {...getItemProps({ key: index, index, item })}
                    className={`dropdown-item px-[10px] py-2 cursor-pointer ${
                      highlightedIndex ? "bg-white" : "bg-gray-300"
                    }`}
                  >
                    {/*@ts-ignore*/}
                    {item.formatted_address}
                  </div>
                ))}
              </div>
            )}
            {showError && (
              <div className="pointer-events-none absolute inset-y-0 flex items-center pr-3 right-0">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            )}
          </div>
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

export default LabeledGeocodingField
