import { useMutation } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"

import { LabeledTextField, LabeledTextFieldProps } from "src/core/components/form/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/form/Form"
import signup from "src/auth/mutations/signup"
import { Signup } from "src/auth/schemas"

import { RadioButtonsField } from "src/core/components/form/RadioButtonsField"
import { RadioSelectedCardsField } from "src/core/components/form/RadioSelectedCardsField"

const options = [
  {
    value: "Newsletter",
    label: "Newsletter",
    description: "Last message sent an hour ago",
    footerText: "621 users",
  },
  {
    value: "Existing Customers",
    label: "Existing Customers",
    description: "Last message sent 2 weeks ago",
    footerText: "1200 users",
  },
  {
    value: "Trial Users",
    label: "Trial Users",
    description: "Last message sent 4 days ago",
    footerText: "2740 users",
  },
]

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const { t } = useTranslation(["pages.signup", "zod"])
  z.setErrorMap(makeZodI18nMap({ t }))

  const signupLabeleds: LabeledTextFieldProps[] = [
    {
      name: "username",
      label: "Username",
      placeholder: "Username",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "example@mail.com",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Qwerty123",
      required: true,
    },
  ]

  return (
    <div>
      <h1>{t("title")}</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{
          username: "",
          email: "",
          password: "",
          // @ts-ignore
          RadioButtonsCardField: options[1]?.value,
        }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        {signupLabeleds.map(({ name, label, type, placeholder, required }) => (
          <LabeledTextField
            key={`${type}-${name}`}
            name={name}
            label={label}
            type={type}
            placeholder={placeholder}
            required={required}
          />
        ))}

        <RadioButtonsField
          name={"isGuideString"}
          label={""}
          value={"all"}
          options={[
            { label: "all", value: "all" },
            { label: "guides", value: "guide" },
            { label: "players", value: "players" },
          ]}
        />
      </Form>
    </div>
  )
}

export default SignupForm
