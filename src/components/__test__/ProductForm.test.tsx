import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TotalContextProvider } from "../../contexts/TotalsContext";
import ProductForm from "../ProductForm";

describe("Product Form Test", () => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  // Add all components
  test("Component renders", () => {
    render(
      <TotalContextProvider>
        <ProductForm id={0} />
      </TotalContextProvider>
    );
    const productInputLabel = screen.getByRole("combobox", {
      name: "Select Product:",
    });
    const boxQuantityInput = screen.getByRole("spinbutton", {
      name: "Box Quantity:",
    });
    const outOfBoxInput = screen.getByRole("spinbutton", {
      name: "Out of Box Quantity:",
    });
    const productQuantity = screen.getByText("Product Quantity = 0 pcs.");
    const productWeight = screen.getByText("Pallet Weight = 0 lbs.");

    expect(productInputLabel).toBeInTheDocument();
    expect(boxQuantityInput).toBeInTheDocument();
    expect(outOfBoxInput).toBeInTheDocument();
    expect(productQuantity).toBeInTheDocument();
    expect(productWeight).toBeInTheDocument();
  });

  test("Product input changes ", () => {
    render(
      <TotalContextProvider>
        <ProductForm id={0} />
      </TotalContextProvider>
    );
    const productInputLabel = screen.getByRole("combobox", {
      name: "Select Product:",
    });
    fireEvent.change(productInputLabel, { target: { value: "ACS-34-15" } });

    expect(productInputLabel).toHaveValue("ACS-34-15");
  });

  test("Change value of box quantity", () => {
    render(
      <TotalContextProvider>
        <ProductForm id={0} />
      </TotalContextProvider>
    );

    const productInputLabel = screen.getByRole("combobox", {
      name: "Select Product:",
    });
    fireEvent.change(productInputLabel, { target: { value: "ACS-34-15" } });

    const boxQuantityInput = screen.getByRole("spinbutton", {
      name: "Box Quantity:",
    });
    fireEvent.change(boxQuantityInput, { target: { value: 3 } });
    expect(boxQuantityInput).toHaveValue(3);
  });

  test("Product boxes changes total quantity", () => {
    render(
      <TotalContextProvider>
        <ProductForm id={0} />
      </TotalContextProvider>
    );

    const productInputLabel = screen.getByRole("combobox", {
      name: "Select Product:",
    });
    fireEvent.change(productInputLabel, { target: { value: "ACS-34-15" } });

    const boxQuantityInput = screen.getByRole("spinbutton", {
      name: "Box Quantity:",
    });
    fireEvent.change(boxQuantityInput, { target: { value: 3 } });

    const productQuantity = screen.getByText("Product Quantity = 30 pcs.");

    expect(boxQuantityInput).toHaveValue(3);
    expect(productQuantity).toBeInTheDocument();
  });

  test("Product boxes change total weight", () => {
    render(
      <TotalContextProvider>
        <ProductForm id={0} />
      </TotalContextProvider>
    );

    const productInputLabel = screen.getByRole("combobox", {
      name: "Select Product:",
    });
    fireEvent.change(productInputLabel, { target: { value: "ACS-34-15" } });

    const boxQuantityInput = screen.getByRole("spinbutton", {
      name: "Box Quantity:",
    });
    fireEvent.change(boxQuantityInput, { target: { value: 3 } });

    const productWeight = screen.getByText("Pallet Weight = 90 lbs.");

    expect(boxQuantityInput).toHaveValue(3);
    expect(productWeight).toBeInTheDocument();
  });

  test("Out of box quantity value changes", async () => {
    render(
      <TotalContextProvider>
        <ProductForm id={0} />
      </TotalContextProvider>
    );

    const productInputLabel = screen.getByRole("combobox", {
      name: "Select Product:",
    });
    fireEvent.change(productInputLabel, { target: { value: "ACS-34-15" } });

    const outOfBoxInput = screen.getByRole("spinbutton", {
      name: "Out of Box Quantity:",
    });

    fireEvent.change(outOfBoxInput, { target: { value: 3 } });

    expect(outOfBoxInput).toHaveValue(3);
  });

  test("Out of box quantity changes product quantity", () => {
    render(
      <TotalContextProvider>
        <ProductForm id={0} />
      </TotalContextProvider>
    );

    const productInputLabel = screen.getByRole("combobox", {
      name: "Select Product:",
    });
    fireEvent.change(productInputLabel, { target: { value: "ACS-34-15" } });

    const outOfBoxInput = screen.getByRole("spinbutton", {
      name: "Out of Box Quantity:",
    });

    fireEvent.change(outOfBoxInput, { target: { value: 3 } });

    const productQuantity = screen.getByText("Product Quantity = 3 pcs.");

    expect(outOfBoxInput).toHaveValue(3);
    expect(productQuantity).toBeInTheDocument();
  });

  test("Out of box quantity changes product weight", () => {
    render(
      <TotalContextProvider>
        <ProductForm id={0} />
      </TotalContextProvider>
    );

    const productInputLabel = screen.getByRole("combobox", {
      name: "Select Product:",
    });
    fireEvent.change(productInputLabel, { target: { value: "ACS-34-15" } });

    const outOfBoxInput = screen.getByRole("spinbutton", {
      name: "Out of Box Quantity:",
    });

    fireEvent.change(outOfBoxInput, { target: { value: 3 } });

    const productWeight = screen.getByText("Pallet Weight = 9 lbs.");

    expect(outOfBoxInput).toHaveValue(3);
    expect(productWeight).toBeInTheDocument();
  });

  test("Both Inputs calculate together", () => {
    render(
      <TotalContextProvider>
        <ProductForm id={0} />
      </TotalContextProvider>
    );

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

    expect(boxQuantityInput).toHaveValue(3);
    expect(outOfBoxInput).toHaveValue(3);
    expect(productWeight).toBeInTheDocument();
    expect(productQuantity).toBeInTheDocument();
  });

  test("Both Inputs don't calculate if no product is selected", () => {
    render(
      <TotalContextProvider>
        <ProductForm id={0} />
      </TotalContextProvider>
    );

    const boxQuantityInput = screen.getByRole("spinbutton", {
      name: "Box Quantity:",
    });

    const outOfBoxInput = screen.getByRole("spinbutton", {
      name: "Out of Box Quantity:",
    });

    fireEvent.change(outOfBoxInput, { target: { value: 3 } });

    fireEvent.change(boxQuantityInput, { target: { value: 3 } });

    const productWeight = screen.getByText("Pallet Weight = 0 lbs.");

    const productQuantity = screen.getByText("Product Quantity = 0 pcs.");

    expect(boxQuantityInput).toHaveValue(0);
    expect(outOfBoxInput).toHaveValue(0);
    expect(productWeight).toBeInTheDocument();
    expect(productQuantity).toBeInTheDocument();
  });
});
