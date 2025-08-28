import { api } from "@/lib/axios";

export interface GetMonthRevenueResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
  const response = await api.get<GetMonthRevenueResponse>(
    "/metrics/mounth-receipt",
  );
  return response.data;
}
