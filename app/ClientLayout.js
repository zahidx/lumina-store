"use client";

import { usePathname } from "next/navigation";
import Navbar from "./compo/Navbar";
import Footer from "./compo/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Hide Navbar on /dashboard
  const hideNavbarRoutes = ["/dashboard"];

  return (
    <>
      {!hideNavbarRoutes.includes(pathname) && <Navbar />}
      
      {children}
      {!hideNavbarRoutes.includes(pathname) && <Footer />}
    </>
  );
}
