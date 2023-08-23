import { Button } from "@chakra-ui/react"
import { TransactionStatusEnum } from "@prisma/client"

import { Form, FORM_ERROR } from "src/core/components/form/Form"
import LabeledTextareaField from "src/core/components/form/LabeledTextareaField"
import { Condition } from "src/core/components/form/Condition"
import LabeledTextField from "src/core/components/form/LabeledTextField"
import LabeledRadioField from "src/core/components/form/LabeledRadioField"

type TransactionStatusFormProps = {
  status: string
  options: { label: string; value: string }[]
  onSubmit?: Function
  onCancel?: Function
}

export const TransactionStatusForm = (props: TransactionStatusFormProps) => {
  const { status, options, onSubmit, onCancel } = props
  return (
    <Form
      // submitText="Сохранить"
      initialValues={{ status: status }}
      onSubmit={async (values) => {
        try {
          onSubmit && onSubmit(values)
        } catch (error: any) {
          return {
            [FORM_ERROR]: "Ошибка",
          }
        }
      }}
    >
      <LabeledRadioField name="status" label="Новый статус" options={options} />

      <Condition when={"status"} is={TransactionStatusEnum.FAILED}>
        <LabeledTextareaField
          name={"failReason"}
          label={"Причина неудачной транзакции"}
          placeholder={"Причина"}
        />
      </Condition>
      <Condition when={"status"} is={TransactionStatusEnum.CANCELED}>
        <LabeledTextareaField name={"fail"} label={"Причина отмены"} placeholder={"Причина"} />
      </Condition>
      <Condition when={"status"} is={TransactionStatusEnum.PAYING}>
        <LabeledTextField
          name={"remoteTransactionId"}
          label={"ID удаленной транзакции"}
          placeholder={""}
        />
      </Condition>
      <Condition when={"status"} is={TransactionStatusEnum.FINISHED}>
        <LabeledTextField
          name={"remoteTransactionId"}
          label={"ID удаленной транзакции"}
          placeholder={""}
        />
      </Condition>

      <Button type={"submit"}>Сохранить</Button>
      <Button ml={2} onClick={() => onCancel && onCancel()}>
        Отмена
      </Button>
    </Form>
  )
}
