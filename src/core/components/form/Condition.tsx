import { Field } from "react-final-form"

export const Condition = (props) => {
  const { when, is, not, defined, children } = props
  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => {
        let cond: boolean
        if (defined) {
          cond = !!value
        } else {
          cond = typeof not === "undefined" ? value === is : value !== not
        }

        return cond ? children : null
      }}
    </Field>
  )
}
