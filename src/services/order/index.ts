import { api } from "../api";

interface Order {
  user_id: number;
  amount: number;
  product_name: string;
  size: string;
  color: string;
  quantity: number;
}

export async function createOrder(order: Order) {
  const response = await api.post("/create-order", order);
  return response.data;
}
