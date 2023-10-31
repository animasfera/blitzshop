"use client"
import { useTranslation } from "react-i18next"
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"

import { SettingsUser } from "src/settings/components/SettingsUser"
import { SettingsUserSectionProps } from "src/settings/components/SettingsUserSection"

export const SettingsUserController = () => {
  const { t } = useTranslation(["pages.settings"])

  const navigation = [
    { name: t("navigation.general"), href: "#", icon: UserCircleIcon, current: true },
    { name: t("navigation.security"), href: "#", icon: FingerPrintIcon, current: false },
    { name: t("navigation.notifications"), href: "#", icon: BellIcon, current: false },
    { name: t("navigation.plan"), href: "#", icon: CubeIcon, current: false },
    { name: t("navigation.billing"), href: "#", icon: CreditCardIcon, current: false },
    { name: t("navigation.teamMembers"), href: "#", icon: UsersIcon, current: false },
  ]

  const settings: SettingsUserSectionProps[] = [
    {
      title: t("settings.profile.title"),
      description: t("settings.profile.description"),
      list: [
        {
          label: t("settings.profile.inputs.fullname.label"),
          value: "Tom Cook",
        },
        {
          label: t("settings.profile.inputs.email.label"),
          value: "tom.cook@example.com",
        },
        {
          label: t("settings.profile.inputs.position.label"),
          value: "Human Resources Manager",
        },
      ],
    },
    {
      title: t("settings.bank.title"),
      description: t("settings.bank.description"),
      list: [
        {
          value: "TD Canada Trust",
        },
        {
          value: "Royal Bank of Canada",
        },
      ],
      button: {
        buttonText: t("settings.bank.buttonText"),
      },
    },
    {
      title: t("settings.integrations.title"),
      description: t("settings.integrations.description"),
      list: [
        {
          value: t("settings.integrations.inputs.books.label"),
        },
      ],
      button: {
        buttonText: t("settings.integrations.buttonText"),
      },
    },
    {
      title: t("settings.system.title"),
      description: t("settings.system.description"),
      list: [
        {
          label: t("settings.system.inputs.language.label"),
          value: t("settings.system.inputs.language.value"),
        },
        {
          label: t("settings.system.inputs.date.label"),
          value: "DD-MM-YYYY",
        },
        {
          label: t("settings.system.inputs.timezone.label"),
          type: "toogle",
        },
      ],
    },
  ]

  return <SettingsUser navigation={navigation} settings={settings} />
}

export default SettingsUserController
