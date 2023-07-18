import React from "react"
import { FormSpy } from "react-final-form"

const AutoSave = (props) => {
  let promise
  const save = async (blurredField) => {
    const { values, setFieldData, save } = props

    if (promise) {
      await promise
    }

    setFieldData(blurredField, { saving: true })
    promise = save(values)
    await promise
    promise = null
    setFieldData(blurredField, { saving: false })
  }

  return null
}

const FormAutoSave = (props) => (
  <FormSpy {...props} subscription={{ active: true, values: true }} component={AutoSave} />
)

export default FormAutoSave
