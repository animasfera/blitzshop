import { useState } from "react"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { UserPublicInfoType } from "src/users/schemas"
import Form from "src/core/components/form/Form"
import LabeledTextareaField from "src/core/components/form/LabeledTextareaField"
import Button from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { nl2br } from "src/core/helpers/Helpers"

interface AdminOrderLogCommentProps {
  id: number
  createDateTime: string | null
  person?: UserPublicInfoType | null
  comment: string | null
  isEditable?: boolean
  isEdited?: boolean
  onChange?: (comment: string) => void
}
const AdminOrderLogComment = (props: AdminOrderLogCommentProps) => {
  const [isEditing, SetIsEditing] = useState<boolean>(false)
  const {
    id,
    createDateTime,
    person,
    comment,
    onChange,
    isEditable = false,
    isEdited = false,
  } = props
  return (
    <>
      {isEditing ? (
        <>
          <Form
            initialValues={{ comment: comment }}
            submitText="изменить"
            btnSize="xs"
            onSubmit={async (values) => {
              try {
                onChange ? onChange(values.comment) : {}
                SetIsEditing(false)
              } catch (error: any) {}
            }}
          >
            <LabeledTextareaField name="comment" label="Комментарий:" />
            <div className="justify-end flex mb-2">
              <Button
                buttonText={"отмена"}
                size="xs"
                variant="secondary"
                onClick={() => SetIsEditing(false)}
              />
            </div>
          </Form>
        </>
      ) : (
        <>
          {isEdited && (
            <div className="absolute text-xs right-1 bottom-0 text-gray-300">изменено</div>
          )}
          <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
            <div className="flex justify-between gap-x-4">
              <div className="py-0.5 text-xs leading-5 text-gray-500">
                <span className="font-medium text-gray-900">{person?.username}</span>:
              </div>
              <time className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                {createDateTime}
              </time>
            </div>
            <p className="text-sm leading-6 text-gray-500">{nl2br(comment, false)}</p>
          </div>
        </>
      )}
      {isEditable && !isEditing && (
        <div
          className="absolute flex flex-row outline mr-6 outline-indigo-100 outline-1 duration-300 group-hover:opacity-100 h-6 rounded top-[-10px] right-0 text-gray-400 bg-white opacity-0 drop-shadow-lg
                shadow-indigo-400/50"
        >
          <button
            className="p-1 h-6 w-6 hover:bg-indigo-200 hover:text-gray-900"
            onClick={() => {
              SetIsEditing(true)
            }}
          >
            <PencilIcon />
          </button>
        </div>
      )}
    </>
  )
}

export default AdminOrderLogComment
