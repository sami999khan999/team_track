"use client";

import React from "react";
import NavLinks from "./NavLinks";
import { usePathname } from "next/navigation";

const ModileNav = () => {
  const pathname = usePathname();

  // Hide the sidebar on login or signup pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <div className="w-full xl:hidden fixed bottom-0 bg-secondary z-50">
      <NavLinks />
    </div>
  );
};

export default ModileNav;
