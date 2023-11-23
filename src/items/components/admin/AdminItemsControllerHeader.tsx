import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"

import Button from "src/core/tailwind-ui/application-ui/elements/buttons/Button"

interface AdminItemsControllerHeaderProps {}

const AdminItemsControllerHeader = (props: AdminItemsControllerHeaderProps) => {
  const router = useRouter()
  // const {} = props
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900">Все товары</h1>
        <p className="mt-2 text-sm text-gray-700">Список всех товаров площадки</p>
      </div>

      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <Link href={Routes.AdminNewItemPage().href}>
          <Button buttonText={"Новый товар"} />
        </Link>
      </div>
    </div>
  )
}

export default AdminItemsControllerHeader
