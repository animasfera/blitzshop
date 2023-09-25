interface BadgeNotificationProps {
  color?: "green" | "gray" | "red"
  count?: number
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export const BadgeNotification = (props: BadgeNotificationProps) => {
  const { color = "gray", count = 0, size = "md" } = props

  console.log("props", props)

  const sizeBadge = {
    xs: { badge: "h-2 w-2 top-0 right-0", font: "" },
    sm: { badge: "h-2.5 w-2.5 top-[-2.5px] right-[-2.5px]", font: "" },
    md: { badge: "h-3.5 w-3.5 top-[-2px] right-[-2px]", font: "9px" },
    lg: { badge: "h-4 w-4 top-[-2.5px] right-[-2.5px]", font: "9px" },
    xl: { badge: "h-4 w-4 top-[-2.5px] right-[-2.5px]", font: "10px" },
  }

  const colorBadge = {
    green: "bg-green-500 text-slate-50",
    gray: "bg-gray-300",
    red: "bg-red-400 text-slate-50",
  }

  return (
    <div
      className={`
        absolute flex justify-center items-center rounded-full ring-2 ring-white
        ${sizeBadge[size].badge} ${colorBadge[color]}
      `}
      style={{ fontSize: sizeBadge[size].font }}
    >
      {count <= 0 || size === "xs" || size === "sm" ? "" : count > 9 ? "9+" : count}
    </div>
  )
}

export default BadgeNotification
