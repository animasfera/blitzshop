import { AdminSettingsForm } from "./AdminSettingsForm"

const AdminSettingsController = () => {
  return (
    <div>
      <AdminSettingsForm
        submitText="Сохранить"
        onSubmit={(data) => {
          alert(data)
        }}
      />
    </div>
  )
}

export default AdminSettingsController
