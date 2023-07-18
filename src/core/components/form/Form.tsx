import { ReactNode, PropsWithoutRef } from "react"
import { formatZodError, validateZodSchema } from "blitz"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
export { FORM_ERROR } from "final-form"
import arrayMutators from "final-form-arrays"
import { z } from "zod"
import { Button } from "@chakra-ui/react"

import Autosave from "./Autosave"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  getInstance?: any
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  game?: any
  mutators?: any
  debug?: boolean
  params?: any
  showErrors?: boolean
  _onChange?: any
  enableReinitialize?: boolean
  keepDirtyOnReinitialize?: boolean
  _autoSave?: boolean
  [key: string]: any
}

const validate = async (schema) => {
  const res = validateZodSchema(schema)
  return res
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  getInstance,
  mutators,
  debug,
  showErrors,
  enableReinitialize,
  keepDirtyOnReinitialize,
  _autoSave,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      enableReinitialize={typeof enableReinitialize === "undefined" ? true : enableReinitialize}
      keepDirtyOnReinitialize={
        typeof keepDirtyOnReinitialize === "undefined" ? true : keepDirtyOnReinitialize
      }
      initialValues={initialValues}
      validate={(values) => {
        try {
          schema?.parse(values)
        } catch (error) {
          console.log(error)
          console.log(formatZodError(error))
          return formatZodError(error)
        }
      }}
      onSubmit={onSubmit}
      mutators={{
        ...mutators,
        ...arrayMutators,
      }}
      render={({ form, handleSubmit, submitting, submitError, values }) => {
        {
          getInstance && getInstance(form)
        }
        return (
          <form onSubmit={handleSubmit} className="form" {...props} style={{ width: "100%" }}>
            {_autoSave && (
              <Autosave setFieldData={form.mutators.setFieldData} save={form.submit()} />
            )}
            {/* form fields supplied as children are rendered here */}
            {children}

            {showErrors !== false && submitError && (
              <div role="alert" style={{ color: "red" }}>
                {typeof submitError === "object"
                  ? JSON.stringify(submitError)
                  : submitError.replace("Error: ", "")}
              </div>
            )}

            {submitText && (
              <Button type="submit" disabled={submitting}>
                {submitText}
              </Button>
            )}

            {debug && <pre>{JSON.stringify(values)}</pre>}
          </form>
        )
      }}
    />
  )
}

export default Form
