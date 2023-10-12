import React from "react"

const AdminItemsControllerHeader = () => {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900">Все товары</h1>
        <p className="mt-2 text-sm text-gray-700">Список всех товаров площадки</p>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Добавить товар
        </button>
      </div>
    </div>
  )
}

export default AdminItemsControllerHeader
