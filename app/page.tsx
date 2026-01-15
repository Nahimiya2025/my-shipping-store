'use client';

import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, ShoppingBag, XCircle, CreditCard, PackageCheck, Plane } from "lucide-react";
import { products } from "../lib/products";       
import { useCart } from "../context/CartContext"; 
import { useSearchParams } from "next/navigation"; 
import { Suspense } from "react"; 

// --- 0. CUSTOM ANIMATIONS (INJECTED STYLES) ---
// This makes the background blobs float and move
const animatedStyles = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes shimmer {
    from { background-position: 0 0; }
    to { background-position: -200% 0; }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  .animate-shimmer {
    background: linear-gradient(to right, #4f46e5 20%, #bfdbfe 40%, #4f46e5 60%);
    background-size: 200% auto;
    color: #000;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }
`;

// --- 1. HOW IT WORKS SECTION ---
function HowItWorks() {
  const steps = [
    {
      title: "1. You Order",
      desc: "Choose items from our catalog or send us a link.",
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      color: "bg-blue-600"
    },
    {
      title: "2. We Buy For You",
      desc: "We purchase the authentic product directly from the source.",
      icon: <CreditCard className="w-8 h-8 text-white" />,
      color: "bg-purple-600"
    },
    {
      title: "3. Service Fee Only",
      desc: "You pay the product price + a small service fee.",
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      color: "bg-green-600"
    },
    {
      title: "4. We Ship Global",
      desc: "We handle customs and air cargo directly to your door.",
      icon: <Plane className="w-8 h-8 text-white" />,
      color: "bg-orange-600"
    }
  ];

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 relative z-10 -mt-20">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-500 mt-2">Simple, transparent international shopping.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-100 -z-10 transform translate-y-4"></div>

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}>
                {step.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 2. PRODUCT GRID ---
function ProductGrid() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || ""; 

  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-6 pb-24 pt-10">
      <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {query ? `Results for "${query}"` : "Trending Items"}
          </h2>
          <p className="text-gray-500 mt-2">
            {query ? `Found ${filteredProducts.length} items` : "Popular imports available now."}
          </p>
        </div>
        
        {query ? (
          <Link href="/" className="text-red-500 font-bold flex items-center gap-1 hover:bg-red-50 px-4 py-2 rounded-lg transition-all">
            <XCircle className="w-4 h-4" /> Clear
          </Link>
        ) : (
          <Link href="/products" className="text-blue-600 font-bold flex items-center gap-1 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
              
              <Link href={`/products/${product.id}`} className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                      {product.tag}
                    </span>
                  )}
              </Link>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wide">
                  {product.category}
                </div>
                
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all shadow-lg active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <p className="text-xl text-gray-500">No products found for "{query}"</p>
          <Link href="/" className="text-blue-600 font-bold hover:underline mt-2 inline-block">
            View all products
          </Link>
        </div>
      )}
    </section>
  );
}

// --- 3. MAIN PAGE LAYOUT ---
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      
      {/* INJECT ANIMATION STYLES */}
      <style>{animatedStyles}</style>
      
      {/* --- ROBUST ANIMATED HERO SECTION --- */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-32 pb-48 text-center text-white">
        
        {/* 1. ANIMATED BLOBS (The Lava Lamp Effect) */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* 2. DARK OVERLAY GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-gray-50/100"></div>
        
        {/* 3. GRID PATTERN */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

        {/* 4. CONTENT */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 space-y-8">
          
          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-900/30 px-5 py-2 text-sm font-medium text-blue-200 backdrop-blur-md shadow-lg shadow-blue-500/20">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
             </span>
             Trusted International Shipping Agent
          </div>
          
          {/* Headline with SHIMMER EFFECT */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-2xl">
            You Order. We Buy. <br />
            <span className="animate-shimmer">
              We Ship to You.
            </span>
          </h1>
          
          {/* Subtext */}
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            We buy authentic products from abroad on your behalf. 
            You only pay the product cost + a small service fee.
          </p>
          
          {/* Glass Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <button 
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 hover:scale-105 transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              Start Shopping 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm">
              View Shipping Rates
            </button>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* TRUST BADGES */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 md:gap-16 text-gray-500 text-sm font-bold px-6 flex-wrap uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span>Authenticity Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <span>Fast Air Cargo</span>
          </div>
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-purple-600" />
            <span>Quality Inspection</span>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <Suspense fallback={<div className="p-20 text-center">Loading Products...</div>}>
        <ProductGrid />
      </Suspense>

    </main>
  );
}