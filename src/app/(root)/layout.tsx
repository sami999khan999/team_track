import React from "react";
import Sidebar from "../components/Sidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </main>
  );
};

export default layout;
