import { api } from "@/lib/axios";

export interface GetMonthCanceledOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
  const response = await api.get<GetMonthCanceledOrdersAmountResponse>(
    "/metrics/mounth-canceled-orders-amount",
  );
  return response.data;
}
