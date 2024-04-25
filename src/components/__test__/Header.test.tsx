import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TotalContext, Product } from "../../contexts/TotalsContext";
import Header from "../Header";
import {
  emptyData,
  fakeDataSingle,
  fakeDataMultiple,
} from "../../utils/testData";

const MockHeader = ({ data }: { data: Product[] }) => {
  const mockSetProducts = vi.fn();
  const mockSaveNewProduct = vi.fn();
  const mockUpdateProduct = vi.fn();

  return (
    <TotalContext.Provider
      value={{
        products: data,
        setProducts: mockSetProducts,
        saveNewProduct: mockSaveNewProduct,
        updateProduct: mockUpdateProduct,
      }}
    >
      <Header />
    </TotalContext.Provider>
  );
};

describe("Header", () => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();

  test("Renders properly", () => {
    render(<MockHeader data={emptyData} />);
  });

  test("Total 0 on render", () => {
    render(<MockHeader data={emptyData} />);

    const totalElement = screen.getByRole("heading", { level: 3 });
    expect(totalElement.textContent).toBe("Total Weight: 0 lbs.");
  });

  test("Renders weight for single product from context", () => {
    render(<MockHeader data={fakeDataSingle} />);

    const totalElement = screen.getByRole("heading", { level: 3 });
    expect(totalElement.textContent).toBe("Total Weight: 4 lbs.");
  });

  test("Renders weight for multiple product from context", () => {
    render(<MockHeader data={fakeDataMultiple} />);

    const totalElement = screen.getByRole("heading", { level: 3 });
    expect(totalElement.textContent).toBe("Total Weight: 193 lbs.");
  });
});
