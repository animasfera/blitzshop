import { ReactNode, PropsWithoutRef } from "react"
import { formatZodError, validateZodSchema } from "blitz"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
export { FORM_ERROR } from "final-form"
import arrayMutators from "final-form-arrays"
import { z } from "zod"

import Autosave from "src/core/components/form/Autosave"
import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  fullBtn?: boolean
  styles?: string
  schema?: S
  getInstance?: any
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

  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
}

const validate = async (schema) => {
  const res = validateZodSchema(schema)
  return res
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  fullBtn,
  styles,
  schema,
  initialValues,
  getInstance,
  mutators,
  debug,
  showErrors,
  enableReinitialize,
  keepDirtyOnReinitialize,
  _autoSave,

  onSubmit,

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
          console.error(error)
          console.error(formatZodError(error))
          return formatZodError(error)
        }
      }}
      onSubmit={onSubmit}
      mutators={{
        ...mutators,
        ...arrayMutators,
      }}
      render={({ form, submitting, submitError, handleSubmit }) => {
        {
          getInstance && getInstance(form)
        }
        return (
          <form onSubmit={handleSubmit} className={`form w-full ${styles}`} {...props}>
            {_autoSave && (
              <Autosave setFieldData={form.mutators.setFieldData} save={form.submit()} />
            )}
            {/* form fields supplied as children are rendered here */}

            {children}

            {submitText || (showErrors !== false && submitError) ? (
              <div className="relative flex flex-col pb-8 border-t border-gray-200">
                {submitText && (
                  <div className="flex justify-end pt-6">
                    <Button
                      type={"submit"}
                      buttonText={submitText}
                      disabled={submitting}
                      styles={fullBtn ? "w-full justify-center" : ""}
                    />
                  </div>
                )}

                {showErrors !== false && submitError && (
                  <div
                    role="alert"
                    className="absolute top-[72px] text-sm text-red-500 self-center text-center"
                  >
                    {typeof submitError === "object"
                      ? JSON.stringify(submitError)
                      : submitError.replace("Error: ", "")}
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}

            {debug && <pre>{`JSON.stringify(values)`}</pre>}
          </form>
        )
      }}
    />
  )
}

export default Form
