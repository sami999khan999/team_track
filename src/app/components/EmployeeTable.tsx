"use client";

import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineSort } from "react-icons/md";

const employees = [
  {
    id: 1,
    name: "Alice Smith",
    address: "123 Maple St",
    phone: "555-1234",
    nid: "NID123456",
  },
  {
    id: 2,
    name: "Bob Johnson",
    address: "456 Oak St",
    phone: "555-5678",
    nid: "NID234567",
  },
  {
    id: 3,
    name: "Charlie Brown",
    address: "789 Pine St",
    phone: "555-8765",
    nid: "NID345678",
  },
  {
    id: 4,
    name: "David Williams",
    address: "101 Elm St",
    phone: "555-4321",
    nid: "NID456789",
  },
  {
    id: 5,
    name: "Emma Davis",
    address: "202 Cedar St",
    phone: "555-1357",
    nid: "NID567890",
  },
  {
    id: 6,
    name: "Frank Miller",
    address: "303 Birch St",
    phone: "555-2468",
    nid: "NID678901",
  },
  {
    id: 7,
    name: "Grace Wilson",
    address: "404 Walnut St",
    phone: "555-3699",
    nid: "NID789012",
  },
  {
    id: 8,
    name: "Henry Moore",
    address: "505 Aspen St",
    phone: "555-4810",
    nid: "NID890123",
  },
  {
    id: 9,
    name: "Ivy Taylor",
    address: "606 Redwood St",
    phone: "555-5911",
    nid: "NID901234",
  },
  {
    id: 10,
    name: "Jack Anderson",
    address: "707 Willow St",
    phone: "555-6022",
    nid: "NID012345",
  },
];

const EmployeeTable = () => {
  const totalPages = 10;

  const [currentPage, setCurrentPage] = useState<number>();

  return (
    <div className="w-full h-full bg-white rounded-t-[1.3rem] mt-6 p-4 xl:p-6">
      <div className="flex flex-col xl:flex-row gap-4 justify-between text-center">
        <div className="text-lg xl:text-2xl font-semibold tracking-wide text-secondary-foreground">
          Employee Table
        </div>
        <div className="flex gap-2 justify-around">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-200 w-[50%] xl:w-[20rem] h-10 xl:h-14 rounded-md text-base"
          />
          <div className="flex  gap-2">
            <div className="border flex items-center gap-2 px-2 xl:px-4 rounded-md">
              <IoFilterSharp />

              <p>Filter</p>
            </div>
            <div className="border flex items-center gap-2 px-2 xl:px-4 rounded-md">
              <MdOutlineSort />
              <p>Sort</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}

      <div>
        <div className="flex justify-between border px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 mt-3 text-xs bg-secondary text-secondary-foreground">
          <p className="w-1/12">ID</p> {/* Fixed width for ID */}
          <p className="flex-1">Name</p>
          <p className="flex-1">Address</p>
          <p className="flex-1">Phone</p>
          <p className="flex-1">Nid</p>
          <p className="">Action</p>
        </div>
        <div>
          {employees.map((employee, i) => {
            return (
              <div
                key={i}
                className={`flex justify-between border-b px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 text-xs bg-white text-secondary-foreground`}
              >
                <div className="w-1/12">{employee.id}</div>{" "}
                {/* Fixed width for ID */}
                <div className="flex-1">{employee.name}</div>
                <div className="flex-1">{employee.address}</div>
                <div className="flex-1">{employee.phone}</div>
                <div className="flex-1">{employee.nid}</div>
                <div className="bg-secondary px-2 py-1">
                  <HiDotsHorizontal />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex mt-5 justify-center">
        <button>
          <IoIosArrowBack />
        </button>
        <div className="mx-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`mx-1 px-2 py-1 rounded ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "bg-secondary"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
        <button>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;

// import React, { useState } from 'react';
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// const Pagination = () => {
//   const [currentPage, setCurrentPage] = useState(4); // Starting at page 4
//   const totalPages = 20; // Total number of pages
//   const visiblePagesCount = 6; // Number of pages to show at a time

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(prev => prev - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(prev => prev + 1);
//     }
//   };

//   // Calculate the range of pages to display
//   const getVisiblePages = () => {
//     let start = Math.max(1, currentPage - Math.floor(visiblePagesCount / 2));
//     let end = Math.min(totalPages, start + visiblePagesCount - 1);

//     // Adjust the start if the end exceeds the total pages
//     if (end === totalPages) {
//       start = Math.max(1, end - visiblePagesCount + 1);
//     }

//     return Array.from({ length: end - start + 1 }, (_, index) => start + index);
//   };

//   const visiblePages = getVisiblePages();

//   return (
//     <div className="flex items-center justify-center">
//       <button onClick={handlePrevious} disabled={currentPage === 1}>
//         <IoIosArrowBack />
//       </button>

//       {/* Display Page Numbers */}
//       <div className="mx-4">
//         {visiblePages.map(page => (
//           <button
//             key={page}
//             onClick={() => setCurrentPage(page)}
//             className={`mx-1 px-2 py-1 rounded ${
//               currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             {page}
//           </button>
//         ))}
//       </div>

//       <button onClick={handleNext} disabled={currentPage === totalPages}>
//         <IoIosArrowForward />
//       </button>
//     </div>
//   );
// };

// export default Pagination;
