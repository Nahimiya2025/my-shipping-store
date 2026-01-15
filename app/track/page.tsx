'use client';

import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<'idle' | 'searching' | 'found' | 'error'>('idle');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('searching');

    // SIMULATE API SEARCH
    setTimeout(() => {
      if (orderId.toUpperCase().startsWith('ORD-') && orderId.length > 5) {
        setStatus('found');
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Shipment</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Enter your Order ID (sent via Telegram/Email) to see the current status of your international delivery.
          </p>
        </div>

        {/* SEARCH BOX */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              placeholder="e.g. ORD-829102" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase"
            />
            <button 
              type="submit"
              disabled={status === 'searching'}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {status === 'searching' ? 'Locating...' : 'Track Order'}
            </button>
          </form>
          {status === 'error' && (
            <p className="text-red-500 text-sm mt-3 font-medium animate-pulse">
              ❌ Order not found. Please check your ID and try again.
            </p>
          )}
        </div>

        {/* RESULTS: TIMELINE */}
        {status === 'found' && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-slide-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
              <div>
                <p className="text-sm text-gray-500 uppercase font-bold">Order Reference</p>
                <p className="text-xl font-mono font-bold text-gray-900">{orderId.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 uppercase font-bold">Estimated Delivery</p>
                <p className="text-lg font-semibold text-green-600">7-12 Business Days</p>
              </div>
            </div>

            {/* TIMELINE STEPS */}
            <div className="relative space-y-8 pl-8 border-l-2 border-gray-200 ml-4">
              
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-[41px] bg-green-500 rounded-full p-2 text-white shadow-lg shadow-green-200">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Order Placed & Confirmed</h3>
                  <p className="text-sm text-gray-500">We have received your order details.</p>
                  <p className="text-xs text-gray-400 mt-1">Oct 24, 10:30 AM</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-[41px] bg-blue-600 rounded-full p-2 text-white shadow-lg shadow-blue-200 animate-pulse">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-600">Processing in Warehouse</h3>
                  <p className="text-sm text-gray-600">Your item is being inspected and packed.</p>
                  <p className="text-xs text-blue-500 font-medium mt-1">In Progress...</p>
                </div>
              </div>

              {/* Step 3 (Pending) */}
              <div className="relative opacity-50">
                <div className="absolute -left-[41px] bg-gray-200 rounded-full p-2 text-gray-500">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Shipped via Air Cargo</h3>
                  <p className="text-sm text-gray-500">Pending International Customs clearance.</p>
                </div>
              </div>

              {/* Step 4 (Pending) */}
              <div className="relative opacity-50">
                <div className="absolute -left-[41px] bg-gray-200 rounded-full p-2 text-gray-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Out for Delivery</h3>
                  <p className="text-sm text-gray-500">Arriving at your local address.</p>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
              <Link href="/" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                 Return to Shop <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}