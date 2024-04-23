import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TotalContextProvider } from "../../contexts/TotalsContext";
import FormHolder from "../FormHolder";

const MockFormHolder = () => {
  return (
    <TotalContextProvider>
      <FormHolder />
    </TotalContextProvider>
  );
};

describe("Form Holder", () => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();

  test("Renders properly", () => {
    render(<MockFormHolder />);

    const addButton = screen.getByRole("button", {
      name: "Add Additional Form",
    });
    const clearButton = screen.getByRole("button", { name: "Clear All" });

    expect(addButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  test("Single form on render", () => {
    render(<MockFormHolder />);

    const productForms = screen.getAllByTestId("product-form");

    expect(productForms.length).toBe(1);
  });

  test("Adds form when clicked", () => {
    render(<MockFormHolder />);

    const addButton = screen.getByRole("button", {
      name: "Add Additional Form",
    });

    fireEvent.click(addButton);

    const productForms = screen.getAllByTestId("product-form");

    expect(productForms.length).toBe(2);
  });

  test("Removes all but one form", () => {
    render(<MockFormHolder />);

    const addButton = screen.getByRole("button", {
      name: "Add Additional Form",
    });

    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const clearButton = screen.getByRole("button", { name: "Clear All" });
    fireEvent.click(clearButton);

    const productForms = screen.getAllByTestId("product-form");

    expect(productForms.length).toBe(1);
  });

  test("Erases form inputs when clear button pushed", () => {
    render(<MockFormHolder />);
    const productInputLabel = screen.getByRole("combobox", {
      name: "Select Product:",
    });
    fireEvent.change(productInputLabel, { target: { value: "ACS-34-15" } });

    const boxQuantityInput = screen.getByRole("spinbutton", {
      name: "Box Quantity:",
    });

    const outOfBoxInput = screen.getByRole("spinbutton", {
      name: "Out of Box Quantity:",
    });

    fireEvent.change(outOfBoxInput, { target: { value: 3 } });

    fireEvent.change(boxQuantityInput, { target: { value: 3 } });

    const productWeight = screen.getByText("Pallet Weight = 99 lbs.");

    const productQuantity = screen.getByText("Product Quantity = 33 pcs.");

    expect(productQuantity).toBeInTheDocument();
    expect(productWeight).toBeInTheDocument();

    const clearButton = screen.getByRole("button", { name: "Clear All" });
    fireEvent.click(clearButton);

    expect(productQuantity).not.toBeInTheDocument();
    expect(productWeight).not.toBeInTheDocument();
  });
});
