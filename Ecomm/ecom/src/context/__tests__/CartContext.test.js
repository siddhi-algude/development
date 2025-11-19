import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "../CartContext";

test("adds item to cart", () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addItem({ id: 1, title: "Test" });
  });

  expect(result.current.cart.length).toBe(1);
  expect(result.current.cart[0].id).toBe(1);
});
