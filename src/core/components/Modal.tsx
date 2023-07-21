import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useMediaQuery,
} from "@chakra-ui/react"
import React, { ReactElement, Suspense } from "react"
import { useTranslation } from "react-i18next"

type ModalProps = {
  toggle: [boolean, (val: boolean) => void]
  size?: string
  children: ReactElement // ReactChildren
  title?: string
  onClose: () => void
  isOpen?: boolean
  withPrint?: boolean
  bottomClose?: boolean
}

export const Modal = (props: ModalProps) => {
  let { toggle, size, children, title, onClose, isOpen, withPrint, bottomClose } = props

  bottomClose = typeof bottomClose === "undefined" ? true : bottomClose
  const [printing] = useMediaQuery("print")
  const { t } = useTranslation(["translation"])

  return (
    <ChakraModal
      onClose={() => (onClose ? onClose() : toggle[1](false))}
      isOpen={isOpen ? isOpen : toggle && typeof toggle[0] !== "undefined" ? toggle[0] : false}
      motionPreset="slideInBottom"
      size={size}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        {!printing && <ModalCloseButton size={"lg"} />}
        <ModalBody mt={4}>
          <Suspense fallback={<div>Загрузка...</div>}>{children}</Suspense>
        </ModalBody>
        {!printing && (
          <ModalFooter>
            {withPrint && (
              <Button
                onClick={() => {
                  window.print()
                }}
                mr={4}
              >
                {t("print")}
              </Button>
            )}
            {bottomClose && (
              <Button onClick={() => (onClose ? onClose() : toggle[1](false))}>{t("close")}</Button>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  )
}
