"use client";

import { CategoryType, ProductType } from "@/types";
import {
  categoryDelete,
  createCategory,
  getCategories,
} from "@/utils/categoryApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowRoundForward,
  IoMdAdd,
} from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Dropdown = ({
  setReload,
  reload,
  selectedCategory,
  setSelectedCategory,
  setCategoryId,
}: {
  setReload: React.Dispatch<SetStateAction<boolean>>;
  reload: boolean;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<SetStateAction<string>>;
  setCategoryId: React.Dispatch<SetStateAction<number | undefined>>;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputIsOpen, setInputOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>();

  const handleCategoryClick = (category: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen(false);
    setSelectedCategory(category);
    console.log(selectedCategory);
  };

  const handleBackdropClick = () => {
    setDropdownOpen(false);
    setInputOpen(false);
  };

  const addCtegory = async () => {
    setInputOpen(false);

    const category = {
      name: categoryInput,
    };

    const response = await createCategory(category);

    if (response.success) {
      setReload((prv) => !prv);
      setSelectedCategory("");
    } else {
      response.message;
    }
  };

  const deleteCategory = async (id: number) => {
    const response = await categoryDelete(id);

    if (response.success) {
      setReload((prv) => !prv);
      console.log(response);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();

      if (response.success) {
        setCategories(response.data);
      }
    };
    console.log(categories);

    fetchCategories();
  }, [reload]);

  return (
    <>
      <div className="relative">
        <div className="flex justify-center items-center">
          <div className="items-center space-y-2 w-full relative">
            <div
              className="flex items-center justify-between gap-3 bg-white hover:bg-white border py-2 w-full rounded px-6 cursor-pointer group border-gray-300"
              onClick={() => setDropdownOpen((prv) => !prv)}
            >
              <p
                className={`text-sm ${
                  selectedCategory === "Inter a category!" && "text-red-500"
                }`}
              >
                {selectedCategory ? selectedCategory : "Select Category"}
              </p>
              <div className="transition-transform group-hover:rotate-180">
                <IoIosArrowDown />
              </div>
            </div>
            <div>
              <div
                className="py-1 flex items-center gap-3 w-full bg-white rounded justify-center hover:bg-white duration-200 cursor-pointer border"
                onClick={() => setInputOpen((prv) => !prv)}
              >
                <p className="text-base">Add Category</p>
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
                  className="w-full px-5 py-1 text-base border-gray-300 rounded-l-md rounded-r-none focus:outline-none"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                />
                <div
                  className="border px-5 py-2 border-gray-300 bg-gray-100 hover:bg-white rounded rounded-r-md rounded-l-none"
                  onClick={addCtegory}
                >
                  <IoIosArrowRoundForward />
                </div>
              </div>
            )}

            {dropdownOpen ? (
              <div
                className="absolute w-full h-[10rem] overflow-auto rounded-md z-50 remove-scrollbar bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2">
                  {categories?.map((category) => (
                    <div className="flex w-full items-center bg-secondary mt-1 hover:bg-white px-1">
                      <div
                        key={category.id}
                        className="py-1 px-4 cursor-pointer rounded-md w-full "
                        onClick={(event) => {
                          handleCategoryClick(category.name, event);
                          setCategoryId(category.id);
                        }}
                      >
                        {category.name}
                      </div>
                      <div
                        className="ml-auto bg-black"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <RxCross2 />
                      </div>
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
