import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import skusReducer, { addSku, deleteSku, updateSku } from "../store/skusSlice";
import storesReducer from "../store/storesSlice";
import planningReducer from "../store/planningSlice";
import SkusPage from "../pages/SkusPage"; // Update the path based on your file structure
import { RootState } from "../store";

// Define initial test state
const initialState: RootState = {
  stores: [], // Add default values for the stores slice
  skus :[{ id: "SKU1", label: "Test SKU", price: 10.99, cost: 5.99, seqNo: 1 }],
  planning: {rows:[]}, // Add default values for the planning slice
};

// Helper function to initialize store for tests
const setup = () => {
  const store = configureStore({
    reducer: {
      stores: storesReducer,
      skus: skusReducer,
      planning: planningReducer,
    },
    preloadedState: initialState,
  });

  jest.spyOn(store, "dispatch"); // Spy on dispatch

  return { store };
};

describe("SkusPage Component", () => {
  it("renders the SKU management page correctly", () => {
    const { store } = setup();

    render(
      <Provider store={store}>
        <SkusPage />
      </Provider>
    );

    expect(screen.getByText("SKUs Management")).toBeInTheDocument();
    expect(screen.getByText("Add SKU")).toBeInTheDocument();
    expect(screen.getByText("Test SKU")).toBeInTheDocument();
  });

  it("opens the add SKU modal", () => {
    const { store } = setup();

    render(
      <Provider store={store}>
        <SkusPage />
      </Provider>
    );

    fireEvent.click(screen.getByText("Add SKU"));

    expect(screen.getByText("Add SKU")).toBeInTheDocument();
    expect(screen.getByLabelText("Sku Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Cost")).toBeInTheDocument();
  });

  it("adds a new SKU", () => {
    const { store } = setup();

    render(
      <Provider store={store}>
        <SkusPage />
      </Provider>
    );

    fireEvent.click(screen.getByText("Add SKU"));

    fireEvent.change(screen.getByLabelText("Sku Name"), {
      target: { value: "New SKU" },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "20.50" },
    });
    fireEvent.change(screen.getByLabelText("Cost"), {
      target: { value: "10.50" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(store.dispatch).toHaveBeenCalledWith(
      addSku(expect.objectContaining({ label: "New SKU", price: 20.5, cost: 10.5 }))
    );
  });

  it("opens the edit SKU modal and updates an SKU", () => {
    const { store } = setup();

    render(
      <Provider store={store}>
        <SkusPage />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("edit-btn-SKU1"));

    fireEvent.change(screen.getByLabelText("Sku Name"), {
      target: { value: "Updated SKU" },
    });
    fireEvent.click(screen.getByText("Save"));

    expect(store.dispatch).toHaveBeenCalledWith(
      updateSku(expect.objectContaining({ id: "SKU1", label: "Updated SKU" }))
    );
  });

  it("deletes an SKU", () => {
    const { store } = setup();

    render(
      <Provider store={store}>
        <SkusPage />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("delete-btn-SKU1"));
    fireEvent.click(screen.getByText("Delete"));

    expect(store.dispatch).toHaveBeenCalledWith(deleteSku("SKU1"));
  });

  it("cancels deleting an SKU", () => {
    const { store } = setup();

    render(
      <Provider store={store}>
        <SkusPage />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("delete-btn-SKU1"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(store.dispatch).not.toHaveBeenCalledWith(deleteSku("SKU1"));
  });
});
