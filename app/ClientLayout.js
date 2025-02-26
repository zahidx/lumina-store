"use client";

import { usePathname } from "next/navigation";
import Navbar from "./compo/Navbar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Hide Navbar on /dashboard
  const hideNavbarRoutes = ["/dashboard"];

  return (
    <>
      {!hideNavbarRoutes.includes(pathname) && <Navbar />}
      {children}
    </>
  );
}
