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
          if (typeof is === "object" && Array.isArray(is)) {
            cond = is.indexOf(value) !== -1
          } else if (typeof not === "object" && Array.isArray(not)) {
            cond = not.indexOf(value) === -1
          } else {
            cond = typeof not === "undefined" ? value === is : value !== not
          }
        }

        return cond ? children : null
      }}
    </Field>
  )
}
