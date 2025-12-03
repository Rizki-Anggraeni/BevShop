'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MdAddShoppingCart, MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { Product } from '@/types';
import { Button } from '@/components/Common';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
  isLoading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isLoading = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product._id, 1);
  };

  return (
    <div className="card overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden bg-gray-200 h-48">
        <Image
          src={product.image || 'https://via.placeholder.com/300x200'}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          {isFavorite ? (
            <MdFavorite size={20} className="text-red-500" />
          ) : (
            <MdFavoriteBorder size={20} />
          )}
        </button>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col h-full">
        <div className="mb-2">
          <span className="text-xs font-semibold text-primary bg-primary bg-opacity-10 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 line-clamp-1 mt-1">{product.brand}</p>

        <div className="flex items-center gap-1 mt-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <AiFillStar
                key={i}
                size={14}
                className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-1 mt-auto mb-3">
          <span className="text-lg font-bold text-primary">Rp {product.price.toLocaleString('id-ID')}</span>
          <span className="text-xs text-gray-500">{product.volume}</span>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isLoading}
          isLoading={isLoading}
          variant="primary"
          size="sm"
          className="w-full flex items-center justify-center gap-2"
        >
          <MdAddShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
