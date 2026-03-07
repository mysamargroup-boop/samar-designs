export interface Product {
  id: string;
  slug?: string;
  name: string;
  description: string;
  regular_price: number;
  sale_price: number;
  imageUrl: string;
  additionalImages?: string[];
  images?: string[];
  category: string;
  subcategory?: string | null;
  weight?: string;
  dimensions?: string;
  tags?: string[];
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}