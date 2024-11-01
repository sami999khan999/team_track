"use client";

import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
  {
    path: "/",
    name: "Dasnboard",
  },
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/",
    name: "Home",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/signup") {
    return;
  }

  return <aside className="h-screen w-[10rem] bg-black"></aside>;
};

export default Sidebar;
