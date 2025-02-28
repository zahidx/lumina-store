"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Navbar from "./compo/Navbar";
import Footer from "./compo/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (pathname) setCurrentPath(pathname);
  }, [pathname]);

  // Define routes where Navbar & Footer should be hidden
  const hideNavbarRoutes = useMemo(() => ["/dashboard"], []);

  const hideNavbar = hideNavbarRoutes.includes(currentPath);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideNavbar && <Footer />}
    </>
  );
}
