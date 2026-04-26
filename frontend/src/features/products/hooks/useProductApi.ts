// src/features/products/hooks/useProductApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi, Product, ProductsResponse } from '@/api/productApi';

export const useProducts = (page: number = 1, limit: number = 10) => {
  return useQuery<ProductsResponse>({
    queryKey: ['products', page, limit],
    queryFn: () => productApi.getAll(page, limit),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Product>) =>
      productApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};