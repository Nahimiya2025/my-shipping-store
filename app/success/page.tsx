'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, MessageCircle, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  const [orderId, setOrderId] = useState("");

  // 1. YOUR BOT/USERNAME HERE (For the "Contact Support" button)
  const TELEGRAM_USERNAME = "Yourbuddyabroad_bot"; 

  // 2. Generate Order ID safely on the client side
  useEffect(() => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setOrderId(`ORD-${randomNum}`);
  }, []);

  // Prevent flicker while ID generates
  if (!orderId) return <div className="min-h-screen bg-gray-50" />;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        
        {/* HEADER: GREEN SUCCESS */}
        <div className="bg-green-600 p-8 text-center">
          <div className="mx-auto bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Order Received!</h1>
          <p className="text-green-100">
            Thanks for shopping with us.
          </p>
        </div>

        {/* BODY: DETAILS */}
        <div className="p-8">
          
          {/* Order ID Box */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Order Reference</p>
                <p className="text-lg font-mono font-bold text-gray-900">{orderId}</p>
              </div>
            </div>
          </div>

          {/* WHAT HAPPENS NEXT? */}
          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-gray-900 border-b pb-2">What Happens Next?</h3>
            
            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <p className="text-sm text-gray-600">
                We have received your order details via Telegram automatically.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <p className="text-sm text-gray-600">
                Our team will review the stock and message you to confirm payment.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <p className="text-sm text-gray-600">
                Once paid, we will ship your item immediately!
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="space-y-3">
            
            <a 
              href={`https://t.me/${TELEGRAM_USERNAME}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-100 transition-colors border border-blue-100"
            >
              <MessageCircle className="w-5 h-5" /> Message Support
            </a>

            <Link href="/">
              <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                Continue Shopping <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

          </div>

        </div>
      </div>
    </main>
  );
}