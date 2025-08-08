import { api } from "@/lib/axios";

export interface RegisterRestauranteBody {
  restaurantName: string
  email: string;
  manager: string;
  phone: string;
}

export async function registerRestaurant({
restaurantName,
  email,
  manager,
  phone,
}: RegisterRestauranteBody) {
  await api.post("/restaurants", {
    restaurantName,
    email,
    manager,
    phone,
  });
}
