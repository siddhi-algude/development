import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";

// mock router (fix Link / TextEncoder)
jest.mock("react-router-dom", () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

jest.mock("@abcde123jk/swiftkart-addtocart", () => ({
  AddToCartButton: () => <button data-testid="addtocart-btn">Add</button>
}));

jest.mock("../../context/CartContext", () => ({
  useCart: () => ({ addItem: jest.fn() })
}));

jest.mock("../../context/WishlistContext", () => ({
  useWishlist: () => ({
    toggleWishlist: jest.fn(),
    isWishlisted: () => false,
  })
}));

const product = {
  id: 1,
  title: "Sample Product",
  image: "test.jpg",
  stock: 5,
  rating: 3.5,
  count: 100,
  price: 1999
};

test("renders product title", () => {
  render(<ProductCard product={product} />);
  expect(screen.getByText("Sample Product")).toBeInTheDocument();
});

test("renders mocked add-to-cart button", () => {
  render(<ProductCard product={product} />);
  expect(screen.getByTestId("addtocart-btn")).toBeInTheDocument();
});
