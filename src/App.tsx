import React, { useState, useEffect } from 'react';
import { ShoppingCart as CartIcon } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Success } from './pages/Success';
import getProducts from './data/products';
import { Product } from './types';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isSuccessPage = window.location.pathname === '/success';

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        setError('Failed to load products');
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (isSuccessPage) {
    return (
      <CartProvider>
        <Success />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">ShopEase</h1>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <CartIcon size={24} />
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              {error}
            </div>
          ) : isCartOpen ? (
            <Cart />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </CartProvider>
  );
}

export default App;


