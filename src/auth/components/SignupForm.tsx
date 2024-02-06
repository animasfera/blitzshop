import { useEffect, useState } from "react"
import { AuthenticationError, PromiseReturnType } from "blitz"
import { useMutation } from "@blitzjs/rpc"
import { Trans, useTranslation } from "react-i18next"
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
import { LabeledCheckboxField } from "src/core/components/form/LabeledCheckboxField"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

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
  const signupCheckboxes = [
    {
      name: "agreeDogovor",
      label: (
        <Trans i18nKey={"pages.signup:signupForm.fields.agreeDogovor.label"}>
          Я прочитал(а) и принимаю условия{" "}
          <Link href={Routes.OfferRuPage().href} target="_blank">
            Агентского Договора
          </Link>
        </Trans>
      ),
      required: true,
    },
    {
      name: "agreeAgreement",
      label: (
        <Trans i18nKey={"pages.signup:signupForm.fields.agreeAgreement.label"}>
          Я прочитал(а) и принимаю условия{" "}
          <Link href={Routes.PrivacyPolicyRuPage().href} target="_blank">
            Пользовательского Соглашения
          </Link>
        </Trans>
      ),
      required: true,
    },
    {
      name: "sendEmailAds",
      label: t("signupForm.fields.sendEmailAds.label"),
    },
  ]
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
    // {
    //   name: "countryIsoCode",
    //   label: t("signupForm.fields.countryIsoCode.label"),
    //   options: Countries.map(({ code, name }) => ({
    //     value: code.toLowerCase(),
    //     label: name,
    //     img: getUrlСountryFlag({ country: code }),
    //   })),
    //   placeholder: t("signupForm.fields.countryIsoCode.placeholder"),
    //   required: true,
    // },
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
        locale: i18n.resolvedLanguage as LocaleEnum,
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
      {signupLabeleds.map(({ name, label, type, placeholder, required }) => {
        // if (name === "countryIsoCode") {
        //   return (
        //     <LabeledSelectField
        //       key={name}
        //       name={name}
        //       label={label}
        //       // selected={country}
        //       placeholder={placeholder}
        //       options={options ?? []}
        //       handleChange={(value: string) => {
        //         setCountry(value)
        //       }}
        //     />
        //   )
        // }

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
      {signupCheckboxes.map(({ name, label, required }) => {
        // if (name === "countryIsoCode") {
        //   return (
        //     <LabeledSelectField
        //       key={name}
        //       name={name}
        //       label={label}
        //       // selected={country}
        //       placeholder={placeholder}
        //       options={options ?? []}
        //       handleChange={(value: string) => {
        //         setCountry(value)
        //       }}
        //     />
        //   )
        // }

        return <LabeledCheckboxField key={name} name={name} label={label} required={required} />
      })}
    </Form>
  )
}

export default SignupForm
