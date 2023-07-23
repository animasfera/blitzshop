import Link from "next/link"
import { Routes } from "@blitzjs/next"
import React, { ReactElement, useState } from "react"
import {
  IconButton,
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react"
import { FiHome, FiMenu } from "react-icons/fi"
import { IconType } from "react-icons"

interface LinkItemProps {
  name: string
  label: string
  icon: IconType
  href?: any
}
const LinkItems: Array<LinkItemProps> = [
  {
    name: "overview",
    label: "Дэшбоард",
    icon: FiHome,
    href: "#",
  },
]

const AdminSidebar = (props) => {
  const { children } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [view, setView] = useState<string | undefined>()

  return (
    <Box mt={"75px"} minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        onNavigate={(name) => setView(name)}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} onNavigate={(name) => setView(name)} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  onNavigate: (name: string) => void
}

const SidebarContent = ({ onClose, onNavigate, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h={"calc(100vh - 74px)"}
      py={3}
      overflowY={"scroll"}
      {...rest}
    >
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          <Link href={link.href || ""}>{link.label}</Link>
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactElement
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    //@ts-ignore
    <Link href="#" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="3"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "purple.700",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  )
}

export default AdminSidebar
