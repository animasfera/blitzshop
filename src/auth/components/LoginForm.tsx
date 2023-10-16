import { useEffect, useState } from "react"
import { AuthenticationError, PromiseReturnType } from "blitz"
import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"
import { LocaleEnum } from "db"

import { LabeledTextField, LabeledTextFieldProps } from "src/core/components/form/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/form/Form"
import { LoginProhibitedError } from "src/core/errors/Errors"
import login from "src/auth/mutations/login"
import getCart from "src/carts/queries/getCart"
import { Login } from "src/auth/schemas"

interface LoginFormProps {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
  onNavigate?: (link: string) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const { onSuccess } = props

  const [loginMutation] = useMutation(login)
  const [timezone, setTimezone] = useState("")
  const { t, i18n } = useTranslation(["pages.login", "zod"])
  z.setErrorMap(makeZodI18nMap({ t }))

  const loginLabeleds: LabeledTextFieldProps[] = [
    {
      name: "email",
      label: t("loginForm.fields.email.label"),
      type: "email",
      placeholder: "example@mail.com",
      required: true,
    },
    {
      name: "password",
      label: t("loginForm.fields.password.label"),
      type: "password",
      placeholder: "Qwerty123",
      required: true,
    },
  ]

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  return (
    <Form
      submitText={t("loginForm.buttons.enter")}
      schema={Login}
      initialValues={{ email: "", password: "", timezone: timezone }}
      onSubmit={async (values) => {
        try {
          const user = await loginMutation({ ...values })
          void i18n.changeLanguage(user.locale || LocaleEnum.EN)

          await invalidateQuery(getCart)
          onSuccess?.(user)
        } catch (error: any) {
          if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: t("loginForm.errors.authErr") }
          } else if (error instanceof LoginProhibitedError) {
            return { [FORM_ERROR]: t("loginForm.errors.prohibitedErr") }
          } else {
            return {
              [FORM_ERROR]: `${t("loginForm.errors.unknown")} - ` + error.toString(),
            }
          }
        }
      }}
      fullBtn
    >
      {loginLabeleds.map(({ name, label, type, placeholder, required }) => (
        <LabeledTextField
          key={`${type}-${name}`}
          name={name}
          label={label}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      ))}
    </Form>
  )
}

export default LoginForm
