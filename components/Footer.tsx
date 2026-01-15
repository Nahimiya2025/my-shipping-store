import Link from "next/link";
import { Globe, Instagram, Send, Mail, MapPin, Phone, ShoppingCart } from "lucide-react"; // <--- Added ShoppingCart

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* 1. BRAND INFO with NEW LOGO */}
          <div className="space-y-4">
            {/* NEW LOGO CODE START */}
            <div className="flex items-center gap-3 text-white font-bold text-xl">
              <div className="relative bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
                <ShoppingCart className="text-white w-5 h-5 absolute translate-y-1" />
                <Globe className="text-white w-3.5 h-3.5 absolute -translate-y-2" strokeWidth={2.5} />
              </div>
              <span>YASM</span>
            </div>
            {/* NEW LOGO CODE END */}

            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted partner for international shopping. We buy authentic products from the USA, UK, and Japan and deliver them directly to your doorstep.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Send className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          {/* 2. SHOP LINKS */}
          <div>
            <h3 className="text-white font-bold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Trending Now</Link></li>
              <li><Link href="/?q=fashion" className="hover:text-blue-400 transition-colors">Women's Fashion</Link></li>
              <li><Link href="/?q=toys" className="hover:text-blue-400 transition-colors">Kids & Toys</Link></li>
              <li><Link href="/track" className="hover:text-blue-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* 3. SUPPORT LINKS */}
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#how-it-works" className="hover:text-blue-400 transition-colors">How it Works</Link></li>
              <li><Link href="/track" className="hover:text-blue-400 transition-colors">Shipping Rates</Link></li>
              <li><span className="text-slate-600 cursor-not-allowed">Returns Policy (Coming Soon)</span></li>
              <li><Link href="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* 4. CONTACT */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>123 Global Trade Center,<br />Logistics City, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>support@yasm-shipping.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Your Abroad Shipping Mall. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-slate-300">Privacy Policy</span>
            <span className="cursor-pointer hover:text-slate-300">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}