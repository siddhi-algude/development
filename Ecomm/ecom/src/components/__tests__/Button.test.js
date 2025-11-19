import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "../Button";

test("renders button", () => {
  render(<Button>Add</Button>);
  expect(screen.getByRole("button")).toHaveTextContent("Add");
});
