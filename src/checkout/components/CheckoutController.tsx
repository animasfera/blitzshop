"use client"
import React from "react"

import { Checkout } from "src/checkout/components/Checkout"
import { useCart } from "../../core/hooks/useCart"

export const CheckoutController = () => {
  const cartClient = useCart()
  return <Checkout cartClient={cartClient} />
}

export default CheckoutController
