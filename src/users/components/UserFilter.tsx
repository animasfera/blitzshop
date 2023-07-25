import { Box, Flex } from "@chakra-ui/react"
import { FormSpy } from "react-final-form"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Form, FormProps } from "src/core/components/form/Form"
import RadioButtonsField from "src/core/components/form/RadioButtonsField"

export { FORM_ERROR } from "src/core/components/form/Form"

export function UserFilter<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { t } = useTranslation(["user"])

  return (
    <Form<S> {...props}>
      <FormSpy subscription={{ values: true }} onChange={props._onChange} />
      <Flex mb={4}>
        <Box>
          <RadioButtonsField
            name={"isGuideString"}
            label={""}
            value={"all"}
            options={[
              { label: t("filter.all"), value: "all" },
              { label: t("filter.guides"), value: "guide" },
              { label: t("filter.players"), value: "players" },
            ]}
          />
        </Box>
      </Flex>
    </Form>
  )
}
