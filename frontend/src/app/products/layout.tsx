// src/app/products/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Product Manager',
  description: 'Manage your products - Create, Read, Update, Delete',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}