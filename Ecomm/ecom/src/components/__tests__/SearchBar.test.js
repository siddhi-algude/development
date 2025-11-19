import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

test("typing updates search input", () => {
  render(<SearchBar />);
  const input = screen.getByPlaceholderText(/search/i);

  fireEvent.change(input, { target: { value: "Shoes" } });
  expect(input.value).toBe("Shoes");
});
