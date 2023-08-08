import { Divider, FormLabel } from "@chakra-ui/react"
import { z } from "zod"
import { Field } from "react-final-form"

import { LabeledCheckboxField } from "src/core/components/form/LabeledCheckboxField"
import { Form, FormProps } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"

export { FORM_ERROR } from "src/core/components/form/Form"

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
)

export function AdminSettingsForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <FormLabel as="legend" fontSize={18} mt={10}>
        Ссылки
      </FormLabel>

      <LabeledTextField name="linkMeditation" label="Медитация: ссылка на Youtube" />
      <LabeledTextField name="linkCommunity" label="Коммьюнити: ссылка на Youtube" />

      <Divider />

      <FormLabel as="legend" fontSize={18} mt={10}>
        Комиссии
      </FormLabel>
      <LabeledTextField
        name="numDaysMaxForSales"
        type="number"
        label="Максимальное кол-во дней от начала продаж до старта игры"
      />
      <LabeledTextField name="feeSaleCoef" type="number" label="Комиссия с продаж" />
      <LabeledTextField
        name="feeCardRuTransactionCoef"
        type="number"
        label="Комиссия эквайринга % (российские карты)"
      />
      <LabeledTextField
        name="feeCardRuTransactionFixed"
        type="number"
        label="Комиссия эквайринга фикс., руб (российские карты)"
      />
      <LabeledTextField
        name="feeCardIntTransactionCoef"
        type="number"
        label="Комиссия эквайринга % (иностранные карты)"
      />
      <LabeledTextField
        name="feeCardIntTransactionFixed"
        type="number"
        label="Комиссия эквайринга фикс., руб (иностранные карты)"
      />
      <LabeledTextField
        name="feeBankRuTransactionCoef"
        type="number"
        label="Комиссия банковский перевод по РФ %"
      />
      <LabeledTextField
        name="feeBankRuTransactionFixed"
        type="number"
        label="Комиссия банковский перевод по РФ, фикс. руб."
      />
      <LabeledTextField name="feeSwiftTransactionCoef" type="number" label="Комиссия swif, %" />
      <LabeledTextField
        name="feeSwiftTransactionFixed"
        type="number"
        label="Комиссия swif, фикс. руб."
      />

      <Divider />

      <FormLabel as="legend" fontSize={18} mt={10}>
        Разрешить:
      </FormLabel>
      <LabeledCheckboxField name={"allowLogin"} label={"Вход"} />
      <LabeledCheckboxField name={"allowSales"} label={"Покупку билетов"} />
      <LabeledCheckboxField name={"allowRefunds"} label={"Запрашивать возвраты"} />
      <LabeledCheckboxField name={"allowPayouts"} label={"Выплаты"} />
      <LabeledCheckboxField name={"allowAddSlots"} label={"Добавление новых игр"} />
      <LabeledCheckboxField name={"allowRegGuides"} label={"Регистрацию ведущих"} />
      <LabeledCheckboxField name={"allowRegUsers"} label={"Регистрацию пользователей"} />
    </Form>
  )
}
