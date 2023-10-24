import { useMutation, useQuery } from "@blitzjs/rpc"
import updateConfigs from "src/configs/mutations/updateConfigs"
import getConfigs from "src/configs/queries/getConfigs"
import { AdminSettingsForm } from "./AdminSettingsForm"

const AdminSettingsController = () => {
  const [updateConfigMutation] = useMutation(updateConfigs)
  const [{ configs }] = useQuery(getConfigs, {})
  return (
    <div>
      <AdminSettingsForm
        initialValues={configs}
        submitText="Сохранить"
        onSubmit={async (data) => {
          await updateConfigMutation({ configs: data })
        }}
      />
    </div>
  )
}

export default AdminSettingsController
