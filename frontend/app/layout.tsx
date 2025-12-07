import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import ClientProviders from '@/components/Common/ClientProviders';
import 'react-toastify/dist/ReactToastify.css';
import '@/globals.css';

export const metadata: Metadata = {
  title: 'BevShop - Buy Best Beverages Online',
  description: 'Your favorite beverages delivered to your door',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ClientProviders>
          <main className="min-h-screen">{children}</main>
        </ClientProviders>
        <footer className="bg-dark text-white py-8 mt-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">BevShop</h4>
                <p className="text-gray-400 text-sm">Your trusted online beverage store</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li><a href="/" className="hover:text-white transition">Home</a></li>
                  <li><a href="/products" className="hover:text-white transition">Shop</a></li>
                  <li><a href="/about" className="hover:text-white transition">About</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                  <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
                  <li><a href="/privacy" className="hover:text-white transition">Privacy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <p className="text-gray-400 text-sm">Email: info@bevshop.com</p>
                <p className="text-gray-400 text-sm">Phone: +62 123 4567</p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2024 BevShop. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
