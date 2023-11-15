import queryString from "query-string"
import { useTranslation } from "react-i18next"

import { Form } from "src/core/components/form/Form"
import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"

interface AdminOrderFieldFormProps {
  name: string
  type: "number" | "string" | "boolean" | "select"
  value?: string | number | boolean | null
  isLoading: boolean
  onSuccess?: (values: any) => Promise<void>
}

export const AdminOrderFieldForm = (props: AdminOrderFieldFormProps) => {
  const { name, type, value, isLoading, onSuccess } = props

  const { t } = useTranslation(["translation"])

  let initialValues: any = {}
  let fieldName: string = name
  const parts = name.split(".")
  if (parts[0] && parts[1]) {
    initialValues[parts[0]] = {}
    initialValues[parts[0]][parts[1]] = value
    fieldName = `${parts[0]}[${parts[1]}]`
  } else {
    initialValues[name] = value
  }

  return (
    <Form
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          await onSuccess?.(values)
        } catch (error) {
          console.error(error)
        }
      }}
      styles={`flex justify-between items-center gap-1 xs:flex-col xs:items-start`}
    >
      {(type === "string" || type === "number") && (
        <LabeledTextField
          name={fieldName}
          type={type === "string" ? "text" : type}
          defaultValue={value}
          outerProps={{ className: "" }}
        />
      )}
      <Button
        variant={"link"}
        size={"sm"}
        type={"submit"}
        buttonText={t("save")}
        styles={"mt-1 pb-0"}
        disabled={isLoading}
      />
    </Form>
  )
}

export default AdminOrderFieldForm
