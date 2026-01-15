'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext'; 
import { ArrowLeft, CreditCard, Loader2, Send } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, cartTotal, closeCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const YOUR_BOT_USERNAME = "YourBotName_bot"; // Replace with your Bot Username

  // 1. UPDATED STATE WITH NEW FIELDS
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    phone: "",     // <--- Added
    email: "",     // <--- Added
    telegram: "",  // <--- Added
  });

  const BANK_DETAILS = "Bank of America: 123-456-7890";

  useEffect(() => {
    closeCart();
  }, [closeCart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total: cartTotal.toFixed(2),
          customer: formData
        }),
      });

      if (!res.ok) throw new Error('Order failed');

      // Open Bot and Redirect
      window.open(`https://t.me/${YOUR_BOT_USERNAME}`, '_blank');
      window.location.href = "/success";

    } catch (error) {
      alert("Error sending order. Please check the console.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) return <div className="p-10 text-center">Your cart is empty</div>;

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 mb-8 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Shipping & Contact</h2>
            
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              
              {/* NAME FIELDS */}
              <div className="grid grid-cols-2 gap-4">
                <input required name="firstName" onChange={handleInputChange} className="border border-gray-300 p-2 rounded-lg w-full" placeholder="First Name" />
                <input required name="lastName" onChange={handleInputChange} className="border border-gray-300 p-2 rounded-lg w-full" placeholder="Last Name" />
              </div>

              {/* ADDRESS FIELDS */}
              <input required name="address" onChange={handleInputChange} className="border border-gray-300 p-2 rounded-lg w-full" placeholder="Address" />
              <div className="grid grid-cols-2 gap-4">
                <input required name="city" onChange={handleInputChange} className="border border-gray-300 p-2 rounded-lg w-full" placeholder="City" />
                <input required name="zip" onChange={handleInputChange} className="border border-gray-300 p-2 rounded-lg w-full" placeholder="Zip Code" />
              </div>

              {/* 2. NEW CONTACT FIELDS */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Contact Info</h3>
                <div className="space-y-3">
                  <input required name="phone" type="tel" onChange={handleInputChange} className="border border-gray-300 p-2 rounded-lg w-full" placeholder="Phone Number" />
                  <input required name="email" type="email" onChange={handleInputChange} className="border border-gray-300 p-2 rounded-lg w-full" placeholder="Email Address" />
                  <input name="telegram" onChange={handleInputChange} className="border border-gray-300 p-2 rounded-lg w-full" placeholder="Telegram Username (Optional)" />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-6">
                <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-100 text-sm">
                   Please transfer <b>${cartTotal.toFixed(2)}</b> to: <br/>
                   <span className="font-mono bg-white px-1 rounded">{BANK_DETAILS}</span>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "Place Order Now"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl h-fit">
            <h3 className="font-bold mb-4 text-gray-900">Order Summary</h3>
            {items.map((item, i) => (
               <div key={i} className="flex justify-between text-sm mb-3 text-gray-600">
                 <span>{item.name}</span><span className="font-medium text-gray-900">${item.price}</span>
               </div>
            ))}
            <div className="border-t border-gray-200 pt-4 mt-4 font-bold text-lg flex justify-between text-gray-900">
               <span>Total</span><span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}