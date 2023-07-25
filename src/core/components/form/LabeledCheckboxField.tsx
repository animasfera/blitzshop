import React, { ComponentPropsWithoutRef, ReactElement } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { Box, Checkbox } from "@chakra-ui/react"

export interface LabeledCheckboxFieldProps extends ComponentPropsWithoutRef<"input"> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string | ReactElement
  value?: string
  help?: string
  outerProps?: ComponentPropsWithoutRef<"div">
  fieldProps?: UseFieldConfig<string>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledCheckboxField = React.forwardRef<HTMLInputElement, LabeledCheckboxFieldProps>(
  (
    { name, help, value, checked, label, outerProps, fieldProps, labelProps, className, ...props },
    ref
  ) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      type: "checkbox",
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const showError = touched && normalizedError

    return (
      <Box {...outerProps}>
        <Box>
          <Checkbox
            isChecked={input.checked}
            type={"checkbox"}
            disabled={submitting}
            ref={ref}
            onChange={input.onChange}
            style={{ marginRight: "5px" }}
          >
            {label}
          </Checkbox>

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
        </Box>
      </Box>
    )
  }
)
