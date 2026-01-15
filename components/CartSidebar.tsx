'use client';

import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import Link from "next/link"; // <--- IMPORT THIS

export function CartSidebar() {
  const { items, removeFromCart, cartTotal, isCartOpen, closeCart } = useCart();

  // If cart is closed, don't render anything to save performance
  if (!isCartOpen) return null;

  return (
    <div className="relative z-[999]">
      {/* 1. BACKDROP (Clicking dark area closes cart) */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={closeCart}
      />

      {/* 2. SIDEBAR PANEL */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* ITEMS LIST (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-gray-200" />
              <p className="text-gray-500">Your cart is empty.</p>
              <button onClick={closeCart} className="text-blue-600 font-medium hover:underline">
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={index} className="flex gap-4 animate-fade-in">
                {/* Image */}
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty 1</p>

                    <button
                      type="button"
                      onClick={() => removeFromCart(index)}
                      className="flex items-center gap-1 font-medium text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER (Total & Checkout) */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 mb-6">
              Shipping and taxes calculated at checkout.
            </p>
            
            {/* THE FIX: WRAPPED IN LINK + CLOSE CART ON CLICK */}
            <Link href="/checkout" onClick={closeCart}>
              <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg hover:bg-blue-700 transition-all active:scale-95">
                Checkout Now <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            
          </div>
        )}
      </div>
    </div>
  );
}