import { useTranslation } from "react-i18next"

import { Form } from "src/core/components/form/Form"
import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"

interface AdminOrderListItemSectionListItemFormProps {
  name: string
  value?: string
  isLoading: boolean
  onSuccess?: (values: any) => Promise<void>
}

export const AdminOrderListItemSectionListItemForm = (
  props: AdminOrderListItemSectionListItemFormProps
) => {
  const { name, value, isLoading, onSuccess } = props

  const { t } = useTranslation(["translation"])

  let initialValues = {}
  initialValues[name] = value

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
      <LabeledTextField
        name={name}
        type={"text"}
        defaultValue={value ?? undefined}
        outerProps={{ className: "" }}
      />
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

export default AdminOrderListItemSectionListItemForm
