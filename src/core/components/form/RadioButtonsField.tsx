import React, { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { Input } from "@chakra-ui/input"
import { Box, HStack, useRadioGroup } from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"

import { RadioCard } from "./RadioCard"

export interface RadioButtonsFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  help?: string
  options: Array<{ label: string | number; value: string | number }>
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
  boolean?: Boolean
}

export const RadioButtonsField = forwardRef<HTMLInputElement, RadioButtonsFieldProps>(
  ({ name, help, boolean, label, options, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: (v) => {
        return boolean ? !!Number(v) : v
      },
      format: (v) => {
        return boolean ? (typeof v === "string" ? v : v ? "1" : "0") : v
      },
      ...fieldProps,
    })

    options = options || []

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: name,
      // defaultValue: inputValue || input.value,
      defaultValue: props.value,
      onChange: (v) => {
        // setInputValue(v)
        input.onChange(v)
      },
    })

    const group = getRootProps()

    return (
      <FormControl {...outerProps} w={"100% !important"}>
        <FormLabel {...labelProps}>{label}</FormLabel>

        <HStack
          spacing={0}
          {...group}
          display={"flex"}
          justifyContent={["center", "left"]}
          w={"fit-content"}
        >
          {options.map((value, index) => {
            const radio = getRadioProps({ value: value.value })
            console.log(input.value)
            console.log(value.value)
            return (
              <RadioCard
                flexGrow={1}
                key={value.value}
                ref={ref}
                {...radio}
                isChecked={
                  typeof input.value !== "undefined"
                    ? input.value == value.value
                    : props.value == value.value
                }
                first={index === 0}
                last={index === options.length - 1}
              >
                {value.label}
              </RadioCard>
            )
          })}
        </HStack>
        {help && (
          <Box color={"grey"} fontSize={"13px"} mt={1}>
            {help}
          </Box>
        )}

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
      </FormControl>
    )
  }
)

export default RadioButtonsField
