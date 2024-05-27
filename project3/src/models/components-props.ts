export interface SizeDictionary {
  // [size: string]: number;
  size: string[];
}

export interface ProvinceDictionary {
  [province: string]: string;
}

// export type Products = {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   category: string;
//   brand: string;
//   retailPrice: number;
//   price: number;
//   recentlySold: number;
//   color: string;
//   releaseDate: string;
//   fullDescription: string;
//   size?: SizeDictionary;
// };

export type Products = {
  id: number;
  name: string;
  smallDescription: string;
  images: string[];
  category: string;
  brand: string;
  retailPrice: number;
  price: number;
  recentlySold: number;
  color: string;
  releaseYear: string;
  fullDescription: string;
  sizes: string[];
};

export type ProductCard = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};

// export type CartProduct = {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   color: string;
//   releaseYear: string;
//   size?: string;
//   quantity: number;
// };

export type CartProduct = {
  id: number;
  price: number;
  product: Products;
  quantity: number;
  size: string;
};

export type WishlistProduct = {
  id: number;
  price: number;
  product: Products;
  quantity: number;
  size: string;
};

export interface ShoppingCartListApiResponse {
  items: CartProduct[];
}

export interface WishlistApiResponse {
  items: WishlistProduct[];
}

export interface UserRole {
  role: number | undefined;
}

export interface Role {
  id: number;
  name: string;
}

export interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  size?: string;
}

export interface Order {
  id: number;
  address1: string;
  address2?: string;
  cardHolderName: string;
  city: string;
  price: number;
  province: string;
  purchaseDate: Date;
  items: OrderItem[];
  status: string;
}

export interface UserData {
  fullName: string;
  email: string;
  createdAt: string;
  role: Role;
  orders: Order[];
}

export interface ProductsApiResponse {
  content: Products[];
  totalPages: number;
}
