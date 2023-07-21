import React, { ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { Box } from "@chakra-ui/react"
import { Select } from "@chakra-ui/select"
import { FormControl, FormLabel } from "@chakra-ui/form-control"

export interface LabeledSelectFieldProps extends ComponentPropsWithoutRef<typeof Select> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  help?: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "number"
  options: Array<{ label: string | number; value: string | number }>
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const LabeledSelectField = React.forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ name, type, label, help, options, fieldProps, outerProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: (v) => {
        return v
        // (v = type === "number" ? Number(v) : v)
      },
      format: (v) => {
        return v
      },
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const showError = touched && normalizedError
    const optionsHtml = options
      ? options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      : null

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>{label}</FormLabel>

        {optionsHtml ? (
          <Select {...input} onChange={input.onChange} disabled={submitting} {...props} ref={ref}>
            {optionsHtml}
          </Select>
        ) : (
          <Select {...input} onChange={input.onChange} disabled={submitting} {...props} ref={ref} />
        )}
        {help && (
          <Box color={"grey"} fontSize={"13px"} mt={1}>
            {help}
          </Box>
        )}

        {showError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
      </FormControl>
    )
  }
)
