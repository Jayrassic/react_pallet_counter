import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TotalContextProvider } from "../../contexts/TotalsContext";
import Header from "../Header";

[
  {
    id: 0,
    name: "ACS-10-40",
    totalWeight: 44,
    totalCount: 2,
  },
];

const MockHeader = () => {
  return (
    <TotalContextProvider
      value={[
        {
          id: 0,
          name: "ACS-10-40",
          totalWeight: 44,
          totalCount: 2,
        },
      ]}
    >
      <Header />
    </TotalContextProvider>
  );
};

describe("Header", () => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();

  test("Renders properly", () => {
    render(<MockHeader />);
  });

  test("Total 0 on render", () => {
    render(<MockHeader />);

    const totalElement = screen.getByRole("heading", { level: 3 });
    expect(totalElement).toBeInTheDocument();
  });
});
