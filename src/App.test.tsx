import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TotalContextProvider } from "./contexts/TotalsContext";
import App from "./App";

const MockApp = () => {
  return (
    <TotalContextProvider>
      <App />
    </TotalContextProvider>
  );
};

describe("Integration Test", () => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();

  test("Renders properly", () => {
    render(<MockApp />);
  });

  test("Inputs on single form Render results in heading ", () => {
    render(<MockApp />);

    // Selects product type
    const productInputLabel = screen.getByRole("combobox", {
      name: "Select Product:",
    });
    fireEvent.change(productInputLabel, { target: { value: "ACS-34-15" } });

    // Changes Box Amounts
    const boxQuantityInput = screen.getByRole("spinbutton", {
      name: "Box Quantity:",
    });
    fireEvent.change(boxQuantityInput, { target: { value: 3 } });

    // Inputs Out of Box Quantity
    const outOfBoxInput = screen.getByRole("spinbutton", {
      name: "Out of Box Quantity:",
    });
    fireEvent.change(outOfBoxInput, { target: { value: 3 } });

    const totalElement = screen.getByRole("heading", { level: 3 });

    expect(totalElement.textContent).toBe("Total Weight: 99 lbs.");
  });

  test("Inputs on Multiple form Render results in heading", () => {
    render(<MockApp />);

    const addButton = screen.getByRole("button", {
      name: "Add Additional Form",
    });

    fireEvent.click(addButton);

    const productInputLabel = screen.getAllByRole("combobox");
    fireEvent.change(productInputLabel[0], { target: { value: "ACS-34-15" } });
    fireEvent.change(productInputLabel[1], { target: { value: "ACS-12-26" } });

    // Changes Box Amounts
    const boxQuantityInput = screen.getAllByRole("spinbutton", {
      name: "Box Quantity:",
    });
    fireEvent.change(boxQuantityInput[0], { target: { value: 3 } });
    fireEvent.change(boxQuantityInput[1], { target: { value: 3 } });

    // Inputs Out of Box Quantity
    const outOfBoxInput = screen.getAllByRole("spinbutton", {
      name: "Out of Box Quantity:",
    });
    fireEvent.change(outOfBoxInput[0], { target: { value: 3 } });
    fireEvent.change(outOfBoxInput[1], { target: { value: 3 } });

    const totalElement = screen.getByRole("heading", { level: 3 });

    expect(totalElement.textContent).toBe("Total Weight: 234 lbs.");
  });

  test("Single form clears total in heading", () => {
    render(<MockApp />);

    // Selects product type
    const productInputLabel = screen.getByRole("combobox", {
      name: "Select Product:",
    });
    fireEvent.change(productInputLabel, { target: { value: "ACS-34-15" } });

    // Changes Box Amounts
    const boxQuantityInput = screen.getByRole("spinbutton", {
      name: "Box Quantity:",
    });
    fireEvent.change(boxQuantityInput, { target: { value: 3 } });

    // Inputs Out of Box Quantity
    const outOfBoxInput = screen.getByRole("spinbutton", {
      name: "Out of Box Quantity:",
    });
    fireEvent.change(outOfBoxInput, { target: { value: 3 } });

    const totalElement = screen.getByRole("heading", { level: 3 });

    const clearButton = screen.getByRole("button", { name: "Clear All" });
    fireEvent.click(clearButton);

    expect(totalElement.textContent).toBe("Total Weight: 0 lbs.");
  });

  test("Multiple forms clear total in heading", () => {
    render(<MockApp />);

    const addButton = screen.getByRole("button", {
      name: "Add Additional Form",
    });

    fireEvent.click(addButton);

    const productInputLabel = screen.getAllByRole("combobox");
    fireEvent.change(productInputLabel[0], { target: { value: "ACS-34-15" } });
    fireEvent.change(productInputLabel[1], { target: { value: "ACS-12-26" } });

    // Changes Box Amounts
    const boxQuantityInput = screen.getAllByRole("spinbutton", {
      name: "Box Quantity:",
    });
    fireEvent.change(boxQuantityInput[0], { target: { value: 3 } });
    fireEvent.change(boxQuantityInput[1], { target: { value: 3 } });

    // Inputs Out of Box Quantity
    const outOfBoxInput = screen.getAllByRole("spinbutton", {
      name: "Out of Box Quantity:",
    });
    fireEvent.change(outOfBoxInput[0], { target: { value: 3 } });
    fireEvent.change(outOfBoxInput[1], { target: { value: 3 } });

    const totalElement = screen.getByRole("heading", { level: 3 });

    const clearButton = screen.getByRole("button", { name: "Clear All" });
    fireEvent.click(clearButton);

    expect(totalElement.textContent).toBe("Total Weight: 0 lbs.");
  });
});
