import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

import { Input } from "@chakra-ui/input"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Box, Textarea } from "@chakra-ui/react"

export interface LabeledTextareaFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  help?: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
  rows?: number
}

export const LabeledTextareaField = forwardRef<HTMLTextAreaElement, LabeledTextareaFieldProps>(
  ({ name, help, rows, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.inputMode === "numeric" || props.type === "number"
          ? (v) => (v === "" ? null : (Number(v) as any))
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>{label}</FormLabel>
        <Textarea {...input} disabled={submitting} {...props} ref={ref} rows={rows || 4} />
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

export default LabeledTextareaField
