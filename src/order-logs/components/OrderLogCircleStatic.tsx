import React from "react"

interface OrderLogCircleStaticProps {
  styles?: string
}
const OrderLogCircleStatic = (props: OrderLogCircleStaticProps) => {
  const { styles = "bg-gray-100 ring-1 ring-gray-300" } = props
  return <div className={`h-1.5 w-1.5 rounded-full ring-1 ${styles} `} />
}

export default OrderLogCircleStatic
