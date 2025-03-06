import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  // this must fail
  expect(screen.getByText(/react/i)).toBeInTheDocument();
});
