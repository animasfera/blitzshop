import { useEffect, useState } from "react"
import { AuthenticationError, PromiseReturnType } from "blitz"
import { useMutation } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"

import { Form, FORM_ERROR } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { LabeledSelectField } from "src/core/components/form/LabeledSelectField"
import { LoginProhibitedError } from "src/core/errors/Errors"

import signup from "src/auth/mutations/signup"
import { Signup } from "src/auth/schemas"
import { Countries } from "src/auth/components/Countries"
import { getUrlСountryFlag } from "src/core/helpers/getUrlСountryFlag"
import { LocaleEnum } from "@prisma/client"

interface SignupFormProps {
  onSuccess?: (user: PromiseReturnType<typeof signup>) => void
  onNavigate?: (link: string) => void
}

export const SignupForm = (props: SignupFormProps) => {
  const { onSuccess } = props

  const [signupMutation] = useMutation(signup)
  const [timezone, setTimezone] = useState("")
  const [country, setCountry] = useState<string>("ru")
  const { t, i18n } = useTranslation(["pages.signup", "zod"])
  z.setErrorMap(makeZodI18nMap({ t }))

  const signupLabeleds = [
    {
      name: "username",
      label: t("signupForm.fields.username.label"),
      placeholder: t("signupForm.fields.username.label"),
      required: true,
    },
    {
      name: "email",
      label: t("signupForm.fields.email.label"),
      type: "email",
      placeholder: "example@mail.com",
      required: true,
    },
    {
      name: "password",
      label: t("signupForm.fields.password.label"),
      type: "password",
      placeholder: "Qwerty123",
      required: true,
    },
    {
      name: "countryIsoCode",
      label: t("signupForm.fields.countryIsoCode.label"),
      options: Countries.map(({ code, name }) => ({
        value: code.toLowerCase(),
        label: name,
        img: getUrlСountryFlag({ country: code }),
      })),
      placeholder: t("signupForm.fields.countryIsoCode.placeholder"),
      required: true,
    },
  ]

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  return (
    <Form
      submitText={t("signupForm.buttons.enter")}
      schema={Signup}
      initialValues={{
        username: "",
        email: "",
        password: "",
        timezone,
        locale: i18n.resolvedLanguage?.toUpperCase() as LocaleEnum,
        countryIsoCode: country ?? "ru",
      }}
      onSubmit={async (values) => {
        try {
          const user = await signupMutation(values)

          onSuccess?.(user)
        } catch (error: any) {
          console.error("error")

          if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: t("loginForm.errors.authErr") }
          } else if (error instanceof LoginProhibitedError) {
            return { [FORM_ERROR]: t("loginForm.errors.prohibitedErr") }
          } else if (
            (error.code === "P2002" && error.meta?.target?.includes("email")) ||
            (error.statusCode === 409 && error.message.includes("email"))
          ) {
            return { [FORM_ERROR]: t("signupForm.errors.conflictEmailErr") }
          } else if (
            (error.code === "P2002" && error.meta?.target?.includes("username")) ||
            (error.statusCode === 409 && error.message.includes("username"))
          ) {
            return { [FORM_ERROR]: t("signupForm.errors.conflictUsernameErr") }
          } else {
            return { [FORM_ERROR]: error.toString() }
          }
        }
      }}
      fullBtn
    >
      {signupLabeleds.map(({ name, label, type, placeholder, required, options }) => {
        if (name === "countryIsoCode") {
          return (
            <LabeledSelectField
              key={name}
              name={name}
              label={label}
              // selected={country}
              placeholder={placeholder}
              options={options ?? []}
              handleChange={(value: string) => {
                setCountry(value)
              }}
            />
          )
        }

        return (
          <LabeledTextField
            key={name}
            name={name}
            label={label}
            type={
              type === "text" || type === "password" || type === "email" || type === "number"
                ? type
                : "text"
            }
            placeholder={placeholder}
            required={required}
          />
        )
      })}
    </Form>
  )
}

export default SignupForm
