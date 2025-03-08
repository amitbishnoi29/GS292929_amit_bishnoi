import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import storesReducer, { updateStore, deleteStore } from "../store/storesSlice";
import StoresPage from "../pages/StoresPage";
import skusReducer from "../store/skusSlice";
import planningReducer from "../store/planningSlice";
import { RootState } from "../store";

// Define initial test state
const initialState: RootState = {
  stores: [
    { id: "1", seqNo: 1, label: "Store A", city: "City A", state: "State A" },
    { id: "2", seqNo: 2, label: "Store B", city: "City B", state: "State B" },
  ],
  skus:[],
  planning: {rows:[]},
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

describe("StoresPage Component", () => {
  it("renders StoresPage component with table headers", () => {
    const { store } = setup();

    render(
      <Provider store={store}>
        <StoresPage />
      </Provider>
    );

    expect(screen.getByText("Stores Management")).toBeInTheDocument();
    expect(screen.getByText("SNo.")).toBeInTheDocument();
    expect(screen.getByText("Store")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
  });

  it("opens edit dialog when clicking edit icon", async () => {
    const { store } = setup();

    render(
      <Provider store={store}>
        <StoresPage />
      </Provider>
    );

    const editButtons = screen.getAllByTestId("edit-button"); // Get all edit buttons
    fireEvent.click(editButtons[0]); // Click the first edit button

    expect(await screen.findByText("Edit Store")).toBeInTheDocument();
  });

  it("updates store details on save", () => {
    const { store } = setup();

    render(
      <Provider store={store}>
        <StoresPage />
      </Provider>
    );

    const editButtons = screen.getAllByTestId("edit-button"); // Get all buttons
    fireEvent.click(editButtons[0]); // Click the first edit button

    const input = screen.getByLabelText("Store Name");
    fireEvent.change(input, { target: { value: "Updated Store" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      updateStore(expect.objectContaining({ label: "Updated Store" }))
    );
  });

  it("opens delete confirmation dialog when clicking delete icon", () => {
    const { store } = setup();

    render(
      <Provider store={store}>
        <StoresPage />
      </Provider>
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("deletes store on confirmation", () => {
    const { store } = setup();

    render(
      <Provider store={store}>
        <StoresPage />
      </Provider>
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    const confirmDeleteButton = screen.getByText("Delete");
    fireEvent.click(confirmDeleteButton);

    expect(store.dispatch).toHaveBeenCalledWith(deleteStore("1"));
  });
});
