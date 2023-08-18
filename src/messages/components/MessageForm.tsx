"use client"
import { Box, Button, Icon } from "@chakra-ui/react"
import { FiSend } from "react-icons/fi"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Form, FormProps } from "src/core/components/form/Form"
import LabeledTextareaField from "src/core/components/form/LabeledTextareaField"
export { FORM_ERROR } from "src/core/components/form/Form"

export function MessageForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { t } = useTranslation(["translation"])
  let changedProps = {
    ...props,
    keepDirtyOnReinitialize: false,
  }
  return (
    <Form<S> {...changedProps} style={{ position: "relative", width: "100%" }} showErrors={false}>
      <Box position={"relative"}>
        <LabeledTextareaField
          name="message"
          label=""
          placeholder={t("enterYourMessage")}
          rows={props.rows || 1}
        />
        <Button
          position={"absolute"}
          top={1}
          right={0}
          type={"submit"}
          bg={"none"}
          _hover={{ bg: "none" }}
          _active={{
            bg: "none",
            outline: 0,
            border: "none",
            boxShadow: "none",
          }}
          _focus={{ bg: "none", outline: 0, border: "none", boxShadow: "none" }}
        >
          <Icon as={FiSend} w={"24px"} h={"24px"} color={"#54338f"} />
        </Button>
      </Box>
    </Form>
  )
}
