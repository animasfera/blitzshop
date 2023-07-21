import React, { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { Input } from "@chakra-ui/input"
import { Box, Radio, Stack, useRadioGroup } from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"

export interface RadioButtonsFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  type: "string" | "number"
  options: Array<{ label: string | number; value: string | number }>
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const RadioButtonsField = forwardRef<HTMLInputElement, RadioButtonsFieldProps>(
  ({ name, type, help, label, options, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: (v) => {
        return type === "number" ? Number(v) : v
      },
      format: (v) => {
        return type === "number" ? Number(v) : v
      },
      ...fieldProps,
    })

    options = options || []

    const [inputValue, setInputValue] = React.useState(input.value)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    /** Events */
    let inputOnChange = (event) => {
      setInputValue(event.target.value)
      if (!event.target.value) {
        return
      }
    }

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: name,
      defaultValue: inputValue || props.value,
      onChange: (v) => {
        setInputValue(v)
        input.onChange(v)
      },
    })

    const group = getRootProps()

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>{label}</FormLabel>

        <Stack spacing={2} {...group}>
          {options.map((value, index) => {
            const radio = getRadioProps({ value: value.value })

            return (
              <Radio
                key={value.value}
                ref={ref}
                {...radio}
                isChecked={inputValue === value.value}
                // first={index === 0}
                // last={index === options.length - 1}
              >
                {value.label}
              </Radio>
            )
          })}
        </Stack>
        <Box color={"grey"} fontSize={"13px"} mt={1}>
          {help}
        </Box>

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
