import { Fragment, ReactElement, Suspense, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { classNames } from "../../helpers/classNames"
import Button from "../application-ui/elements/buttons/Button"
import ButtonCircular from "../application-ui/elements/buttons/ButtonCircular"
import { Loading } from "../../components/Loading"

type ModalProps = {
  size?: string
  children: ReactElement | ReactElement[]
  toggle?: [boolean, (val: boolean) => void]
  title?: string
  onClose?: () => void
  isOpen?: boolean
  withPrint?: boolean
  bottomClose?: boolean
}
export const Modal = (props: ModalProps) => {
  let { size, toggle, children, title, onClose, isOpen, withPrint, bottomClose = true } = props

  return (
    <Transition.Root
      show={isOpen ? isOpen : toggle && typeof toggle[0] !== "undefined" ? toggle[0] : false}
      as={Fragment}
    >
      <Dialog as="div" className="relative z-50" onClose={() => onClose && onClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-full overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={classNames(
                  size +
                    (size !== "w-full" ? " my-8 rounded-lg " : "") +
                    " inline-block p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl"
                )}
              >
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                  <div className="absolute right-0 top-0 p-3">
                    <ButtonCircular
                      variant={"soft"}
                      size={"xs"}
                      icon={<XMarkIcon className="h-5 w-5" aria-hidden="true" />}
                      onClick={() => onClose && onClose()}
                    />
                  </div>
                </Dialog.Title>
                <div>
                  <Loading>{children}</Loading>
                </div>

                <div className="flex justify-end">
                  {bottomClose && (
                    <Button buttonText="Закрыть" handleClick={() => onClose && onClose()} />
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
