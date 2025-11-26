import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { PaymentSummary } from "./PaymentSummary";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock("axios");
describe("Payment Summary component", () => {
  let paymentSummary;
  let loadCart;
  beforeEach(() => {
    paymentSummary = {
      totalItems: 11,
      productCostCents: 15232,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 15731,
      taxCents: 1573,
      totalCostCents: 17304,
    };
    loadCart = vi.fn();
  });

  it("display the dollar amount correct", async () => {
    render(
      <MemoryRouter>
        <PaymentSummary loadCart={loadCart} paymentSummary={paymentSummary} />
      </MemoryRouter>
    );
    const productCost = await screen.getByTestId("product-cost");
    expect(productCost).toHaveTextContent("152.32");
  });

  it("places an order", async () => {
    render(
      <MemoryRouter>
        <PaymentSummary loadCart={loadCart} paymentSummary={paymentSummary} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const placeOrderBtn = screen.getByTestId("place-order");
    await user.click(placeOrderBtn);

    expect(axios.post).toHaveBeenCalled("/api/orders");
    expect(loadCart).toHaveBeenCalled();
  });
});
