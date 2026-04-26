// src/api/productApi.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
}

export interface ProductsResponse {
  success: boolean;
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

export const productApi = {
  getAll: async (page = 1, limit = 10) => {
    const { data } = await api.get<ProductsResponse>('/products', {
      params: { page, limit },
    });
    return data;
  },

  create: async (product: Omit<Product, 'id'>) => {
    const { data } = await api.post('/products', product);
    return data.data;
  },

  update: async (id: number, product: Partial<Product>) => {
    const { data } = await api.put(`/products/${id}`, product);
    return data.data;
  },

  delete: async (id: number) => {
    await api.delete(`/products/${id}`);
  },
};