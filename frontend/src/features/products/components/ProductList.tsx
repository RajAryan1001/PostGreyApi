// src/features/products/components/ProductList.tsx
'use client';

import { Product } from '@/api/productApi';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-8 py-5 text-left font-medium">Name</th>
            <th className="px-8 py-5 text-left font-medium">Description</th>
            <th className="px-8 py-5 text-left font-medium">Price</th>
            <th className="px-8 py-5 text-left font-medium">Stock</th>
            <th className="px-8 py-5 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition">
              <td className="px-8 py-6 font-medium">{product.name}</td>
              <td className="px-8 py-6 text-gray-600 max-w-md truncate">
                {product.description || '—'}
              </td>
              <td className="px-8 py-6 font-medium">₹{product.price}</td>
              <td className="px-8 py-6">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {product.stock}
                </span>
              </td>
              <td className="px-8 py-6 text-center space-x-6">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}