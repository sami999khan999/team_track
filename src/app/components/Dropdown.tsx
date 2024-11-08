"use client";

import { ProductType } from "@/types";
import React, { useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowRoundForward,
  IoMdAdd,
} from "react-icons/io";

const categories = [
  { id: 1, name: "Category1" },
  { id: 2, name: "Category2" },
  { id: 3, name: "Category3" },
  { id: 4, name: "Category4" },
  { id: 5, name: "Category5" },
  { id: 5, name: "Category5" },
];

const Dropdown = ({
  activeProduct,
}: {
  activeProduct?: ProductType | undefined;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    activeProduct ? activeProduct.category : ""
  );
  const [inputIsOpen, setInputOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");

  const handleCategoryClick = (category: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen(false);
    setSelectedCategory(category);
  };

  const handleBackdropClick = () => {
    setDropdownOpen(false);
    setInputOpen(false);
  };

  const addCtegory = () => {
    setInputOpen(false);
    console.log(categoryInput);
    setCategoryInput("");
    console.log("==========");
  };

  return (
    <>
      <div className="relative">
        <div className="flex justify-center items-center">
          <div className="items-center space-y-2 w-full relative">
            <div
              className="flex items-center justify-between gap-3 bg-white hover:bg-white border py-2 w-full rounded-full px-6 cursor-pointer group border-gray-300"
              onClick={() => setDropdownOpen((prv) => !prv)}
            >
              <p>{selectedCategory ? selectedCategory : "Select Category"}</p>
              <div className="transition-transform group-hover:rotate-180">
                <IoIosArrowDown />
              </div>
            </div>
            <div>
              <div
                className="py-1 flex items-center gap-3 w-full bg-white rounded-full justify-center hover:bg-white duration-200 cursor-pointer border"
                onClick={() => setInputOpen((prv) => !prv)}
              >
                <p className="text-sm">Add Category</p>
                <IoMdAdd />
              </div>
            </div>
            {inputIsOpen && (
              <div
                className="absolute w-full flex mt-2 items-center justify-center z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  placeholder="Enter new category"
                  name="category"
                  className="w-full px-5 py-1 text-xs border-gray-300 rounded-l-full focus:outline-none"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                />
                <div
                  className="border px-5 py-1 border-gray-300 bg-gray-100 hover:bg-white rounded-r-full"
                  onClick={addCtegory}
                >
                  <IoIosArrowRoundForward />
                </div>
              </div>
            )}

            {dropdownOpen ? (
              <div
                className="absolute w-full h-[10rem] overflow-auto bg-white rounded-md z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="py-1 px-4 border-b cursor-pointer rounded-md hover:bg-gray-100"
                      onClick={(event) =>
                        handleCategoryClick(category.name, event)
                      }
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {(dropdownOpen || inputIsOpen) && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          onClick={handleBackdropClick}
        ></div>
      )}
    </>
  );
};

export default Dropdown;
