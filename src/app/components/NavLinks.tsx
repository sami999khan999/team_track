"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { CiMemoPad } from "react-icons/ci";
import { FaFileInvoice } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
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
  const path = useRouter();
  const pathName = usePathname();

  const logOutHandler = () => {
    const cookieName = "userSession";
    document.cookie = `${cookieName}=; Max-Age=0; path=/`;

    const cookieDeleted = !document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${cookieName}=`));

    if (cookieDeleted) {
      path.push("/login");
    }
  };

  return (
    <div className="flex xl:flex-col justify-around xl:justify-between h-full ">
      <div className="flex xl:flex-col justify-center xl:justify-start gap-5 ">
        <div className="hidden xl:flex p-6 mb-2 text-3xl group">
          <RiMenuUnfoldLine className="transition-transform duration-300 group-hover:rotate-180 transform origin-center" />
        </div>
        {navLinks.map((navItem, i) => (
          <Link
            key={i}
            href={navItem.path}
            className={`flex items-center gap-2 px-1 xl:px-6 py-4 hover:bg-primary/80 duration-300  ${
              pathName === navItem.path ? "bg-primary" : ""
            }`}
          >
            <div
              className={`text-2xl xl:text-3xl text-gray-500 ${
                pathName === navItem.path ? "text-gray-200" : ""
              }`}
            >
              {navItem.logo}
            </div>
            <p
              className={`hidden xl:block xl:opacity-0 text-lg font-semibold tracking-wide xl:group-hover:opacity-100 transform group-hover:translate-x-0 transition-all duration-300 ease-in-out ${
                pathName === navItem.path ? "text-secondary" : ""
              }`}
            >
              {navItem.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-5 xl:p-6" onClick={logOutHandler}>
        <div className="text-2xl xl:text-3xl text-slate-700">
          <FiLogOut />
        </div>
        <p className="hidden xl:block xl:opacity-0 text-lg font-semibold tracking-wide xl:group-hover:opacity-100 transform group-hover:translate-x-0 transition-all duration-300 ease-in-out">
          Logout
        </p>
      </div>
    </div>
  );
};

export default NavLinks;
