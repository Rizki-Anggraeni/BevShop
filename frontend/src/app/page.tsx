'use client';

import { useState, useEffect } from 'react';
import { ProductGrid } from '@/components/Product';
import { LoadingSpinner, Pagination } from '@/components/Common';
import { productService } from '@/services';
import { Product } from '@/types';
import useCartStore from '@/store/cartStore';
import { cartService } from '@/services';
import { toast } from 'react-toastify';

const categories = ['soft_drink', 'juice', 'water', 'coffee', 'tea', 'energy_drink', 'other'];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, currentPage]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getAll({
        category: selectedCategory,
        page: currentPage,
        limit: 12,
      });
      setProducts(response.data || []);
      setTotalPages(response.pagination?.pages || 1);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      const response = await cartService.addToCart(productId, quantity);
      addItem({ product: products.find(p => p._id === productId)!, quantity });
      toast.success('Product added to cart');
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  return (
    <div className="bg-light min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to BevShop</h1>
          <p className="text-xl opacity-90">Discover the best beverages from around the world</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-12">
        {/* Filters */}
        <div className="mb-8">
          <h2 className="section-title mb-4">Shop by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedCategory(undefined);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <ProductGrid
              products={products}
              onAddToCart={handleAddToCart}
            />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
