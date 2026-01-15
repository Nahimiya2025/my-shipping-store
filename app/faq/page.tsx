'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  // CONFIG: Your Telegram Bot Username
  const TELEGRAM_USERNAME = "Yourbuddyabroad_bot"; 

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "It's simple! Browse our products, add them to your cart, and proceed to checkout. At the end, you will be redirected to our Telegram Bot to confirm payment and shipping details."
    },
    {
      question: "How long does shipping take?",
      answer: "Since we ship via International Air Cargo directly from the USA/UK/Japan, delivery typically takes 7-12 business days. You can track your order status on our Tracking page."
    },
    {
      question: "Is there a service fee?",
      answer: "Yes. Our price includes the original product cost + a small service fee for sourcing, handling customs, and international shipping logistics."
    },
    {
      question: "Do you sell authentic products?",
      answer: "Absolutely. We only purchase directly from official brand stores or authorized distributors in the country of origin. 100% authenticity is guaranteed."
    },
    {
      question: "What if my item arrives damaged?",
      answer: "We inspect every item before shipping. However, if damage occurs during transit, please send us a photo via Telegram within 24 hours of delivery, and we will resolve it immediately."
    },
    {
      question: "Can I request a specific product not on the site?",
      answer: "Yes! Send us a link or photo of the item you want on Telegram, and we will give you a quote for buying and shipping it to you."
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-500 mt-2">Everything you need to know about our shipping service.</p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* CONTACT BOX */}
        <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
          <h3 className="font-bold text-gray-900 text-lg mb-2">Still have questions?</h3>
          <p className="text-gray-500 mb-6">We are available 24/7 on Telegram to help you.</p>
          
          <a 
            href={`https://t.me/${TELEGRAM_USERNAME}`}
            target="@Yourbuddyabroad_bot"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            <MessageCircle className="w-5 h-5" /> Chat with Support
          </a>
        </div>

      </div>
    </main>
  );
}

// Helper Component for Accordion Animation
function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 hover:bg-gray-50 transition-colors"
      >
        {question}
        {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      
      {/* CSS Animation Logic */}
      <div 
        className={`px-5 text-gray-600 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {answer}
      </div>
    </div>
  );
}