import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { CartSidebar } from "../components/CartSidebar";
import { CartProvider } from "../context/CartContext";
import { Footer } from "../components/Footer"; // <--- 1. Import This

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Abroad Shipping Mall",
  description: "We buy and ship international products to you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <CartSidebar />
          
          {/* 2. Ensure children take up available space so Footer sits at bottom */}
          <div className="flex flex-col min-h-screen"> 
            <div className="flex-grow">
              {children}
            </div>
            <Footer /> {/* <--- 3. Add Footer here */}
          </div>

        </CartProvider>
      </body>
    </html>
  );
}