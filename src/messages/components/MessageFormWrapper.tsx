import { useEffect, useState } from "react"
import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { useToast } from "@chakra-ui/react"

import { MessageForm } from "./MessageForm"
import { FORM_ERROR } from "src/core/components/form/Form"
import { numWord } from "src/core/helpers/Helpers"
import createMessage from "../mutations/createMessage"
import getMessages from "../queries/getMessages"
import { CreateMessageSchema } from "../schemas"

export const MessageFormWrapper = (props) => {
  const { data, onSubmit } = props
  const [createMessageMutation] = useMutation(createMessage)
  const [delay, setDelay] = useState([Date.now(), 1000])
  let toast = useToast()

  const keydownHandler = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) return
    if (e.keyCode === 13 && e.shiftKey) return
    if (e.keyCode === 13) form.submit()
  }

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler)
    return () => {
      document.removeEventListener("keydown", keydownHandler)
    }
  }, [])

  let form

  return (
    <MessageForm
      w={"100%"}
      rows={props.rows}
      style={{ width: "100%" }}
      schema={CreateMessageSchema}
      initialValues={{ ...data }}
      getInstance={(formInstance) => {
        form = formInstance
      }}
      onSubmit={async (values, form) => {
        if (delay[0]! > Date.now()) {
          toast({
            position: "bottom-right",
            isClosable: true,
            title:
              "Слишком много сообщений. Подождите " +
              delay[1]! / 1000 +
              " " +
              numWord(delay[1]! / 1000, ["секунду", "секунды", "секунд"]),
          })
          setDelay([Date.now() + delay[1]! + 1000, delay[1]! + 1000])
          return
        }
        try {
          const message = await createMessageMutation(values)
          invalidateQuery(getMessages)
          form.reset()
          form.focus("message")
          setDelay([Date.now() + 1000, 1000])
          onSubmit && onSubmit(values)
        } catch (error: any) {
          console.error(error)
          return {
            [FORM_ERROR]: error.toString(),
          }
        }
      }}
    />
  )
}
