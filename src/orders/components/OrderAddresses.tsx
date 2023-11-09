import { Order } from "db"

interface OrderAddressesProps {
  order: Order
}

export const OrderAddresses = (props: OrderAddressesProps) => {
  // TODO: получать только адреса
  const { order } = props

  return (
    <>
      <h4 className="sr-only">Addresses</h4>
      <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
        <div>
          <dt className="font-medium text-gray-900">Shipping address</dt>
          <dd className="mt-2 text-gray-700">
            <address className="not-italic">
              <span className="block">Kristin Watson</span>
              <span className="block">7363 Cynthia Pass</span>
              <span className="block">Toronto, ON N3Y 4H8</span>
            </address>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-900">Billing address</dt>
          <dd className="mt-2 text-gray-700">
            <address className="not-italic">
              <span className="block">Kristin Watson</span>
              <span className="block">7363 Cynthia Pass</span>
              <span className="block">Toronto, ON N3Y 4H8</span>
            </address>
          </dd>
        </div>
      </dl>
    </>
  )
}

export default OrderAddresses
