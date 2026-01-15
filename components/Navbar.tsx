'use client';

import Link from "next/link";
import { ShoppingCart, Search, Globe, Menu } from "lucide-react";
import { useCart } from "../context/CartContext"; 
import { useRouter } from "next/navigation"; 
import { useState } from "react";

export function Navbar() {
  const { cartCount, openCart } = useCart(); 
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (query.trim() === "") {
        router.push("/");
      } else {
        router.push(`/?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* BRAND LOGO: GLOBE INSIDE CART */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-all shadow-blue-200 shadow-lg">
            {/* The Cart */}
            <ShoppingCart className="text-white w-5 h-5 absolute translate-y-1" />
            {/* The Globe (Positioned inside) */}
            <Globe className="text-white w-3.5 h-3.5 absolute -translate-y-2" strokeWidth={2.5} />
          </div>
          
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-gray-900 leading-none tracking-tight hidden md:block">
              Your Abroad Shipping Mall
            </span>
            <span className="text-lg font-extrabold text-gray-900 leading-none tracking-tight md:hidden">
              YASM
            </span>
            <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase hidden md:block">
              Global Shopping Agent
            </span>
          </div>
        </Link>

        {/* SEARCH BAR */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <input 
            type="text" 
            placeholder="Search products from USA, UK, Japan..." 
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm transition-all placeholder:text-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <Search className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-6">
          <Link href="/track" className="hidden md:block text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
            Track Order
          </Link>
          
          <div 
            className="relative cursor-pointer group"
            onClick={openCart} 
          >
            <div className="p-2.5 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-[11px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-bounce-short shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}