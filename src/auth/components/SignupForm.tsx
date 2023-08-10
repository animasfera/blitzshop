import { useMutation } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"

import { LabeledTextField, LabeledTextFieldProps } from "src/core/components/form/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/form/Form"
import signup from "src/auth/mutations/signup"
import { Signup } from "src/auth/schemas"

import { RadioButtonsField } from "src/core/components/form/RadioButtonsField"

const options = [
  { value: "Newsletter", label: "Newsletter" },
  { value: "Existing Customers", label: "Existing Customers", disabled: true },
  { value: "Trial Users", label: "Trial Users" },
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
          label={"RadioButtonsField"}
          // value={"all"}
          options={options}
          helperText={"helperText"}
          required
        />
      </Form>
    </div>
  )
}

export default SignupForm
