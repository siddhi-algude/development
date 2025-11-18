// src/utils/checkoutApi.js
function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export default {
  async placeOrder({ shipping, payment, cart }) {
    await wait(700);

    return {
      orderId: "SK-" + Math.floor(Math.random() * 999999),
      shipping,
      payment,
      items: cart,
      placedAt: new Date().toISOString(),
    };
  },
};
