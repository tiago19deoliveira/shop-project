import { api } from "@/lib/axios";

export interface RegisterRestauranteBody {
  restaurantName: string
  email: string;
  managerName: string;
  phone: string;
}

export async function registerRestaurant({
restaurantName,
  email,
  managerName,
  phone,
}: RegisterRestauranteBody) {
  await api.post("/restaurants", {
    restaurantName,
    email,
    managerName,
    phone,
  });
}
