import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the StoresPage component to avoid rendering its actual content
jest.mock("./pages/StoresPage", () => () => <div>Mocked Stores Page</div>);

describe("App Component", () => {
  test("renders the App component without crashing", () => {
    render(<App />);
  });


  test("renders StoresPage at '/' route", () => {
    render(<App />);
    expect(screen.getByText("Mocked Stores Page")).toBeInTheDocument();
  });

  test("renders StoresPage at '/stores' route", () => {
    window.history.pushState({}, "Stores Page", "/stores");
    render(<App />);
    expect(screen.getByText("Mocked Stores Page")).toBeInTheDocument();
  });
});
