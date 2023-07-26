import React, { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useSession } from "@blitzjs/auth"
import { useField, UseFieldConfig } from "react-final-form"
import { Input } from "@chakra-ui/input"
import { Box, Stack } from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import Geocode from "react-geocode"
import { useCombobox } from "downshift"

export interface LabeledGeocodingFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  locale: string
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
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
  ({ name, locale, help, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
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
    const [geocodeResults, setGeocodeResults] = React.useState([])
    const [inputValue, setInputValue] = React.useState(input.value)

    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY!)
    Geocode.setLanguage(session?.user?.locale || "en")
    Geocode.setLocationType("ROOFTOP")

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    /** Events */
    let inputOnChange = (event) => {
      setInputValue(event.target.value)
      if (!event.target.value) {
        return
      }
    }

    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      //@ts-ignore
      getComboboxProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useCombobox({
      items: geocodeResults,
      // stateReducer,
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

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>{label}</FormLabel>

        <div {...getComboboxProps()}>
          <div style={{ position: "relative" }}>
            {/* @ts-ignore */}
            {/*{...getInputProps({ name: input.name, ref: ref, value: inputValue })}*/}
            <Input name={input.name} type={"hidden"} />
            <Input
              {...getInputProps({ name: "", value: inputValue })}
              {...props}
              type={"search"}
              disabled={submitting}
              autoComplete={"new-password"}
            />
            {isOpen ? (
              <Stack
                {...getMenuProps()}
                bg={"white"}
                spacing={3}
                zIndex={99}
                className="downshift-dropdown"
                color={"black"}
                position={"absolute"}
                w={"98%"}
                borderBottomLeftRadius={5}
                borderBottomRightRadius={5}
                overflowX={"hidden"}
                overflowY={"hidden"}
                style={{ left: "50%", transform: "translateX(-50%)", top: "41px" }}
                boxShadow={"0 0 20px rgba(0,0,0,.3)"}
              >
                {geocodeResults.slice(0, 5).map((item, index) => (
                  <Box
                    pl={"10px"}
                    pt={2}
                    pb={2}
                    pr={"10px"}
                    className="dropdown-item"
                    //@ts-ignore
                    key={index}
                    {...getItemProps({ key: index, index, item })}
                    style={{
                      backgroundColor: highlightedIndex === index ? "lightgray" : "white",
                    }}
                    cursor={"pointer"}
                  >
                    {/*@ts-ignore*/}
                    {item.formatted_address}
                  </Box>
                ))}
              </Stack>
            ) : null}
          </div>
          {/*)}*/}
          {help && (
            <Box color={"grey"} fontSize={"13px"} mt={1}>
              {help}
            </Box>
          )}
        </div>
        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
      </FormControl>
    )
  }
)

export default LabeledGeocodingField
