import { Helmet } from "react-helmet-async";
import { AmoutRevenueCard } from "./amout-revenue-card";
import { MonthOrdersAmountCard } from "./month-orders-amount-card";
import { DayOrdersAmountCard } from "./day-orders-amount-card";
import { MonthCancelOrdersAmount } from "./month-cancel-orders-amount";
import { ReviewChart } from "./reviewChart";
import { PopularProductsChart } from "./popular-products-charts";

export function Dash() {
  return (
    <>
      <Helmet title="Dashborad" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashborad</h1>

        <div className="grid grid-cols-4 gap-4">
          <AmoutRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCancelOrdersAmount />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <ReviewChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
