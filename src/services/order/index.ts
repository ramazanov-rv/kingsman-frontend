import axios from "axios";

interface Order {
  user_id: number;
  amount: number;
  product_name: string;
  size: string;
  color: string;
  quantity: number;
}

export async function createOrder(order: Order) {
  const response = await axios.post(
    "http://109.196.98.31:5000/api/create-order",
    order
  );
  return response.data;
}
