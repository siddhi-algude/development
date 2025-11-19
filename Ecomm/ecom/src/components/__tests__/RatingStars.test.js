import React from "react";
import { render, screen } from "@testing-library/react";
import RatingStars from "../RatingStars";

test("renders rating display", () => {
  render(<RatingStars value={3.5} count={120} />);

  // numeric rating
  expect(screen.getByText("3.5")).toBeInTheDocument();

  // star symbol
  expect(screen.getByText("★")).toBeInTheDocument();

  // count like (120)
  expect(screen.getByText("(120)")).toBeInTheDocument();
});
