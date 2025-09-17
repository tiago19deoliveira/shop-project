import { OrderStatus } from "./order-status"
import {render} from "@testing-library/react"

describe("OrderStatus", () => {
  it("should display the right text when orde status is pending", () => {
    const { getByTestId } = render(<OrderStatus status="pending" />);
     /* PEnDING */
    let badgeDot = getByTestId("badge-pending");
    let badgeText = getByTestId("badge-status");

    expect(badgeDot).toHaveClass("bg-slate-400");
    expect(badgeText).toHaveTextContent("Pendente");

  });

  it("should display the right text when orde status is canceled", () => {
        /*CANCELED*/
    const { getByTestId } = render(<OrderStatus status="canceled" />);

    let badgeDot = getByTestId("badge-canceled");
    let badgeText = getByTestId("badge-status");

    expect(badgeDot).toHaveClass("bg-rose-500");
    expect(badgeText).toHaveTextContent("Cancelado");

  });

    it("should display the right text when orde status is delivering", () => {
        /*DELIVERING*/
    const { getByTestId } = render(<OrderStatus status="delivering" />);
    
    let badgeDot = getByTestId("badge-delivering");
    let badgeText = getByTestId("badge-status");

    expect(badgeDot).toHaveClass("bg-amber-500");
    expect(badgeText).toHaveTextContent("Em entrega");

  });

//     it("should display the right text when orde status is processing", () => {
//         /*PROCESSING*/
//     const { getByTestId } = render(<OrderStatus status="processing" />);
    
//     let badgeDot = getByTestId("badge-processing");
//     let badgeText = getByTestId("badge-status");

//     expect(badgeDot).toHaveClass("bg-amber-500");
//     expect(badgeText).toHaveTextContent("Em Preparo");

//   });

    it("should display the right text when orde status is delivered", () => {
        /*DELIVERED*/
    const { getByTestId } = render(<OrderStatus status="delivered" />);
    
    let badgeDot = getByTestId("badge-delivered");
    let badgeText = getByTestId("badge-status");

    expect(badgeDot).toHaveClass("bg-emerald-500");
    expect(badgeText).toHaveTextContent("Entregue");

  });

});