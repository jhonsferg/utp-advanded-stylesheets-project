export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface IOrder {
  id: string;
  userId: string;
  items: IOrderItem[];
  total: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  createdAt: Date;
}

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}
