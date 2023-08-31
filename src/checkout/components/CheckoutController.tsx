"use client"
import React from "react"

import { Checkout } from "src/checkout/components/Checkout"

const products = [
  {
    id: 1,
    name: "High Wall Tote",
    href: "#",
    price: "$210.00",
    color: "White and black",
    size: "15L",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/checkout-page-07-product-01.jpg",
    imageAlt: "Front of zip tote bag with white canvas, white handles, and black drawstring top.",
  },
]

export const CheckoutController = () => {
  return <Checkout items={products} />
}

export default CheckoutController
