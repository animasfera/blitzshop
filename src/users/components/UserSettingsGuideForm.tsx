import { useState } from "react"
import { Routes } from "@blitzjs/next"
import { Trans, useTranslation } from "react-i18next"
import { Box, Button, Heading } from "@chakra-ui/react"
import { OnChange } from "react-final-form-listeners"
import { z } from "zod"

import { Form, FormProps } from "src/core/components/form/Form"
export { FORM_ERROR } from "src/core/components/form/Form"

import { LabeledCheckboxField } from "src/core/components/form/LabeledCheckboxField"

export function UserSettingsGuideForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const { t, i18n } = useTranslation(["user", "translation", "pages.settings"])
  const [checked, setChecked] = useState(false)

  return (
    <>
      {!props.initialValues?.isGuide && (
        <Form<S> {...props}>
          <Box>
            <Heading as="h2" size="sm">
              {t("pages.settings:profile.headers.guide")}
            </Heading>

            <LabeledCheckboxField
              name={"isGuide"}
              label={
                <Trans i18nKey={"user:signupForm.fields.agreeDogovor.label"}>
                  Я прочитал(а) и принимаю условия{" "}
                  <a
                    /*
                    href={
                      i18n.resolvedLanguage === "ru"
                        ? Routes.DogovorPage().pathname
                        : Routes.DogovorEnPage().pathname
                    }
                    */
                    href={"#"}
                  >
                    Агентского Договора
                  </a>
                </Trans>
              }
            />

            <OnChange name={"isGuide"}>
              {(value) => {
                setChecked(value)
              }}
            </OnChange>

            <Box pt={6} pb={6}>
              <Button isDisabled={!checked} type={"submit"}>
                {t("pages.settings:profile.headers.guideBtn")}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </>
  )
}
