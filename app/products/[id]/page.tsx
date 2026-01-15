'use client';

import { use } from 'react'; // <--- 1. IMPORT THIS
import { products } from "../../../lib/products"; 
import { useCart } from "../../../context/CartContext"; 
import { notFound } from "next/navigation";
import { Check, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

// 2. UPDATE TYPE: params is a Promise now
export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 3. UNWRAP THE PROMISE
  const { id } = use(params);

  // 4. Use 'id' (not params.id)
  const product = products.find((p) => p.id === id);

  const { addToCart, openCart } = useCart();

  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center items-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* LEFT: IMAGE */}
          <div className="relative bg-gray-100 aspect-square md:aspect-auto flex items-center justify-center p-8">
            <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium transition-colors bg-white/80 backdrop-blur px-4 py-2 rounded-full">
               <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" 
            />
          </div>

          {/* RIGHT: DETAILS */}
          <div className="p-10 md:p-16 flex flex-col justify-center">
            
            <div className="mb-6">
              <span className="text-blue-600 font-bold tracking-wider text-xs uppercase mb-2 block">
                {product.category} • Imported from {product.origin}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-3xl text-gray-900 font-bold">${product.price}</p>
            </div>

            <p className="text-gray-500 leading-relaxed mb-8 text-lg">
              Classic design with modern comfort. Direct from {product.origin}. 
              This authentic item is sourced directly from verified distributors. 
              Includes original packaging and warranty.
            </p>

            {/* FEATURES LIST */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-green-100 p-1 rounded-full">
                   <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium">In Stock & Ready to Ship</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-blue-100 p-1 rounded-full">
                   <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">Free International Air Cargo</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="bg-yellow-100 p-1 rounded-full">
                   <ShieldCheck className="w-4 h-4 text-yellow-600" />
                </div>
                <span className="font-medium">100% Authenticity Guarantee</span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  addToCart(product); 
                  openCart();         
                }}
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
              >
                Add to Cart
              </button>
              
              <button className="px-6 py-4 rounded-xl font-bold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all">
                Wishlist
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}