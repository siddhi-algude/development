// src/pages/Checkout.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Price from "../components/Price";

const ADDRESS_KEY = "swiftkart_address_v1";
const LAST_ORDER_KEY = "swiftkart_last_order_v1";

function loadSavedAddress() {
  try {
    const raw = localStorage.getItem(ADDRESS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveAddress(addr) {
  localStorage.setItem(ADDRESS_KEY, JSON.stringify(addr));
}

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState(
    () =>
      loadSavedAddress() || {
        fullName: user?.name || "",
        phone: "",
        email: user?.email || "",
        pincode: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
      }
  );
  const [addressTouched, setAddressTouched] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [formError, setFormError] = useState("");

  // redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // redirect if cart empty
  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [cart, navigate]);

  const totals = useMemo(() => {
    const items = cart || [];
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * (item.quantity ?? 1),
      0
    );
    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    const shipping = subtotal > 0 && subtotal < 50 ? 5 : 0;
    const total = subtotal + tax + shipping;
    return { items, subtotal, tax, shipping, total, taxRate };
  }, [cart]);

  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const addressValid = useMemo(() => {
    const required = ["fullName", "phone", "pincode", "line1", "city", "state"];
    return required.every((key) => address[key]?.trim());
  }, [address]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setAddressTouched(true);

    if (!addressValid) {
      setFormError("Please fill all required address fields.");
      return;
    }

    setFormError("");
    setPlacing(true);

    // Save address for future checkouts
    saveAddress(address);

    // Build mock order
    const orderId = `SK${Date.now().toString().slice(-8)}`;
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      },
      address,
      totals,
    };

    // Persist last order (for success page)
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));

    // Clear cart
    clearCart();

    setTimeout(() => {
      setPlacing(false);
      navigate(`/order-success?orderId=${orderId}`, { replace: true });
    }, 600); // tiny delay for nicer feel
  };

  return (
    <div className="container-max py-8 grid grid-cols-1 lg:grid-cols-[2fr_1.3fr] gap-6">
      {/* LEFT COLUMN: Steps (Login already done, so we show Address + Payment) */}
      <div className="space-y-4">
        {/* Step 1: Login */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-fuchsia-500 text-white flex items-center justify-center text-xs font-semibold">
                1
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                Login
              </h2>
            </div>
            {user && (
              <span className="text-xs text-gray-500">
                {user.name} · {user.email}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">
            You are logged in. Continue with your delivery address.
          </p>
        </section>

        {/* Step 2: Delivery Address */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-fuchsia-500 text-white flex items-center justify-center text-xs font-semibold">
              2
            </span>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
              Delivery Address
            </h2>
          </div>

          {formError && addressTouched && (
            <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {formError}
            </div>
          )}

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handlePlaceOrder}>
            {/* Full name */}
            <div className="md:col-span-1">
              <label className="block text-xs font-semibold mb-1">
                Full Name*
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={address.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="md:col-span-1">
              <label className="block text-xs font-semibold mb-1">
                Phone*
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={address.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold mb-1">
                Email (for updates)
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={address.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            {/* Pincode */}
            <div className="md:col-span-1">
              <label className="block text-xs font-semibold mb-1">
                Pincode*
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={address.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
              />
            </div>

            {/* City */}
            <div className="md:col-span-1">
              <label className="block text-xs font-semibold mb-1">
                City*
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={address.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>

            {/* Address line 1 */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold mb-1">
                Address Line 1*
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={address.line1}
                onChange={(e) => handleChange("line1", e.target.value)}
              />
            </div>

            {/* Address line 2 */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold mb-1">
                Address Line 2
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={address.line2}
                onChange={(e) => handleChange("line2", e.target.value)}
              />
            </div>

            {/* State */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold mb-1">
                State / Province*
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={address.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>

            {/* Step 3: Payment (mock, inside same form) */}
            <div className="md:col-span-2 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-fuchsia-500 text-white flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                  Payment
                </h2>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                Mock checkout: treating payment as Cash on Delivery.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <input type="radio" checked readOnly className="accent-fuchsia-500" />
                <span>Cash on Delivery (COD)</span>
              </div>
            </div>

            {/* Place order button */}
            <div className="md:col-span-2 mt-4 flex justify-end">
              <button
                type="submit"
                disabled={placing}
                onClick={() => setAddressTouched(true)}
                className={`min-w-[200px] rounded-lg py-2 px-4 text-sm font-semibold ${
                  placing
                    ? "bg-gray-300 text-gray-600 cursor-wait"
                    : "bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                }`}
              >
                {placing ? "Placing order..." : "Place Order"}
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* RIGHT COLUMN: Order Summary */}
      <aside className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-fit sticky top-24">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700 mb-3">
          Order Summary
        </h2>

        {totals.items.length === 0 ? (
          <p className="text-sm text-gray-500">
            Your cart is empty.{" "}
            <Link to="/" className="text-fuchsia-600">
              Browse products
            </Link>
          </p>
        ) : (
          <>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {totals.items.map((item) => (
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
                <Price amount={totals.subtotal} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Tax ({Math.round(totals.taxRate * 100)}%)
                </span>
                <Price amount={totals.tax} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {totals.shipping === 0 ? "Free" : <Price amount={totals.shipping} />}
                </span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <Price amount={totals.total} />
              </div>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              By placing your order, you agree to SwiftKart&apos;s terms and
              policies.
            </p>
          </>
        )}
      </aside>
    </div>
  );
}
