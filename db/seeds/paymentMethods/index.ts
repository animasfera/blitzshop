import db from "db"

export const createPaymentMethods = async () => {
  try {
    await db.paymentMethod.createMany({
      data: [
        { name: "stripe", title: "Stripe", description: "" },
        { name: "cloudpayments", title: "Cloudpayments", description: "" },
      ],
    })
  } catch (e) {}
}

export default createPaymentMethods
