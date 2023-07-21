import { useState } from "react"
import { Prisma } from "db"
import { FormSpy } from "react-final-form"
import { Box, Flex } from "@chakra-ui/react"
import { z } from "zod"

import LabeledTextField from "src/core/components/form/LabeledTextField"
import { LabeledSelectField } from "src/core/components/form/LabeledSelectField"
import { Form } from "src/core/components/form/Form"
import { FormPropsWithOnChange } from "src/core/components/form/FormPropsWithOnChange"
import { TransactionStatusRu, TransactionTypesRu } from "./TransactionEnums"

export { FORM_ERROR } from "src/core/components/form/Form"

export function PayoutsFilter<S extends z.ZodType<any, any>>(props: FormPropsWithOnChange<S>) {
  let statusOptions = [{ label: "", value: "" }] as any
  for (var value in TransactionStatusRu) {
    statusOptions.push({ label: TransactionStatusRu[value], value: value })
  }
  const [showForm, setShowForm] = useState(false)

  let typeOptions = [{ label: "", value: "" }] as any
  for (var value2 in TransactionTypesRu) {
    typeOptions.push({ label: TransactionTypesRu[value2], value: value2 })
  }

  return (
    <>
      <Box>
        <Form<S> {...props}>
          <FormSpy
            subscription={{ values: true }}
            onChange={(data) => {
              for (var i in data.values) {
                if (data.values[i] === "") {
                  delete data.values[i]
                }
              }

              let filterFormatted: Prisma.TransactionWhereInput = {}

              if (data.values.status) {
                filterFormatted.status = data.values.status
              } else {
                delete filterFormatted.status
              }
              if (data.values.username) {
                filterFormatted.user = {
                  username: { startsWith: data.values.username },
                }
              }

              props._onChange(filterFormatted)
            }}
          />

          <Flex flexDirection={["column"]}>
            <LabeledTextField name={"username"} label={"Имя пользователя"} />
            <LabeledSelectField options={statusOptions} name={"status"} label={"Статус"} />
          </Flex>
        </Form>
      </Box>
    </>
  )
}
