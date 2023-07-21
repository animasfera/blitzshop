import { useTranslation } from "react-i18next"
import { Box, Button, Text } from "@chakra-ui/react"
import { z } from "zod"

import { Form, FormProps } from "src/core/components/form/Form"
import LabeledRadioField from "src/core/components/form/LabeledRadioField"

export { FORM_ERROR } from "src/core/components/form/Form"

export interface CardCountryFormProps<S> extends FormProps<any> {
  country: "russia" | "other" | undefined
  withDesc?: boolean
}

export function CardCountryForm<S extends z.ZodType<any, any>>(props: CardCountryFormProps<S>) {
  const { t } = useTranslation(["user", "translation"])
  const { country, withDesc = true } = props

  if (!country) {
    return <></>
  }

  return (
    <>
      <Form<S> {...props}>
        {country === "russia" && (
          <>
            {withDesc && <Text>{t("user:russianSellerForm.texts.explanation")}</Text>}
            {!withDesc && <Text>{t("user:russianSellerForm.texts.explanation2")}</Text>}
            <LabeledRadioField
              name={"buyingInCountries"}
              label={t("user:russianSellerForm.fields.buyingInCountries.label")}
              options={[
                {
                  label: t("user:russianSellerForm.fields.buyingInCountries.options.world"),
                  value: "world",
                },
                {
                  label: t(
                    "user:russianSellerForm.fields.buyingInCountries.options.worldExceptRussia"
                  ),
                  value: "worldExceptRussia",
                },
              ]}
            />
          </>
        )}
        {country === "other" && (
          <>
            {withDesc && <Text>{t("user:westernSellerForm.texts.explanation")}</Text>}
            {!withDesc && <Text>{t("user:westernSellerForm.texts.explanation2")}</Text>}
            <LabeledRadioField
              name={"buyingInCountries"}
              label={t("user:westernSellerForm.fields.buyingInCountries.label")}
              options={[
                {
                  label: t("user:westernSellerForm.fields.buyingInCountries.options.world"),
                  value: "world",
                },
                {
                  label: t("user:westernSellerForm.fields.buyingInCountries.options.russia"),
                  value: "russia",
                },
              ]}
            />
          </>
        )}

        <Box pt={6}>
          <Button type={"submit"}>{t("translation:save")}</Button>
        </Box>
      </Form>
    </>
  )
}
