import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buy Me Chai",
  description: "Pay for Chai of your loved Content Creators and Developers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className=" bg-gray-900 text-white m-auto">
  
        <SessionWrapper>
        <Navbar/>
        <div className="min-h-[100vh] pt-[150px]">
        {children}
        </div>
        <Footer/>
        </SessionWrapper>
        </body>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
    </html>
  );
}
