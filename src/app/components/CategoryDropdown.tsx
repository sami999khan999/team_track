"use client";

import { CategoryType } from "@/types";
import {
  categoryDelete,
  createCategory,
  getCategories,
} from "@/utils/categoryApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoIosArrowDown, IoMdAdd, IoMdArrowDropright } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import Dropdown from "./Dropdown";

const CategoryDropdown = ({
  setReload,
  reload,
  selectedCategory,
  setSelectedCategory,
  setCategoryId,
}: {
  setReload: React.Dispatch<SetStateAction<boolean>>;
  reload: boolean;
  selectedCategory: string | undefined;
  setSelectedCategory: React.Dispatch<SetStateAction<string | undefined>>;
  setCategoryId: React.Dispatch<SetStateAction<number | undefined>>;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputIsOpen, setInputOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>();
  const [categoriesCurrentPage, setCategoriesCurrentPage] = useState(1);

  const handleCategoryClick = (category: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen(false);
    setSelectedCategory(category);
  };

  // const handleBackdropClick = () => {
  //   setDropdownOpen(false);
  //   setInputOpen(false);
  // };

  const addCtegory = async () => {
    setInputOpen(false);

    const category = {
      name: categoryInput,
    };

    const response = await createCategory(category);

    if (response.success) {
      setReload((prv) => !prv);
      setCategoryInput("");
    } else {
      console.log(response.message);
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

    fetchCategories();
  }, [reload]);

  console.log(categories);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="items-center space-y-4 w-full">
          <Dropdown
            currentPage={categoriesCurrentPage}
            setCurrentPage={setCategoriesCurrentPage}
            data={categories}
            type="categories"
            setId={setCategoryId}
            setValue={setSelectedCategory}
          />
          <div>
            <div
              className="py-2 xl:text-lg flex items-center gap-3 w-full bg-secondary-foreground text-primary-foreground justify-center border border-border_color duration-200 cursor-pointer rounded-full mt-2 shadow-sm"
              onClick={() => setInputOpen((prv) => !prv)}
            >
              <p>Add Category</p>
              <IoMdAdd />
            </div>
          </div>
          {/* {inputIsOpen && <div></div>} */}
        </div>
      </div>

      {/* {(dropdownOpen || inputIsOpen) && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          onClick={handleBackdropClick}
        ></div>
      )} */}
    </>
  );
};

export default CategoryDropdown;
