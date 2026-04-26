// src/app/products/page.tsx
'use client';

import { useState } from 'react';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/features/products/hooks/useProductApi';
import ProductForm from '@/features/products/components/ProductForm';
import ProductList from '@/features/products/components/ProductList';
import { Product } from '@/api/productApi';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data, isLoading } = useProducts(page, limit);
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const handleSubmit = async (formData: any) => {
    if (editingProduct) {
      await updateMutation.mutateAsync({ id: editingProduct.id, ...formData });
      setEditingProduct(null);
    } else {
      await createMutation.mutateAsync(formData);
    }
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Products Management</h1>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2 transition"
          >
            + Add New Product
          </button>
        </div>

        {/* Product Form */}
        {showForm && (
          <div className="mb-12">
            <ProductForm
              initialData={editingProduct || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          </div>
        )}

        {/* Product List */}
        {isLoading ? (
          <div className="text-center py-20 text-gray-500 text-lg">Loading products...</div>
        ) : (
          <>
            <ProductList
              products={data?.items || []}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {/* Pagination */}
            {data && data.total > 0 && (
              <div className="flex justify-center items-center gap-6 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-6 py-2 border rounded-xl disabled:opacity-50 hover:bg-gray-100"
                >
                  ← Previous
                </button>

                <span className="text-gray-700 font-medium">
                  Page {page} of {Math.ceil(data.total / limit)}
                </span>

                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page * limit >= data.total}
                  className="px-6 py-2 border rounded-xl disabled:opacity-50 hover:bg-gray-100"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}