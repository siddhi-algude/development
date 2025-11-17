// src/pages/OrderSuccess.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Price from "../components/Price";

const LAST_ORDER_KEY = "swiftkart_last_order_v1";

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);
  const location = useLocation();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAST_ORDER_KEY);
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId") || order?.id;

  if (!order) {
    return (
      <div className="container-max py-16 text-center">
        <h1 className="text-2xl font-semibold mb-2">
          Order placed successfully 🎉
        </h1>
        {orderId && (
          <p className="text-sm text-gray-600 mb-4">
            Your Order ID: <span className="font-mono">{orderId}</span>
          </p>
        )}
        <Link to="/" className="text-fuchsia-600 text-sm">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-max py-10 grid grid-cols-1 lg:grid-cols-[2fr_1.3fr] gap-6">
      {/* Left: message + address */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h1 className="text-2xl font-semibold mb-1">Order Confirmed 🎉</h1>
          <p className="text-sm text-gray-600 mb-3">
            Thank you, {order.user?.name || "customer"}! Your order has been
            placed successfully.
          </p>
          <p className="text-xs text-gray-500">
            Order ID:{" "}
            <span className="font-mono font-semibold">{order.id}</span>
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700 mb-3">
            Delivery Address
          </h2>
          <p className="text-sm text-gray-700">
            {order.address.fullName}
            <br />
            {order.address.line1}
            {order.address.line2 && <>, {order.address.line2}</>}
            <br />
            {order.address.city}, {order.address.state} -{" "}
            {order.address.pincode}
            <br />
            Phone: {order.address.phone}
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-900"
        >
          Continue shopping
        </Link>
      </div>

      {/* Right: order summary */}
      <aside className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700 mb-3">
          Order Summary
        </h2>

        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {order.totals.items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between text-sm"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity ?? 1}
                </p>
              </div>
              <div className="whitespace-nowrap">
                <Price amount={item.price * (item.quantity ?? 1)} />
              </div>
            </div>
          ))}
        </div>

        <hr className="my-3" />

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <Price amount={order.totals.subtotal} />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              Tax ({Math.round(order.totals.taxRate * 100)}%)
            </span>
            <Price amount={order.totals.tax} />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>
              {order.totals.shipping === 0 ? (
                "Free"
              ) : (
                <Price amount={order.totals.shipping} />
              )}
            </span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between text-base font-semibold">
            <span>Total Paid</span>
            <Price amount={order.totals.total} />
          </div>
        </div>
      </aside>
    </div>
  );
}
