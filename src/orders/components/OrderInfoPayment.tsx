import { Order } from "db"

interface OrderInfoPaymentProps {
  order: Order
}

export const OrderInfoPayment = (props: OrderInfoPaymentProps) => {
  // TODO: получать только данные по платежу
  const { order } = props

  return (
    <>
      <h4 className="sr-only">Payment</h4>
      <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
        <div>
          <dt className="font-medium text-gray-900">Payment method</dt>
          <dd className="mt-2 text-gray-700">
            <p>Apple Pay</p>
            <p>Mastercard</p>
            <p>
              <span aria-hidden="true">••••</span>
              <span className="sr-only">Ending in </span>1545
            </p>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-900">Shipping method</dt>
          <dd className="mt-2 text-gray-700">
            <p>DHL</p>
            <p>Takes up to 3 working days</p>
          </dd>
        </div>
      </dl>
    </>
  )
}

export default OrderInfoPayment
