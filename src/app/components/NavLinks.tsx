"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiMemoPad } from "react-icons/ci";
import { FaFileInvoice } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { MdDashboard, MdOutlinePayment } from "react-icons/md";
import { RiCustomerServiceFill, RiMenuUnfoldLine } from "react-icons/ri";

export const navLinks = [
  { path: "/", name: "Dashboard", logo: <MdDashboard /> },
  { path: "/employees", name: "Employees", logo: <GrUserWorker /> },
  { path: "/customers", name: "Customers", logo: <RiCustomerServiceFill /> },
  { path: "/invoice", name: "Invoice", logo: <FaFileInvoice /> },
  { path: "/payment", name: "Payment", logo: <MdOutlinePayment /> },
  { path: "/memo", name: "Memo", logo: <CiMemoPad /> },
];

const NavLinks = () => {
  const pathName = usePathname();

  return (
    <div className="flex xl:flex-col justify-around xl:justify-between h-full">
      <div className="flex xl:flex-col justify-center xl:justify-start gap-4">
        {/* Sidebar Menu Icon */}
        <div className="hidden xl:block group  mb-6">
          <div className="relative px-6 py-5 mb-2 text-3xl gap-2">
            <RiMenuUnfoldLine className="transition-transform duration-300 group-hover:rotate-180 transform origin-center" />
            <p className="absolute top-[21px] left-[4.5rem] opacity-0 text-lg font-semibold tracking-wide transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              NFT
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        {navLinks.map((navItem, i) => (
          <Link
            key={i}
            href={navItem.path}
            className={`group flex items-center gap-2 px-1 xl:px-6 py-2 hover:bg-secondary-foreground/20 duration-300 ${
              pathName === navItem.path ? "bg-primary" : ""
            }`}
          >
            <div
              className={`text-xl xl:text-2xl text-secondary-foreground/80 ${
                pathName === navItem.path ? "text-white" : ""
              }`}
            >
              {navItem.logo}
            </div>
            <p
              className={`hidden xl:block opacity-0 text-lg font-semibold tracking-wide transition-opacity duration-300 ease-in-out group-hover:opacity-100 ${
                pathName === navItem.path ? "text-secondary" : ""
              }`}
            >
              {navItem.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;
