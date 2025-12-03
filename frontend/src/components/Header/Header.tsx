'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MdShoppingCart, MdMenu, MdClose, MdSearch } from 'react-icons/md';
import { useAuth } from '@/hooks';
import useCartStore from '@/store/cartStore';
import { Button } from '@/components/Common';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemsCount = cart?.items.length || 0;

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            🥤 BevShop
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full">
              <MdSearch size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search beverages..."
                className="bg-transparent ml-2 outline-none text-gray-700 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/orders" className="text-gray-700 hover:text-primary transition-colors">
                  My Orders
                </Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="text-orange-600 hover:text-primary transition-colors font-semibold">
                    ⚙️ Admin
                  </Link>
                )}
                <Link href="/profile" className="text-gray-700 hover:text-primary transition-colors">
                  {user?.name}
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            <Link href="/cart" className="relative">
              <MdShoppingCart size={28} className="text-gray-700 hover:text-primary transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 flex flex-col gap-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
              <MdSearch size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search beverages..."
                className="bg-transparent ml-2 outline-none text-gray-700 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {isAuthenticated ? (
              <>
                <Link href="/orders" className="text-gray-700 hover:text-primary transition-colors">
                  My Orders
                </Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="text-orange-600 hover:text-primary transition-colors font-semibold">
                    ⚙️ Admin Dashboard
                  </Link>
                )}
                <Link href="/profile" className="text-gray-700 hover:text-primary transition-colors">
                  {user?.name}
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-primary transition-colors text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            <Link href="/cart" className="flex items-center gap-2">
              <MdShoppingCart size={24} />
              <span>Cart ({cartItemsCount})</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
