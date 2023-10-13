import { Fragment, ReactElement, Suspense, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { classNames } from "../helpers/classNames"
import Button from "./application-ui/elements/buttons/Button"
import ButtonCircular from "./application-ui/elements/buttons/ButtonCircular"

type ModalProps = {
  size?: string
  children: ReactElement // ReactChildren
  toggle?: [boolean, (val: boolean) => void]
  title?: string
  onClose: () => void
  isOpen?: boolean
  withPrint?: boolean
  bottomClose?: boolean
}
export const Modal = (props: ModalProps) => {
  let { size, toggle, children, title, onClose, isOpen, withPrint, bottomClose } = props

  bottomClose = typeof bottomClose === "undefined" ? true : bottomClose
  return (
    <Transition.Root
      show={isOpen ? isOpen : toggle && typeof toggle[0] !== "undefined" ? toggle[0] : false}
      as={Fragment}
    >
      <Dialog as="div" className="relative z-10" onClose={() => onClose()}>
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
                    " inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                )}
              >
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                  <div className="absolute right-0 top-0 p-3">
                    <ButtonCircular
                      variant={"soft"}
                      size={"xs"}
                      icon={<XMarkIcon className="h-5 w-5" aria-hidden="true" />}
                      onClick={() => onClose()}
                    />
                  </div>
                </Dialog.Title>
                <Suspense></Suspense>
                {children}
                <div className="flex justify-end">
                  <Button buttonText="Закрыть" handleClick={() => onClose()} />
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
