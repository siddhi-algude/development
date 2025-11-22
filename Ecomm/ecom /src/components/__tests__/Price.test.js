import React from "react";
import { render, screen } from "@testing-library/react";
import Price from "../Price";

test("renders formatted price", () => {
  render(<Price amount={1999} />);
  const el = screen.getByText((t) => t.includes("1,999"));
  expect(el).toBeInTheDocument();
});
